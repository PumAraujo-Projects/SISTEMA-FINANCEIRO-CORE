import { injectable } from "tsyringe";
import {
  PAYMENT_METHODS,
  GENDERS,
  PROVINCES,
  DISTRICTS_BY_PROVINCE,
  MARITAL_STATUSES,
  ROLES,
  NATIONALITIES,
  paymentMethodToEnumItem,
  genderToEnumItem,
  provinceToEnumItem,
  districtToEnumItem,
  maritalStatusToEnumItem,
  roleToEnumItem,
  nationalityToEnumItem,
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

  /**
   * Get all marital statuses as EnumItem array
   * @returns Array of marital status items with id, code, and value
   */
  getMaritalStatuses(): EnumItem[] {
    return MARITAL_STATUSES.map((status, index) =>
      maritalStatusToEnumItem(status, index + 1)
    );
  }

  /**
   * Get all roles as EnumItem array
   * @returns Array of role items with id, code, and value
   */
  getRoles(): EnumItem[] {
    return ROLES.map((role, index) =>
      roleToEnumItem(role, index + 1)
    );
  }

  /**
   * Get all nationalities as EnumItem array
   * @returns Array of nationality items with id, code, and value
   */
  getNationalities(): EnumItem[] {
    return NATIONALITIES.map((nationality, index) =>
      nationalityToEnumItem(nationality, index + 1)
    );
  }
}

