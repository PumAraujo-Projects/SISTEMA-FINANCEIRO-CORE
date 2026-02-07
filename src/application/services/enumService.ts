import { injectable } from "tsyringe";
import {
  PaymentMethod,
  Gender,
  MaritalStatus,
  UserRole,
  ProvinceType,
  EnumOption
} from "../../domain/types/enums";

// Dados de示例 para enums
const PAYMENT_METHODS: PaymentMethod[] = [
  PaymentMethod.M_PESA,
  PaymentMethod.E_MOLA,
  PaymentMethod.M_KESH,
  PaymentMethod.MILLENNIUM_BIM,
  PaymentMethod.BCI,
];

const GENDERS: Gender[] = [Gender.MALE, Gender.FEMALE, Gender.OTHER];

const PROVINCES: ProvinceType[] = [
  "Maputo",
  "Gaza",
  "Inhambane",
  "Manica",
  "Sofala",
  "Tete",
  "Zambezia",
  "Nampula",
  "Cabo Delgado",
  "Niassa",
];

const DISTRICTS_BY_PROVINCE: Record<ProvinceType, string[]> = {
  "Maputo": ["Matola", "Maputo", "Marracuene", "Boane", "Manhiça", "Namaacha"],
  "Gaza": ["Xai-Xai", "Chibuto", "Chokwé", "Bilene", "Macia", "Mandlakazi"],
  "Inhambane": ["Inhambane", "Vilankulo", "Govuro", "Massinga", "Morrumbene"],
  "Manica": ["Chimoio", "Manica", "Gondola", "Sussundenga", "Barue"],
  "Sofala": ["Beira", "Dondo", "Gorongosa", "Nhamatanda", "Muanza"],
  "Tete": ["Tete", "Moatize", "Angónia", "Changara", "Marara"],
  "Zambezia": ["Quelimane", "Mocuba", "Gurué", "Alto Molócuè", "Nicoadala"],
  "Nampula": ["Nampula", "Nacala", "Monapo", "Mossuril", "Ribaué"],
  "Cabo Delgado": ["Pemba", "Montepuez", "Mueda", "Ancuabe", "Balama"],
  "Niassa": ["Lichinga", "Cuamba", "Mandimba", "Metarica", "Marrupa"],
};

const MARITAL_STATUSES: MaritalStatus[] = [
  MaritalStatus.SINGLE,
  MaritalStatus.MARRIED,
  MaritalStatus.DIVORCED,
  MaritalStatus.WIDOWED,
];

const ROLES: UserRole[] = [
  UserRole.CLIENTE,
  UserRole.FUNCIONARIO,
  UserRole.ADMINISTRADOR,
];

const NATIONALITIES = [
  "Mozambique",
  "Portugal",
  "South Africa",
  "Brazil",
  "Angola",
  "Other",
];

// Funções de conversão
function paymentMethodToEnumItem(method: PaymentMethod, id: number): EnumOption {
  return { id, code: method, value: method };
}

function genderToEnumItem(gender: Gender, id: number): EnumOption {
  const labels: Record<Gender, string> = {
    [Gender.MALE]: "Masculino",
    [Gender.FEMALE]: "Feminino",
    [Gender.OTHER]: "Outro",
  };
  return { id, code: gender, value: labels[gender] };
}

function provinceToEnumItem(province: ProvinceType, id: number): EnumOption {
  return { id, code: province, value: province };
}

function districtToEnumItem(district: string, id: number): EnumOption {
  return { id, code: district, value: district };
}

function maritalStatusToEnumItem(status: MaritalStatus, id: number): EnumOption {
  const labels: Record<MaritalStatus, string> = {
    [MaritalStatus.SINGLE]: "Solteiro",
    [MaritalStatus.MARRIED]: "Casado",
    [MaritalStatus.DIVORCED]: "Divorciado",
    [MaritalStatus.WIDOWED]: "Viúvo",
  };
  return { id, code: status, value: labels[status] };
}

function roleToEnumItem(role: UserRole, id: number): EnumOption {
  const labels: Record<UserRole, string> = {
    [UserRole.CLIENTE]: "Cliente",
    [UserRole.FUNCIONARIO]: "Funcionário",
    [UserRole.ADMINISTRADOR]: "Administrador",
  };
  return { id, code: role, value: labels[role] };
}

function nationalityToEnumItem(nationality: string, id: number): EnumOption {
  return { id, code: nationality, value: nationality };
}

/**
 * Service for managing enum values
 */
@injectable()
export class EnumService {
  
  /**
   * Get all payment methods as EnumOption array
   * @returns Array of payment method items with id, code, and value
   */
  getPaymentMethods(): EnumOption[] {
    return PAYMENT_METHODS.map((method: PaymentMethod, index: number) => 
      paymentMethodToEnumItem(method, index + 1)
    );
  }

  /**
   * Get all genders as EnumOption array
   * @returns Array of gender items with id, code, and value
   */
  getGenders(): EnumOption[] {
    return GENDERS.map((gender: Gender, index: number) => 
      genderToEnumItem(gender, index + 1)
    );
  }

  /**
   * Get all provinces as EnumOption array
   * @returns Array of province items with id, code, and value
   */
  getProvinces(): EnumOption[] {
    return PROVINCES.map((province: ProvinceType, index: number) => 
      provinceToEnumItem(province, index + 1)
    );
  }

  /**
   * Get all districts for a specific province
   * @param provinceCode - The province code to get districts for
   * @returns Array of district items with id, code, and value
   */
  getDistrictsByProvince(provinceCode: ProvinceType): EnumOption[] {
    const districts = DISTRICTS_BY_PROVINCE[provinceCode] || [];
    return districts.map((district: string, index: number) =>
      districtToEnumItem(district, index + 1)
    );
  }

  /**
   * Get all marital statuses as EnumOption array
   * @returns Array of marital status items with id, code, and value
   */
  getMaritalStatuses(): EnumOption[] {
    return MARITAL_STATUSES.map((status: MaritalStatus, index: number) =>
      maritalStatusToEnumItem(status, index + 1)
    );
  }

  /**
   * Get all roles as EnumOption array
   * @returns Array of role items with id, code, and value
   */
  getRoles(): EnumOption[] {
    return ROLES.map((role: UserRole, index: number) =>
      roleToEnumItem(role, index + 1)
    );
  }

  /**
   * Get all nationalities as EnumOption array
   * @returns Array of nationality items with id, code, and value
   */
  getNationalities(): EnumOption[] {
    return NATIONALITIES.map((nationality: string, index: number) =>
      nationalityToEnumItem(nationality, index + 1)
    );
  }
}

