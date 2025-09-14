model Room {
  id        Int       @id @default(autoincrement())
  name      String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Reservation {
  id          Int      @id @default(autoincrement())
  customerName String
  room        Room     @relation(fields: [roomId], references: [id])
  roomId      Int
  amount      Float
  createdAt   DateTime @default(now())
}

model Transaction {
  id        Int      @id @default(autoincrement())
  method    String
  amount    Float
  createdAt DateTime @default(now())
}
