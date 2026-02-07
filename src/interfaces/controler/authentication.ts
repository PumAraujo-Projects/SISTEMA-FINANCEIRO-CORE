import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../../application/services/authentication";
import { ApiResponseWithToken } from "../response/apiResponse";
import { validateLogin } from "../request/validators/authValidator";
import { BadRequestException } from "../../infrastruture/exception/defaultexception";

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  /**
   * POST /api/v1/auth/login
   * Autenticar usuário e gerar token JWT
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Validar dados de entrada
      const validation = validateLogin(req.body);
      if (!validation.success) {
        throw new BadRequestException(
          "Dados inválidos: " + validation.errors?.map((e) => `${e.field}: ${e.message}`).join(", ")
        );
      }

      const result = await this.authService.autenticateUser(validation.data!);
      const message = "Usuário autenticado com sucesso";

      res
        .status(StatusCodes.OK)
        .json(new ApiResponseWithToken(StatusCodes.OK, result.token, message, result.user));
    } catch (error) {
      next(error);
    }
  }
}

