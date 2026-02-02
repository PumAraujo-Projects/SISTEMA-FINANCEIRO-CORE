import { inject, injectable } from "tsyringe";
import { UserService } from "./user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthLoginData } from "../../interfaces/request/authentication";
import { UserResponse } from "../../interfaces/response/user";
import { BadCredentialsException, NotFoundException } from "../../infrastruture/exception/defaultexception";
import { UserModel } from "../../domain/models/user";
import { User } from "@prisma/client";


@injectable()
export class AuthService {
  constructor(@inject(UserService) private userService: UserService) {}

  generateAccessToken(userId: string): string {
    const tokenSecret = process.env.TOKEN_SECRET ?? "secret";
    return jwt.sign({ userId: userId }, tokenSecret, { expiresIn: "48h" });
  }

  async autenticateUser(data: AuthLoginData): Promise<{ token: string; user: UserResponse }> {
    const user = await this.userService.findByEmail(data.email);

    const isPasswordValid = user.password ? await bcrypt.compare(data.password, user.password) : false;

    if (!isPasswordValid) {
      throw new BadCredentialsException("Credenciais inválidas, verifica suas informações!");
    }

    const token = this.generateAccessToken(user.id);

    return {
      token,
      user: new UserModel(user).buildResponse(),
    };
  }
}
