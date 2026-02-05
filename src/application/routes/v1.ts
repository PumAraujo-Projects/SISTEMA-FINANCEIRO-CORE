import express from "express";
import { AuthController } from "../../interfaces/controler/authentication";
import { rateLimiter } from "../middleware/rateLimiter";
import { UserController } from "../../interfaces/controler/user";
import { registerDependencies } from "../../infrastruture/config/dependencyInjection";
import { authenticateToken } from "../middleware/tokenValidation";
import enumRoutes from "./enumRoutes";

const routes = express.Router();
const container = registerDependencies();

const userController = container.resolve<UserController>(UserController);
const authController = container.resolve<AuthController>(AuthController);

// Health check endpoint
routes.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "sistema-financeiro-api",
    version: process.env.APP_VERSION || "1.0.0"
  });
});

// Enum routes
routes.use(enumRoutes);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
routes.post("/auth/login", rateLimiter, authController.login.bind(authController));

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: Create a new user
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
 *                 description: Nome completo do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *               code:
 *                 type: string
 *                 description: Código do usuário
 *               nuit:
 *                 type: string
 *                 description: NUIT - Número de Identificação Fiscal
 *               msisdn:
 *                 type: string
 *                 description: Número de telefone
 *               address:
 *                 type: string
 *                 description: Endereço físico
 *               dateOfBirth:
 *                 type: string
 *                 description: Data de nascimento (opcional)
 *               gender:
 *                 type: string
 *                 enum: ["M", "F", "Other"]
 *                 description: Sexo (opcional)
 *               role:
 *                 type: string
 *                 enum: ["Cliente", "Funcionario", "Administrador"]
 *                 description: Papel do usuário (opcional)
 *               notes:
 *                 type: string
 *                 description: Observações adicionais (opcional)
 *               isActive:
 *                 type: boolean
 *                 description: Usuário ativo ou não (opcional)
 *               registrationDate:
 *                 type: string
 *                 description: Data de registro (opcional)
 *               nationality:
 *                 type: string
 *                 description: Nacionalidade (opcional)
 *               maritalStatus:
 *                 type: string
 *                 description: Estado civil (opcional)
 *               occupation:
 *                 type: string
 *                 description: Profissão (opcional)
 *               preferredPaymentMethod:
 *                 type: string
 *                 enum: ["M-pesa", "E-mola", "M-kesh", "Millenium Bim", "BCI"]
 *                 description: Método de pagamento preferido (opcional)
 *               loyaltyPoints:
 *                 type: number
 *                 description: Pontos de fidelidade do cliente (opcional)
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
routes.post("/users/create", rateLimiter, userController.createUser.bind(userController));

/**
 * @swagger
 * /api/v1/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 */
routes.get("/users/all", rateLimiter, authenticateToken, userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /api/v1/user/online:
 *   get:
 *     summary: Get current online user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *       401:
 *         description: Unauthorized
 */
routes.get("/user/online", rateLimiter, authenticateToken, userController.getOnlineUser.bind(userController));

export default routes;

