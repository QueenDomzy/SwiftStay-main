// src/app.module.ts
import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { AiModule } from './ai/ai.module';
// ...other modules

@Module({
  imports: [
    ReservationsModule,
    PaymentsModule,
    AiModule,
    // ...other modules
  ],
})
export class AppModule {}
