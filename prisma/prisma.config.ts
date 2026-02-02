import { defineConfig } from "@prisma/config";

export const prismaConfig = defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
});

