
import { PrismaClient, User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { UserCreationData } from "../../interfaces/request/user";
import { PRISMA_TOKEN } from "../../infrastruture/config/constants";

@injectable()
export class UserRepository {
    constructor(@inject(PRISMA_TOKEN) private prisma: PrismaClient) { }

    // Criar usuário
   async create(userData: UserCreationData): Promise<User> {
    // Validar e converter datas de forma segura
    const dateOfBirth = userData.dateOfBirth ? new Date(userData.dateOfBirth) : null;
    const registrationDate = userData.registrationDate ? new Date(userData.registrationDate) : new Date();
    
    // Verificar se as datas são válidas
    if (userData.dateOfBirth && isNaN(dateOfBirth!.getTime())) {
      throw new Error("Data de nascimento inválida");
    }
    if (userData.registrationDate && isNaN(registrationDate.getTime())) {
      throw new Error("Data de registro inválida");
    }

    return await this.prisma.user.create({
      data: {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        code: userData.code,
        nuit: userData.nuit,
        msisdn: userData.msisdn,
        address: userData.address,
        dateOfBirth: dateOfBirth,
        gender: userData.gender || null,
        role: userData.role || "Cliente",
        notes: userData.notes || "",
        isActive: userData.isActive ?? true,
        registrationDate: registrationDate,
        nationality: userData.nationality || "",
        maritalStatus: userData.maritalStatus || "",
        occupation: userData.occupation || "",
        preferredPaymentMethod: userData.preferredPaymentMethod || "",
        loyaltyPoints: userData.loyaltyPoints || 0,
      },
    });
  }

    // Buscar usuário por ID
    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    // Buscar todos os usuários
    async getUsers(): Promise<User[]> {
        return await this.prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
    }

    async existsByEmail(email: string): Promise<boolean> {
        return !!(await this.prisma.user.findFirst({
            where: { email: email },
        }));
    }

    async findByEmail(email: string): Promise<null | User> {
        const user = await this.prisma.user.findFirst({
            where: { email: email },
        });
        if (!user) return null;
        return user;
    }
}
