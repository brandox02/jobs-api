import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  // process.env.TZ = 'America/Santo_Domingo';
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all origins

  console.log("Testing cors")
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  await app.listen(process.env.PORT);
  console.log('The app is ready! ', await app.getUrl());
}
bootstrap();
