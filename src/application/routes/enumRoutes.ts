import express from "express";
import { rateLimiter } from "../middleware/rateLimiter";
import { container } from "tsyringe";
import { EnumController } from "../../interfaces/controler/enumController";


const routes = express.Router();
const enumController = container.resolve<EnumController>(EnumController);

/**
 * @swagger
 * /api/v1/enums/districts:
 *   get:
 *     summary: Get all available districts
 *     tags: [Enums]
 *     parameters:
 *       - in: query
 *         name: provinceCode
 *         schema:
 *           type: string
 *         description: Province code to filter districts (optional)
 *     responses:
 *       200:
 *         description: List of districts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       code:
 *                         type: string
 *                       value:
 *                         type: string
 *                       provinceCode:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/districts", rateLimiter, enumController.getDistrictsByProvince.bind(enumController));

/**
 * @swagger
 * /api/v1/enums/provinces:
 *   get:
 *     summary: Get all available provinces of Mozambique
 *     tags: [Enums]
 *     responses:
 *       200:
 *         description: List of provinces
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       code:
 *                         type: string
 *                       value:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/provinces", rateLimiter, enumController.getProvinces.bind(enumController));

/**
 * @swagger
 * /api/v1/enums/genders:
 *   get:
 *     summary: Get all available genders
 *     tags: [Enums]
 *     responses:
 *       200:
 *         description: List of genders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       code:
 *                         type: string
 *                       value:
 *                         type: string
 *                   example:
 *                     - id: 1
 *                       code: "M"
 *                       value: "Masculino"
 *                     - id: 2
 *                       code: "F"
 *                       value: "Feminino"
 *                     - id: 3
 *                       code: "Other"
 *                       value: "Outro"
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/genders", rateLimiter, enumController.getGenders.bind(enumController));

/**
 * @swagger
 * /api/v1/enums/marital-statuses:
 *   get:
 *     summary: Get all available marital statuses
 *     tags: [Enums]
 *     responses:
 *       200:
 *         description: List of marital statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       code:
 *                         type: string
 *                       value:
 *                         type: string
 *                   example:
 *                     - id: 1
 *                       code: "Single"
 *                       value: "Solteiro"
 *                     - id: 2
 *                       code: "Married"
 *                       value: "Casado"
 *                     - id: 3
 *                       code: "Divorced"
 *                       value: "Divorciado"
 *                     - id: 4
 *                       code: "Widowed"
 *                       value: "Viúvo"
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/marital-statuses", rateLimiter, enumController.getMaritalStatuses.bind(enumController));

/**
 * @swagger
 * /api/v1/enums/roles:
 *   get:
 *     summary: Get all available roles
 *     tags: [Enums]
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       code:
 *                         type: string
 *                       value:
 *                         type: string
 *                   example:
 *                     - id: 1
 *                       code: "User"
 *                       value: "User"
 *                     - id: 2
 *                       code: "Admin"
 *                       value: "Admin"
 *                     - id: 3
 *                       code: "Moderator"
 *                       value: "Moderator"
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/roles", rateLimiter, enumController.getRoles.bind(enumController));

/**
 * @swagger
 * /api/v1/enums/nationalities:
 *   get:
 *     summary: Get all available nationalities
 *     tags: [Enums]
 *     responses:
 *       200:
 *         description: List of nationalities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       code:
 *                         type: string
 *                       value:
 *                         type: string
 *                   example:
 *                     - id: 1
 *                       code: "Mozambique"
 *                       value: "Mozambique"
 *                     - id: 2
 *                       code: "Portugal"
 *                       value: "Portugal"
 *                     - id: 3
 *                       code: "South Africa"
 *                       value: "South Africa"
 *                     - id: 4
 *                       code: "Brazil"
 *                       value: "Brazil"
 *                     - id: 5
 *                       code: "Angola"
 *                       value: "Angola"
 *                     - id: 6
 *                       code: "Other"
 *                       value: "Other"
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/nationalities", rateLimiter, enumController.getNationalities.bind(enumController));

/**
 * @swagger
 * /api/v1/enums/payment-methods:
 *   get:
 *     summary: Get all available payment methods
 *     tags: [Enums]
 *     responses:
 *       200:
 *         description: List of payment methods
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       code:
 *                         type: string
 *                       value:
 *                         type: string
 *                   example:
 *                     - id: 1
 *                       code: "M-pesa"
 *                       value: "M-pesa"
 *                     - id: 2
 *                       code: "E-mola"
 *                       value: "E-mola"
 *                     - id: 3
 *                       code: "M-kesh"
 *                       value: "M-kesh"
 *                     - id: 4
 *                       code: "Millenium Bim"
 *                       value: "Millenium Bim"
 *                     - id: 5
 *                       code: "BCI"
 *                       value: "BCI"
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/payment-methods", rateLimiter, enumController.getPaymentMethods.bind(enumController));

export default routes;
