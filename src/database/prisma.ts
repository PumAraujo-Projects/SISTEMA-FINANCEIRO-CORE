import { PrismaClient } from "@prisma/client";

// Prisma 7 lê a URL do banco do prisma.config.ts automaticamente
// Através da variável de ambiente DATABASE_URL
export const prisma = new PrismaClient();
