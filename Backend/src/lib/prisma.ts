import { PrismaClient } from "@prisma/client";

// Initialize a single Prisma client instance
const prisma = new PrismaClient();

// Optional: Graceful shutdown for serverless environments
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = globalThis.prisma || prisma;
}

export default prisma;
