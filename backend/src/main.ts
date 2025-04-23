import 'reflect-metadata';
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.enableCors({
    // Allow all dev ports for Next.js frontend
    origin: [
      'https://vetoralia.com',
      'https://www.vetoralia.com',
      'https://veteralia.netlify.app',
      'https://www.veteralia.netlify.app',
      'https://veteralia-beta-sgjnj.netlify.app',
      'https://veteralia-beta.windsurf.build',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
    ],
    credentials: true,
  });
  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
