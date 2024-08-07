import _ from 'lodash';
import { Path } from 'path-parser';
import { URL } from 'url';
import { Express } from 'express';
import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import mongoose from 'mongoose';
import surveyTemplate from '../services/emailTemplates/surveyTemplate';
import MailgunMailer from '../services/MailgunMailer';

const Survey = mongoose.model('surveys')

const surveyRoutes = (app: Express) => {
  app.get('/api/surveys/:surveyid/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyid/:choice');
    const reqBody = [req.body]; // Converting to array as Mailgun sends a single event

    // Future proofing for multiple events
    _.chain(reqBody)
      .map((event) => {
        const { recipient, url } = event['event-data'];
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email: recipient, surveyId: match.surveyid, choice: match.choice };
        }
      })
      .compact()
      .uniqBy((item) => item.email + item.surveyId)
      .each(async ({ surveyId, email, choice }) => {
        const userResponded = await Survey.findOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: true }
          }
        })

        if (!userResponded) {
          Survey.updateOne({
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false }
            }
          }, {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }).exec();
        }
      })
      .value();

    res.send({});
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    try {
      const surveys = await Survey
       // @ts-expect-error
        .find({ _user: req.user?.id })
        .select({ recipients: false });

      res.send(surveys);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    try {
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map((email: string) => ({ email: email.trim() })),
        // @ts-expect-error
        _user: req.user.id,
        dateSent: Date.now()
      });

      try {
        const mailer = new MailgunMailer(survey, surveyTemplate(survey));
        const emailRes = await mailer.sendEmail();
  
        if (emailRes.status < 200 || emailRes.status > 299) {
          throw new Error('Email failed to send');
        }
        await survey.save();
        // @ts-expect-error
        req.user.credits -= 1;
        // @ts-expect-error
        const user = await req.user.save();

        res.send({ credits: user.credits });
      } catch (err) {
        console.log("error", err);
        res.status(422).send(err);
      }
    } catch (err) {
      res.status(422).send(err);
    }
  });
}

export default surveyRoutes
