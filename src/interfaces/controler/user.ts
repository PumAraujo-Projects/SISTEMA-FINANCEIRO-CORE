import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../../application/services/user";
import { ApiResponse } from "../response/apiResponse";
import { RequestWithUser } from "../../infrastruture/types";

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  /**
   * POST /users/create
   * Create a new user
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this.userService.create(data);
      res.status(StatusCodes.CREATED).json(
        new ApiResponse(StatusCodes.CREATED, "Usuário criado com sucesso", null)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /users/all
   * Get all users
   */
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getUsers();
      res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, "Usuários encontrados", users)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /users/:id
   * Get user by ID
   */
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const user = await this.userService.findById(id);
      res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, "Usuário encontrado", user)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /user/online
   * Get current online user
   */
  async getOnlineUser(req: Request, res: Response, next: NextFunction) {
    try {
      const requestWithUser = req as RequestWithUser;
      if (!requestWithUser.user) {
        res.status(StatusCodes.UNAUTHORIZED).json(
          new ApiResponse(StatusCodes.UNAUTHORIZED, "Usuário não autenticado", null)
        );
        return;
      }
      const onlineUser = await this.userService.getOnlineUserDetails(requestWithUser.user);
      res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, "Usuário online encontrado", onlineUser)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /users/:id
   * Update user data
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = req.body;
      await this.userService.update(id, data);
      res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, "Usuário atualizado com sucesso", null)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /users/:id/password
   * Update user password
   */
  async updateUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { currentPassword, newPassword } = req.body;
      await this.userService.updatePassword(id, currentPassword, newPassword);
      res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, "Senha atualizada com sucesso", null)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /users/:id/email
   * Update user email
   */
  async updateUserEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { email } = req.body;
      await this.userService.updateEmail(id, email);
      res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, "Email atualizado com sucesso", null)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /users/:id
   * Deactivate user (soft delete)
   */
  async deactivateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await this.userService.deactivate(id);
      res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, "Usuário desativado com sucesso", null)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /users/:id/activate
   * Activate user
   */
  async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await this.userService.activate(id);
      res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, "Usuário ativado com sucesso", null)
      );
    } catch (error) {
      next(error);
    }
  }
}
