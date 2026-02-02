import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EnumService } from "../../application/services/enumService";
import { ApiResponse } from "../response/apiResponse";
import { ProvinceType } from "../../domain/models/enums";

/**
 * Controller for enum-related endpoints
 */
@injectable()
export class EnumController {
  constructor(@inject(EnumService) private enumService: EnumService) {}

  /**
   * GET /api/v1/enums/payment-methods
   * Get all available payment methods
   */
  async getPaymentMethods(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentMethods = this.enumService.getPaymentMethods();
      res.json(new ApiResponse(
        StatusCodes.OK, 
        "Métodos de pagamento encontrados", 
        paymentMethods
      ));
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/enums/genders
   * Get all available genders
   */
  async getGenders(req: Request, res: Response, next: NextFunction) {
    try {
      const genders = this.enumService.getGenders();
      res.json(new ApiResponse(
        StatusCodes.OK, 
        "Gêneros encontrados", 
        genders
      ));
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/enums/provinces
   * Get all available provinces of Mozambique
   */
  async getProvinces(req: Request, res: Response, next: NextFunction) {
    try {
      const provinces = this.enumService.getProvinces();
      res.json(new ApiResponse(
        StatusCodes.OK, 
        "Províncias de Moçambique encontradas", 
        provinces
      ));
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/enums/districts
   * Get all districts for a specific province
   * Query params: province - The province code
   */
  async getDistrictsByProvince(req: Request, res: Response, next: NextFunction) {
    try {
      const { province } = req.query;
      
      if (!province || typeof province !== "string") {
        res.status(StatusCodes.BAD_REQUEST).json(
          new ApiResponse(StatusCodes.BAD_REQUEST, "Parâmetro province é obrigatório", null)
        );
        return;
      }

      const districts = this.enumService.getDistrictsByProvince(province as ProvinceType);
      res.json(new ApiResponse(
        StatusCodes.OK, 
        `Distritos da província de ${province} encontrados`, 
        districts
      ));
    } catch (error) {
      next(error);
    }
  }
}

