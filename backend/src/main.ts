import 'reflect-metadata';
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://vetoralia.com', // Custom production domain
      'https://www.vetoralia.com', // www subdomain (if used)
      'https://veteralia.netlify.app', // Netlify default domain
      'https://www.veteralia.netlify.app', // Netlify www subdomain
      'https://veteralia-beta-sgjnj.netlify.app', // Netlify deploy domain
      'https://veteralia-beta.windsurf.build', // Windsurf preview domain
      'http://localhost:3000', // Local development
    ],
    credentials: true,
  });
  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
