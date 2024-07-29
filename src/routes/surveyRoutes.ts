import { Express } from 'express';
import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import mongoose from 'mongoose';
import Mailer from '../services/Mailer';
import surveyTemplate from '../services/emailTemplates/surveyTemplate';

const Survey = mongoose.model('surveys')

const surveyRoutes = (app: Express) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
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
        const mailer = new Mailer(survey, surveyTemplate(survey));
        const emailRes = await mailer.sendEmail();

        await survey.save();
        // @ts-expect-error
        req.user.credits -= 1;
        // @ts-expect-error
        const user = await req.user.save();

        res.send({ credits: user.credits, emailStatus: emailRes.statusCode});
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
