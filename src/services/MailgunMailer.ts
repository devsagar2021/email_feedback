import Mailgun from 'mailgun.js';
import formData from 'form-data';
import keys from "../config/getKeys";
import { IMailgunClient } from 'mailgun.js/Interfaces';

class MailgunMailer {
  subject: any;
  recipients: string[];
  body: string;
  sentFrom: string;
  mailgun: IMailgunClient;

  constructor({ subject, recipients }: any, content: string) {
    // This is the email address with trial domain from mailgun and this will be shown as sender
    this.sentFrom = `no-reply@${keys.mailgunDomain}`
    this.subject = subject;
    this.body = content;
    this.recipients = this.formatAddresses(recipients);
    this.mailgun = new Mailgun(formData).client({
      username: 'api',
      key: keys.mailgunApiKey,
    });
  }

  formatAddresses(recipients: [any]): string[] {
    return recipients.map(({ email }: any) => email);
  }

  async sendEmail() {
    const response = await this.mailgun.messages.create(keys.mailgunDomain, {
      from: this.sentFrom,
      to: this.recipients,
      subject: this.subject,
      html: this.body,
      "o:tracking-clicks": true,
    });
    
    return response;
  }
}

export default MailgunMailer
