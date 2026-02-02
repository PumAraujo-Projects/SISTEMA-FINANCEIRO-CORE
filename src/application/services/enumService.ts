import { injectable } from "tsyringe";
import { 
  PAYMENT_METHODS, 
  GENDERS,
  PROVINCES,
  DISTRICTS_BY_PROVINCE,
  paymentMethodToEnumItem, 
  genderToEnumItem, 
  provinceToEnumItem,
  districtToEnumItem,
  EnumItem,
  ProvinceType
} from "../../domain/models/enums";

/**
 * Service for managing enum values
 */
@injectable()
export class EnumService {
  
  /**
   * Get all payment methods as EnumItem array
   * @returns Array of payment method items with id, code, and value
   */
  getPaymentMethods(): EnumItem[] {
    return PAYMENT_METHODS.map((method, index) => 
      paymentMethodToEnumItem(method, index + 1)
    );
  }

  /**
   * Get all genders as EnumItem array
   * @returns Array of gender items with id, code, and value
   */
  getGenders(): EnumItem[] {
    return GENDERS.map((gender, index) => 
      genderToEnumItem(gender, index + 1)
    );
  }

  /**
   * Get all provinces as EnumItem array
   * @returns Array of province items with id, code, and value
   */
  getProvinces(): EnumItem[] {
    return PROVINCES.map((province, index) => 
      provinceToEnumItem(province, index + 1)
    );
  }

  /**
   * Get all districts for a specific province
   * @param provinceCode - The province code to get districts for
   * @returns Array of district items with id, code, and value
   */
  getDistrictsByProvince(provinceCode: ProvinceType): EnumItem[] {
    const districts = DISTRICTS_BY_PROVINCE[provinceCode] || [];
    return districts.map((district, index) => 
      districtToEnumItem(district, index + 1)
    );
  }
}

