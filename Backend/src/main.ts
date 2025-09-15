// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api"); // 👈 this makes all routes start with /api

  const port = parseInt(process.env.PORT || "4000", 10);
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
