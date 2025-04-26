import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('test-email')
  async sendTestEmail(@Body() body: { to: string }) {
    await this.notificationService.sendEmail(
      body.to,
      'Veteralia Test Email',
      '<h1>This is a test email from Veteralia!</h1><p>If you received this, your SendGrid setup is working.</p>'
    );
    return { message: `Test email sent to ${body.to}` };
  }
}
