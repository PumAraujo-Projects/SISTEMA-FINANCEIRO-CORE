import { inject, injectable } from "tsyringe";
import { PrismaClient } from "../../generated/prisma";
import { IUserRepository } from "../../domain/repositories/user";
import { UserCreateData, UserUpdateData } from "../../domain/types/enums";
import { UserBase } from "../../domain/types/enums";
import { UserModel } from "../../domain/models/user";
import { PRISMA_CLIENT_TOKEN } from "../config/dependencyInjection";

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  private prisma: PrismaClient;

  constructor(@inject(PRISMA_CLIENT_TOKEN) prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: UserCreateData): Promise<UserBase> {
    const user = await this.prisma.user.create({
      data: UserModel.toPrismaCreate(data) as any,
    });
    return user as unknown as UserBase;
  }

  async findById(id: string): Promise<UserBase | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user as unknown as UserBase | null;
  }

  async findByEmail(email: string): Promise<UserBase | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user as unknown as UserBase | null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email },
    });
    return count > 0;
  }

  async existsByCode(code: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { code },
    });
    return count > 0;
  }

  async existsByNuit(nuit: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { nuit },
    });
    return count > 0;
  }

  async existsByMsisdn(msisdn: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { msisdn },
    });
    return count > 0;
  }

  async findAll(): Promise<UserBase[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return users as unknown as UserBase[];
  }

  async update(id: string, data: UserUpdateData): Promise<UserBase> {
    const updateData = UserModel.toPrismaUpdate(data);
    const user = await this.prisma.user.update({
      where: { id },
      data: updateData as any,
    });
    return user as unknown as UserBase;
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async updateEmail(id: string, email: string): Promise<UserBase> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { email },
    });
    return user as unknown as UserBase;
  }

  async deactivate(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async activate(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
  }

  async count(): Promise<number> {
    return await this.prisma.user.count();
  }
}

