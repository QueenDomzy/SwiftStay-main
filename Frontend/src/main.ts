// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // local frontend (dev)
      'https://your-frontend-domain.com', // replace with actual deployed frontend
    ],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  // ✅ Set global API prefix
  app.setGlobalPrefix('api');

  // ✅ Enable validation for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 SwiftStay backend running on: http://localhost:${port}/api`);
}

bootstrap();
