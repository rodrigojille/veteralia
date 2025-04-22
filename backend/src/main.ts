import 'reflect-metadata';
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://vetoralia.com',
      'https://www.vetoralia.com',
      'https://veteralia.netlify.app',
      'https://www.veteralia.netlify.app',
      'https://veteralia-beta-sgjnj.netlify.app',
      'https://veteralia-beta.windsurf.build',
      'http://localhost:3000',
    ],
    credentials: true,
  });
  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
