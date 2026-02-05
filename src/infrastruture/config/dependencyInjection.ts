import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PRISMA_TOKEN } from "./constants";
import { container } from "tsyringe";
import { UserRepository } from "../../domain/repositories/user";
import { AuthService } from "../../application/services/authentication";
import { UserService } from "../../application/services/user";
import { AuthController } from "../../interfaces/controler/authentication";

export function registerDependencies() {
  // Create Prisma client with PostgreSQL adapter
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);

  const prismaClient = new PrismaClient({ adapter });

  // Register the instance with a token
  container.registerInstance(PRISMA_TOKEN, prismaClient);

  //repositories
  container.registerSingleton<UserRepository>(UserRepository, UserRepository);

  //services
  container.registerSingleton<AuthService>(AuthService, AuthService);
  container.registerSingleton<UserService>(UserService, UserService);

  //controllers
  container.registerSingleton<AuthController>(AuthController, AuthController);

  return container;
}

