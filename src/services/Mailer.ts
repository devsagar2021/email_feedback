import { MailerSend, EmailParams, Sender, Recipient,  } from "mailersend";
import keys from "../config/getKeys";

class Mailer {
  subject: any;
  recipients: Recipient[];
  body: string;
  sentFrom: Sender;

  constructor({ subject, recipients }: any, content: string) {
    // This is the email address with trial domain from mailsender and this will be shown as sender
    this.sentFrom = new Sender("no-reply@trial-zr6ke4nqe0e4on12.mlsender.net");
    this.subject = subject;
    this.body = content;
    this.recipients = this.formatAddresses(recipients);
  }

  formatAddresses(recipients: [any]): Recipient[] {
    return recipients.map(({ email }: any) => new Recipient(email));
  }

  async sendEmail() {
    const mailerSend = new MailerSend({
      apiKey: keys.mailersendToken,
    });

    const emailParams = new EmailParams()
      .setFrom(this.sentFrom)
      .setTo(this.recipients)
      .setReplyTo(this.sentFrom)
      .setSubject(this.subject)
      .setHtml(this.body)
      .setText("This is the text content");
    
    const response = await mailerSend.email.send(emailParams);
    return response;
  }
}

export default Mailer
