import { UserBase, UserCreateData, UserUpdateData, Gender, UserRole, PaymentMethod } from "../types/enums";

// Resposta de usuário (sem dados sensíveis)
export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  code: string;
  nuit: string;
  msisdn: string;
  address: string;
  dateOfBirth?: string;
  gender?: Gender;
  role: UserRole;
  notes?: string;
  isActive: boolean;
  registrationDate: string;
  nationality?: string;
  maritalStatus?: string;
  occupation?: string;
  preferredPaymentMethod?: PaymentMethod;
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
}

// Model de usuário com métodos utilitários
export class UserModel {
  private user: UserBase;

  constructor(user: UserBase) {
    this.user = user;
  }

  // Converter para resposta (remover senha)
  buildResponse(): UserResponse {
    return {
      id: this.user.id,
      fullName: this.user.fullName,
      email: this.user.email,
      code: this.user.code,
      nuit: this.user.nuit,
      msisdn: this.user.msisdn,
      address: this.user.address,
      dateOfBirth: this.user.dateOfBirth?.toISOString().split("T")[0],
      gender: this.user.gender as Gender | undefined,
      role: this.user.role as UserRole,
      notes: this.user.notes ?? undefined,
      isActive: this.user.isActive,
      registrationDate: this.user.registrationDate.toISOString().split("T")[0],
      nationality: this.user.nationality ?? undefined,
      maritalStatus: this.user.maritalStatus ?? undefined,
      occupation: this.user.occupation ?? undefined,
      preferredPaymentMethod: this.user.preferredPaymentMethod as PaymentMethod | undefined,
      loyaltyPoints: this.user.loyaltyPoints,
      createdAt: this.user.createdAt.toISOString(),
      updatedAt: this.user.updatedAt.toISOString(),
    };
  }

  // Verificar se está ativo
  isActiveUser(): boolean {
    return this.user.isActive;
  }

  // Verificar se é admin
  isAdmin(): boolean {
    return this.user.role === "Administrador";
  }

  // Obter ID
  getId(): string {
    return this.user.id;
  }

  // Obter email
  getEmail(): string {
    return this.user.email;
  }

  // Obter role
  getRole(): string {
    return this.user.role;
  }

  // Verificar senha (comparação deve ser feita externamente com bcrypt)
  getPassword(): string {
    return this.user.password;
  }

  // Transformar dados de criação para o formato do Prisma
  static toPrismaCreate(data: UserCreateData): Partial<UserBase> {
    return {
      fullName: data.fullName,
      email: data.email,
      password: data.password, // Deve ser hasheada antes
      code: data.code,
      nuit: data.nuit,
      msisdn: data.msisdn,
      address: data.address,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      gender: data.gender,
      role: data.role || UserRole.CLIENTE,
      notes: data.notes,
      isActive: data.isActive ?? true,
      registrationDate: data.registrationDate ? new Date(data.registrationDate) : new Date(),
      nationality: data.nationality,
      maritalStatus: data.maritalStatus,
      occupation: data.occupation,
      preferredPaymentMethod: data.preferredPaymentMethod,
      loyaltyPoints: data.loyaltyPoints ?? 0,
    };
  }

  // Transformar dados de atualização para o formato do Prisma
  static toPrismaUpdate(data: UserUpdateData): Partial<UserBase> {
    const updateData: Partial<UserBase> = {};

    if (data.fullName !== undefined) updateData.fullName = data.fullName;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.dateOfBirth !== undefined) updateData.dateOfBirth = new Date(data.dateOfBirth);
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.nationality !== undefined) updateData.nationality = data.nationality;
    if (data.maritalStatus !== undefined) updateData.maritalStatus = data.maritalStatus;
    if (data.occupation !== undefined) updateData.occupation = data.occupation;
    if (data.preferredPaymentMethod !== undefined) updateData.preferredPaymentMethod = data.preferredPaymentMethod;

    return updateData;
  }
}

