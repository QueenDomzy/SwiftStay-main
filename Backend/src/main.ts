// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 4000; // ✅ Use Render's provided PORT
  await app.listen(port, "0.0.0.0");     // ✅ Bind to all interfaces

  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
