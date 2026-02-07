import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { ConflictException, NotFoundException, BadRequestException } from "../../infrastruture/exception/defaultexception";
import { UserCreateData, UserUpdateData, UserBase } from "../../domain/types/enums";
import { IUserRepository } from "../../domain/repositories/user";
import { UserModel, UserResponse } from "../../domain/models/user";
import { AuthUser } from "../../infrastruture/types";

@injectable()
export class UserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

  /**
   * Criar um novo usuário
   */
  async create(data: UserCreateData): Promise<UserResponse> {
    // Verificar se email já existe
    const existsByEmail = await this.userRepository.existsByEmail(data.email);
    if (existsByEmail) {
      throw new ConflictException("Usuário com este email já existe");
    }

    // Verificar se code já existe
    const existsByCode = await this.userRepository.existsByCode(data.code);
    if (existsByCode) {
      throw new ConflictException("Usuário com este código já existe");
    }

    // Verificar se nuit já existe
    const existsByNuit = await this.userRepository.existsByNuit(data.nuit);
    if (existsByNuit) {
      throw new ConflictException("Usuário com este NUIT já existe");
    }

    // Verificar se msisdn já existe
    const existsByMsisdn = await this.userRepository.existsByMsisdn(data.msisdn);
    if (existsByMsisdn) {
      throw new ConflictException("Usuário com este número de telefone já existe");
    }

    // Hashear a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Criar usuário
    const user = await this.userRepository.create(data);

    return new UserModel(user as UserBase).buildResponse();
  }

  /**
   * Buscar todos os usuários
   */
  async getUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => new UserModel(user as UserBase).buildResponse());
  }

  /**
   * Buscar usuário por ID
   */
  async findById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return new UserModel(user as UserBase).buildResponse();
  }

  /**
   * Buscar usuário por email (para autenticação)
   */
  async findByEmail(email: string): Promise<UserBase> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return user as UserBase;
  }

  /**
   * Obter detalhes do usuário autenticado
   */
  async getOnlineUserDetails(authUser: AuthUser): Promise<UserResponse> {
    const user = await this.userRepository.findById(authUser.userId);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return new UserModel(user as UserBase).buildResponse();
  }

  /**
   * Atualizar dados do usuário
   */
  async update(id: string, data: UserUpdateData): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await this.userRepository.update(id, data);
  }

  /**
   * Atualizar senha do usuário
   */
  async updatePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    // Verificar senha atual
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Senha atual incorreta");
    }

    // Hashear nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updatePassword(id, hashedPassword);
  }

  /**
   * Atualizar email do usuário
   */
  async updateEmail(id: string, newEmail: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    // Verificar se o novo email já está em uso
    const existsByEmail = await this.userRepository.existsByEmail(newEmail);
    if (existsByEmail) {
      throw new ConflictException("Este email já está em uso por outro usuário");
    }

    await this.userRepository.updateEmail(id, newEmail);
  }

  /**
   * Desativar usuário (soft delete)
   */
  async deactivate(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await this.userRepository.deactivate(id);
  }

  /**
   * Ativar usuário
   */
  async activate(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await this.userRepository.activate(id);
  }
}

