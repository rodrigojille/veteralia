# Veteralia: Next-Gen Veterinary Appointment Platform

## Inspiration
A fusion of Doctoralia's trusted healthcare booking and Airbnb's engaging, modern user experience—tailored for pet owners and veterinarians in Mexico.

## MVP Features
- Pet Owners: Sign up/login (EN/ES), search vets, book appointments, notifications (email/SMS/WhatsApp), profile management
- Veterinarians/Secretaries: Sign up/login, manage profile/schedule/pricing, subscription management, appointment management
- Admin: User/vet management dashboard, vet approval, analytics
- Integrations: MercadoPago (subscriptions), WhatsApp Business API (messaging), Google Suite (email), SMS (Twilio or similar)

## Tech Stack
- **Frontend:** Next.js (React), Material UI/Chakra UI, next-i18next, Socket.IO
- **Backend:** NestJS (Node.js, TypeScript), PostgreSQL, Redis, Elasticsearch, RabbitMQ/SQS, MercadoPago, WhatsApp Business API, Google Suite, Twilio
- **Cloud:** AWS/GCP, Docker, Kubernetes, CI/CD (GitHub Actions), Sentry/Datadog

## Design
- Modern, playful, and trustworthy—pet-centric with inspiration from Doctoralia and Airbnb.

## Roadmap
See `ROADMAP.md` for planned features and phases.

---

## Getting Started
1. Clone the repo
2. Install dependencies (see `/frontend` and `/backend`)
3. Set up environment variables (see `.env.example`)
4. Run `docker-compose up` for local development

---

## Contact
For WhatsApp Business API setup, see `docs/whatsapp-setup.md`.

---

© 2025 Veteralia. All rights reserved.

