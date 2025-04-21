import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://veteralia.netlify.app', // Netlify default domain
      'https://www.veteralia.netlify.app', // Netlify www subdomain
      'https://veteralia-beta-sgjnj.netlify.app', // Netlify deploy domain
      'http://localhost:3000', // Local development
    ],
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
