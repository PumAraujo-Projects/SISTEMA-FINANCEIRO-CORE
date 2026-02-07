// Enum para gênero
export enum Gender {
  MALE = "M",
  FEMALE = "F",
  OTHER = "Other",
}

// Enum para papel do usuário
export enum UserRole {
  CLIENTE = "Cliente",
  FUNCIONARIO = "Funcionario",
  ADMINISTRADOR = "Administrador",
}

// Enum para métodos de pagamento
export enum PaymentMethod {
  M_PESA = "M-pesa",
  E_MOLA = "E-mola",
  M_KESH = "M-kesh",
  MILLENNIUM_BIM = "Millenium Bim",
  BCI = "BCI",
}

// Enum para estado civil
export enum MaritalStatus {
  SINGLE = "Single",
  MARRIED = "Married",
  DIVORCED = "Divorced",
  WIDOWED = "Widowed",
}

// Tipos para provincias de Moçambique
export type ProvinceType = 
  | "Maputo" 
  | "Gaza" 
  | "Inhambane" 
  | "Manica" 
  | "Sofala" 
  | "Tete" 
  | "Zambezia" 
  | "Nampula" 
  | "Cabo Delgado" 
  | "Niassa";

export interface District {
  id: number;
  code: string;
  value: string;
  provinceCode: ProvinceType;
}

export interface Province {
  id: number;
  code: ProvinceType;
  value: string;
}

export interface EnumOption {
  id: number;
  code: string;
  value: string;
}

// Tipo base de usuário do Prisma (convertido do schema.prisma)
export interface UserBase {
  id: string;
  fullName: string;
  email: string;
  password: string;
  code: string;
  nuit: string;
  msisdn: string;
  address: string;
  dateOfBirth?: Date | null;
  gender?: string | null;
  role: string;
  notes?: string | null;
  isActive: boolean;
  registrationDate: Date;
  nationality?: string | null;
  maritalStatus?: string | null;
  occupation?: string | null;
  preferredPaymentMethod?: string | null;
  loyaltyPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

// Dados para criação de usuário
export interface UserCreateData {
  fullName: string;
  email: string;
  password: string;
  code: string;
  nuit: string;
  msisdn: string;
  address: string;
  dateOfBirth?: string;
  gender?: Gender;
  role?: UserRole;
  notes?: string;
  isActive?: boolean;
  registrationDate?: string;
  nationality?: string;
  maritalStatus?: MaritalStatus;
  occupation?: string;
  preferredPaymentMethod?: PaymentMethod;
  loyaltyPoints?: number;
}

// Dados para atualização de usuário
export interface UserUpdateData {
  fullName?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: Gender;
  notes?: string;
  isActive?: boolean;
  nationality?: string;
  maritalStatus?: MaritalStatus;
  occupation?: string;
  preferredPaymentMethod?: PaymentMethod;
}

// Dados para atualização de email
export interface EmailUpdateData {
  email: string;
}

// Dados para atualização de senha
export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
}

// Resultado de autenticação
export interface AuthResult {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

// Payload do token JWT
export interface TokenPayload {
  userId: string;
  email?: string;
  role?: string;
}

