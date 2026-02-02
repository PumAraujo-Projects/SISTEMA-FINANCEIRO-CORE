import { PrismaClient } from "@prisma/client";

// Prisma 7 lê DATABASE_URL do .env automaticamente
export const prisma = new PrismaClient();
