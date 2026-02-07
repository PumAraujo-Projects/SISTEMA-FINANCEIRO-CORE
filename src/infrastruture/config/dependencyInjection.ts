import { container } from "tsyringe";
import prisma from "./prisma-client";

// Token para injeção de dependência do PrismaClient
export const PRISMA_CLIENT_TOKEN = Symbol("PRISMA_CLIENT_TOKEN");

// Registrar PrismaClient
container.registerInstance(PRISMA_CLIENT_TOKEN, prisma);

export function registerDependencies() {
  // Importações lazy para evitar circular dependency
  const { UserRepositoryImpl } = require("../repositories/userRepositoryImpl");
  const { IUserRepository } = require("../../domain/repositories/user");
  const { UserService } = require("../../application/services/user");
  const { AuthService } = require("../../application/services/authentication");
  const { AuthController } = require("../../interfaces/controler/authentication");
  const { UserController } = require("../../interfaces/controler/user");

  // Repositories - deve corresponder ao token usado no @inject()
  container.register("UserRepository", { useClass: UserRepositoryImpl });

  // Services
  container.registerSingleton(UserService);

  // Controllers
  container.registerSingleton(UserController);

  return container;
}

export { container };

