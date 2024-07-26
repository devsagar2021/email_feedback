import { Express } from 'express';
import crypto from "crypto";
import keys from "../config/getKeys";
// @ts-expect-error 
import PayU from 'payu-websdk';
import requireLogin from '../middlewares/requireLogin';

const billingRoutes = (app: Express) => {
  
  app.post('/api/payment/token', requireLogin, async (req, res) => {

    // const apiEndpoint = "https://test.payu.in/_payment";
    const merchantKey = keys.payuMerchantKey;
    const salt = keys.payuActiveSalt;
    const txnId = `TXN${Date.now()}`;

    const { amt, firstName, email, phone, productInfo } = req.body;
    const params = {
      "key": merchantKey,
      "txnid": txnId,
      "amount": amt,
      "productinfo": productInfo,
      "firstname": firstName,
      "email": email,
      "phone": phone,
    };

    function generateHash(params: any, salt: string) {
      let hashString = params["key"] + "|" + params["txnid"] + "|" + params["amount"] + "|" + params["productinfo"] + "|" + params["firstname"] + "|" + params["email"] + "|||||||||||" + salt;
      const hash = sha512(hashString);
      return hash;
    }

    function sha512(str: string) {
      return crypto.createHash("sha512").update(str).digest("hex");
    }

    const hash = generateHash(params, salt);

    // @ts-expect-error
    params.hash = hash as string;

    res.send({ txnId, hash, key: merchantKey });
  });

  app.post('/api/payment/success', async (req, res) => {
    res.redirect(`${keys.clientHost ?? ''}/payment/success?txnid=${req.body.txnid}`);
  })

  app.post('/api/payment/failure', async (_req, res) => {
    res.redirect(`${keys.clientHost ?? ''}/payment/failure`);
  })

  app.post('/api/add-credits', requireLogin, async (req, res) => {
    if (req.body.txnid) {
      const payuClient = new PayU({
        key: keys.payuMerchantKey,
        salt: keys.payuActiveSalt,
      },'TEST');     // Possible value  = TEST/LIVE

      try {
        const verificationRes = await payuClient.verifyPayment(req.body.txnid)
        const verificationDetails = verificationRes.transaction_details?.[req.body.txnid];
        let user = null;
        if (verificationDetails.status === 'success') {
          // @ts-ignore
          req.user.credits = parseFloat(req.user.credits) + parseFloat(verificationDetails.amt);
          // @ts-ignore
          user = await req.user.save();
          res.send({ credits: user.credits, error: null });
        } else {
          res.status(500).send(new Error('The Last transaction Failed!'));
        }
      } catch (error) {
        console.error(error)
        res.status(500).send(new Error('Failed to verify payment!'));
      }
    } else {
      res.status(500).send(new Error('Invalid Transaction ID!'));
    }
  })
}

export default billingRoutes
