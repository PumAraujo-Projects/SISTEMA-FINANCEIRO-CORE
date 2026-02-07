import express, { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../../interfaces/controler/authentication";
import { rateLimiter } from "../middleware/rateLimiter";
import { UserController } from "../../interfaces/controler/user";
import { registerDependencies } from "../../infrastruture/config/dependencyInjection";
import { authenticateToken } from "../middleware/tokenValidation";
import enumRoutes from "./enumRoutes";

const routes: Router = express.Router();
const container = registerDependencies();

const userController = container.resolve<UserController>(UserController);
const authController = container.resolve<AuthController>(AuthController);

// Health check endpoint
routes.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "sistema-financeiro-api",
    version: process.env.APP_VERSION || "1.0.0",
  });
});

// Enum routes
routes.use(enumRoutes);

// ==================== AUTH ROUTES ====================

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar usuário e obter token JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
routes.post("/auth/login", rateLimiter, (req: Request, res: Response, next: NextFunction) => 
  authController.login(req, res, next).catch(next)
);

// ==================== USER ROUTES ====================

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - code
 *               - nuit
 *               - msisdn
 *               - address
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               code:
 *                 type: string
 *               nuit:
 *                 type: string
 *               msisdn:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Conflito
 */
routes.post("/users/create", rateLimiter, (req: Request, res: Response, next: NextFunction) =>
  userController.createUser(req, res, next).catch(next)
);

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
routes.get("/users/all", rateLimiter, authenticateToken, (req: Request, res: Response, next: NextFunction) =>
  userController.getAllUsers(req, res, next).catch(next)
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
routes.get("/users/:id", rateLimiter, authenticateToken, (req: Request, res: Response, next: NextFunction) =>
  userController.getUserById(req, res, next).catch(next)
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar dados do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routes.put("/users/:id", rateLimiter, authenticateToken, (req: Request, res: Response, next: NextFunction) =>
  userController.updateUser(req, res, next).catch(next)
);

/**
 * @swagger
 * /users/{id}/password:
 *   put:
 *     summary: Alterar senha do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Senha atual incorreta
 */
routes.put("/users/:id/password", rateLimiter, authenticateToken, (req: Request, res: Response, next: NextFunction) =>
  userController.updateUserPassword(req, res, next).catch(next)
);

/**
 * @swagger
 * /users/{id}/email:
 *   put:
 *     summary: Alterar email do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email atualizado com sucesso
 */
routes.put("/users/:id/email", rateLimiter, authenticateToken, (req: Request, res: Response, next: NextFunction) =>
  userController.updateUserEmail(req, res, next).catch(next)
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Desativar usuário (soft delete)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routes.delete("/users/:id", rateLimiter, authenticateToken, (req: Request, res: Response, next: NextFunction) =>
  userController.deactivateUser(req, res, next).catch(next)
);

/**
 * @swagger
 * /users/{id}/activate:
 *   put:
 *     summary: Ativar usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário ativado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routes.put("/users/:id/activate", rateLimiter, authenticateToken, (req: Request, res: Response, next: NextFunction) =>
  userController.activateUser(req, res, next).catch(next)
);

/**
 * @swagger
 * /user/online:
 *   get:
 *     summary: Obter informações do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário online
 *       401:
 *         description: Não autorizado
 */
routes.get("/user/online", rateLimiter, authenticateToken, (req: Request, res: Response, next: NextFunction) =>
  userController.getOnlineUser(req, res, next).catch(next)
);

export default routes;

