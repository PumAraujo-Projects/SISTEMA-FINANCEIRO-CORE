import { UserCreateData, UserUpdateData } from "../../domain/types/enums";
import { UserBase } from "../../domain/types/enums";

/**
 * Interface para o repositório de usuários
 * Define os métodos que devem ser implementados pelo repositório concreto
 */
export interface IUserRepository {
  // Criação
  create(data: UserCreateData): Promise<UserBase>;

  // Busca por ID
  findById(id: string): Promise<UserBase | null>;

  // Busca por email
  findByEmail(email: string): Promise<UserBase | null>;

  // Verificar existência por email
  existsByEmail(email: string): Promise<boolean>;

  // Verificar existência por código
  existsByCode(code: string): Promise<boolean>;

  // Verificar existência por NUIT
  existsByNuit(nuit: string): Promise<boolean>;

  // Verificar existência por msisdn
  existsByMsisdn(msisdn: string): Promise<boolean>;

  // Buscar todos os usuários
  findAll(): Promise<UserBase[]>;

  // Atualizar usuário
  update(id: string, data: UserUpdateData): Promise<UserBase>;

  // Atualizar senha
  updatePassword(id: string, hashedPassword: string): Promise<void>;

  // Atualizar email
  updateEmail(id: string, email: string): Promise<UserBase>;

  // Desativar usuário (soft delete)
  deactivate(id: string): Promise<void>;

  // Ativar usuário
  activate(id: string): Promise<void>;

  // Contar usuários
  count(): Promise<number>;
}

