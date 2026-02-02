import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { ConflictException, NotFoundException } from "../../infrastruture/exception/defaultexception";
import { UserCreationData } from "../../interfaces/request/user";
import { UserRepository } from "../../domain/repositories/user";
import { UserModel } from "../../domain/models/user";
import { AuthUser } from "../../infrastruture/types";
import { UserResponse } from "../../interfaces/response/user";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) { }

  // Criar usuário
  async create(data: UserCreationData): Promise<User> {
    const exists = await this.userRepository.existsByEmail(data.email);
    if (exists) {
      throw new ConflictException("Usuário com este email já existe");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const user = await this.userRepository.create(data);
    return user;
  }

  // Buscar todos usuários
  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  // Buscar usuário por ID
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return user;
  }

  async getOnlineUserDetails(authUser: AuthUser): Promise<UserResponse> {
    const user = await this.userRepository.findById(authUser.userId);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return new UserModel(user).buildResponse();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return user;
  }
}
