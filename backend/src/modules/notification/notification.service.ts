import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as twilio from 'twilio';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private twilioClient: twilio.Twilio;

  constructor() {
    // These should be set via environment variables
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID || '',
      process.env.TWILIO_AUTH_TOKEN || ''
    );
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      await sgMail.send({
        to,
        from: process.env.SENDGRID_FROM_EMAIL || '',
        subject,
        html,
      });
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error}`);
    }
  }

  async sendSMS(to: string, body: string) {
    try {
      await this.twilioClient.messages.create({
        body,
        to,
        from: process.env.TWILIO_SMS_FROM || '',
      });
      this.logger.log(`SMS sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${to}: ${error}`);
    }
  }

  async sendWhatsApp(to: string, body: string) {
    try {
      await this.twilioClient.messages.create({
        body,
        to: `whatsapp:${to}`,
        from: process.env.TWILIO_WHATSAPP_FROM || '',
      });
      this.logger.log(`WhatsApp sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send WhatsApp to ${to}: ${error}`);
    }
  }
}
