import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);
  private readonly mercadopagoUrl = 'https://api.mercadopago.com';
  private readonly accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || '';

  async createPreference(data: {
    userId: string;
    plan: string;
    price: number;
    returnUrl: string;
  }) {
    try {
      const response = await axios.post(
        `${this.mercadopagoUrl}/checkout/preferences`,
        {
          items: [
            {
              title: `Veteralia Subscription - ${data.plan}`,
              quantity: 1,
              currency_id: 'MXN',
              unit_price: data.price,
            },
          ],
          payer: { id: data.userId },
          back_urls: {
            success: data.returnUrl,
            failure: data.returnUrl,
            pending: data.returnUrl,
          },
          notification_url: process.env.MERCADOPAGO_WEBHOOK_URL || '',
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error creating MercadoPago preference', error);
      throw error;
    }
  }

  // Add more methods for handling webhooks, updating vet profile, etc.
}
