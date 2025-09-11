// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = parseInt(process.env.PORT || "4000", 10); // Render sets PORT
  await app.listen(port, "0.0.0.0"); // ✅ Required on Render

  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
