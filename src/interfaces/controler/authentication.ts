
import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../../application/services/authentication";
import { ApiResponseWithToken } from "../response/apiResponse";
import { AuthLoginData } from "../request/authentication";

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as AuthLoginData;
      const result = await this.authService.autenticateUser(data);
      const message = "Usuário autenticado com sucesso";
      res.status(StatusCodes.OK).json(new ApiResponseWithToken(StatusCodes.OK, result.token, message, result.user));
    } catch (error) {
      next(error);
    }
  }
}
