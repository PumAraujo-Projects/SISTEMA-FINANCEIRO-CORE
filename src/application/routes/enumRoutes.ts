import express from "express";
import { rateLimiter } from "../middleware/rateLimiter";
import { registerDependencies } from "../../infrastruture/config/dependencyInjection";
import { EnumController } from "../../interfaces/controler/enumController";

const routes = express.Router();
const container = registerDependencies();

const enumController = container.resolve<EnumController>(EnumController);

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
 * /api/v1/enums/provinces:
 *   get:
 *     summary: Get all provinces of Mozambique
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
 *                   example:
 *                     - id: 1
 *                       code: "Maputo"
 *                       value: "Maputo"
 *                     - id: 2
 *                       code: "Gaza"
 *                       value: "Gaza"
 *                     - id: 3
 *                       code: "Inhambane"
 *                       value: "Inhambane"
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/provinces", rateLimiter, enumController.getProvinces.bind(enumController));

/**
 * @swagger
 * /api/v1/enums/districts:
 *   get:
 *     summary: Get all districts for a specific province
 *     tags: [Enums]
 *     parameters:
 *       - in: query
 *         name: province
 *         required: true
 *         schema:
 *           type: string
 *         description: Province code (e.g., "Maputo", "Gaza", "Inhambane", etc.)
 *         example: "Maputo"
 *     responses:
 *       200:
 *         description: List of districts for the specified province
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
 *                       code: "Matola"
 *                       value: "Matola"
 *                     - id: 2
 *                       code: "Maputo"
 *                       value: "Maputo"
 *                     - id: 3
 *                       code: "Boane"
 *                       value: "Boane"
 *       400:
 *         description: Province parameter is required
 *       500:
 *         description: Internal server error
 */
routes.get("/enums/districts", rateLimiter, enumController.getDistrictsByProvince.bind(enumController));

export default routes;

