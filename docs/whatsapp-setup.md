# WhatsApp Business API Setup Guide

## Overview
Veteralia integrates WhatsApp for appointment reminders, direct chat, and support. We use the WhatsApp Business API for automated and direct messaging.

## Steps
1. **Register with Meta (Facebook) Business Manager:**
   - Go to [Meta Business Manager](https://business.facebook.com/)
   - Create/verify your business
   - Apply for WhatsApp Business API access
2. **Phone Number Registration:**
   - Use a dedicated phone number (cannot be previously registered on WhatsApp)
3. **Choose a Provider:**
   - Directly via Meta or through a BSP (Business Solution Provider) like Twilio, MessageBird, or 360dialog
   - BSPs simplify setup and provide dashboards
4. **Set Up Webhooks:**
   - Configure webhook endpoints in Veteralia backend to receive messages/events
5. **API Integration:**
   - Use official WhatsApp Cloud API docs: https://developers.facebook.com/docs/whatsapp/cloud-api
   - Store API credentials securely (never commit to git)
6. **Testing:**
   - Start with sandbox/testing environment
   - Send test messages, automate reminders

## Tips
- WhatsApp Business API has approval and messaging template requirements
- Consider BSP for faster onboarding
- Monitor Meta’s compliance and rate limits

---

Contact the Veteralia tech team for integration support.
