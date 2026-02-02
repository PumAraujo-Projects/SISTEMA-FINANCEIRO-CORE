import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PRISMA_TOKEN } from "./constants";
import { container } from "tsyringe";
import { UserRepository } from "../../domain/repositories/user";
import { AuthService } from "../../application/services/authentication";
import { UserService } from "../../application/services/user";
import { AuthController } from "../../interfaces/controler/authentication";

export function registerDependencies() {
  // Create Prisma client with the proper adapter configuration
  const prismaClientOptions = {
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL || "file:./dev.db",
    }),
  };
  
  const prismaClient = new PrismaClient(prismaClientOptions);

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

