
import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../../application/services/user";
import { UserCreationData } from "../request/user";
import { ApiResponse } from "../response/apiResponse";
import { RequestWithUser } from "../../infrastruture/types";


@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as UserCreationData;
      const user = await this.userService.create(data);
      res.status(StatusCodes.CREATED).json(new ApiResponse(StatusCodes.CREATED, "Usuário criado com sucesso", null));
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getUsers();
      res.json(new ApiResponse(StatusCodes.OK, "Usuários encontrados", users));
    } catch (error) {
      next(error);
    }
  }

  async getOnlineUser(req: any, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        res.status(StatusCodes.UNAUTHORIZED).json(new ApiResponse(StatusCodes.UNAUTHORIZED, "Usuário não autenticado", null));
        return;
      }
      const onlineUser = await this.userService.getOnlineUserDetails(req.user);
      res.json(new ApiResponse(StatusCodes.OK, "Usuário online encontrado", onlineUser));
    } catch (error) {
      next(error);
    }
  }

//   async updateUserPassword(req: RequestWithUser, res: Response, next: NextFunction) {
//     try {
//       if (!req.user) {
//         res.status(StatusCodes.UNAUTHORIZED).json(new ApiResponse(StatusCodes.UNAUTHORIZED, "Usuário não autenticado", null));
//         return;
//       }
//       const data = req.body;
//       await this.userService.updateUserPassword(data, req.user);
//       res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, "Senha atualizada com sucesso", null));
//     } catch (error) {
//       next(error);
//     }
//   }

//   async updateUserEmail(req: RequestWithUser, res: Response, next: NextFunction) {
//     try {
//       if (!req.user) {
//         res.status(StatusCodes.UNAUTHORIZED).json(new ApiResponse(StatusCodes.UNAUTHORIZED, "Usuário não autenticado", null));
//         return;
//       }
//       const data = req.body;
//       await this.userService.updateUserEmail(data, req.user);
//       res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, "Email atualizado com sucesso", null));
//     } catch (error) {
//       next(error);
//     }
//   }

//   async updateUserPersonalData(req: RequestWithUser, res: Response, next: NextFunction) {
//     try {
//       if (!req.user) {
//         res.status(StatusCodes.UNAUTHORIZED).json(new ApiResponse(StatusCodes.UNAUTHORIZED, "Usuário não autenticado", null));
//         return;
//       }
//       const data = req.body;
//       await this.userService.updateUserPersonalData(data, req.user);
//       res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, "Dados pessoais atualizados com sucesso", null));
//     } catch (error) {
//       next(error);
//     }
//   }
}
