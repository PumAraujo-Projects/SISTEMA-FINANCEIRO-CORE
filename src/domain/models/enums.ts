/**
 * Interface representing an enum item with id, code, and value
 */
export interface EnumItem {
  id: number;
  code: string;
  value: string;
}

/**
 * Payment Method options available in the system
 */
export type PaymentMethodType = "M-pesa" | "E-mola" | "M-kesh" | "Millenium Bim" | "BCI";

/**
 * Gender options available in the system
 */
export type GenderType = "M" | "F" | "Other";

/**
 * Mozambique Province type
 */
export type ProvinceType = 
  | "Maputo"
  | "Gaza"
  | "Inhambane"
  | "Sofala"
  | "Manica"
  | "Tete"
  | "Zambezia"
  | "Nampula"
  | "Cabo Delgado"
  | "Niassa";

/**
 * District type
 */
export interface DistrictType {
  code: string;
  value: string;
  provinceCode: string;
}

/**
 * List of available payment methods
 */
export const PAYMENT_METHODS: PaymentMethodType[] = [
  "M-pesa",
  "E-mola", 
  "M-kesh",
  "Millenium Bim",
  "BCI"
];

/**
 * List of available genders
 */
export const GENDERS: GenderType[] = [
  "M",
  "F",
  "Other"
];

/**
 * List of Mozambique provinces
 */
export const PROVINCES: ProvinceType[] = [
  "Maputo",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambezia",
  "Nampula",
  "Cabo Delgado",
  "Niassa"
];

/**
 * Districts by province
 */
export const DISTRICTS_BY_PROVINCE: Record<ProvinceType, DistrictType[]> = {
  "Maputo": [
    { code: "Matola", value: "Matola", provinceCode: "Maputo" },
    { code: "Maputo", value: "Maputo", provinceCode: "Maputo" },
    { code: "Boane", value: "Boane", provinceCode: "Maputo" },
    { code: "Marracuene", value: "Marracuene", provinceCode: "Maputo" },
    { code: "Manhiça", value: "Manhiça", provinceCode: "Maputo" },
    { code: "Namaacha", value: "Namaacha", provinceCode: "Maputo" },
    { code: "Moamba", value: "Moamba", provinceCode: "Maputo" },
    { code: "Magude", value: "Magude", provinceCode: "Maputo" },
    { code: "Bilene", value: "Bilene", provinceCode: "Maputo" },
    { code: "Chibuto", value: "Chibuto", provinceCode: "Maputo" },
    { code: "Chokwé", value: "Chokwé", provinceCode: "Maputo" },
    { code: "Guijá", value: "Guijá", provinceCode: "Maputo" },
    { code: "Mabalane", value: "Mabalane", provinceCode: "Maputo" },
    { code: "Massingir", value: "Massingir", provinceCode: "Maputo" },
    { code: "Xai-Xai", value: "Xai-Xai", provinceCode: "Maputo" }
  ],
  "Gaza": [
    { code: "Xai-Xai", value: "Xai-Xai", provinceCode: "Gaza" },
    { code: "Chokwé", value: "Chokwé", provinceCode: "Gaza" },
    { code: "Chibuto", value: "Chibuto", provinceCode: "Gaza" },
    { code: "Guijá", value: "Guijá", provinceCode: "Gaza" },
    { code: "Mabalane", value: "Mabalane", provinceCode: "Gaza" },
    { code: "Massingir", value: "Massingir", provinceCode: "Gaza" },
    { code: "Bilene", value: "Bilene", provinceCode: "Gaza" },
    { code: "Macia", value: "Macía", provinceCode: "Gaza" },
    { code: "Chicualacuala", value: "Chicualacuala", provinceCode: "Gaza" },
    { code: "Mabote", value: "Mabote", provinceCode: "Gaza" },
    { code: "Limpopo", value: "Limpopo", provinceCode: "Gaza" }
  ],
  "Inhambane": [
    { code: "Inhambane", value: "Inhambane", provinceCode: "Inhambane" },
    { code: "Maxixe", value: "Maxixe", provinceCode: "Inhambane" },
    { code: "Funhalouro", value: "Funhalouro", provinceCode: "Inhambane" },
    { code: "Govuro", value: "Govuro", provinceCode: "Inhambane" },
    { code: "Mabote", value: "Mabote", provinceCode: "Inhambane" },
    { code: "Morrumbene", value: "Morrumbene", provinceCode: "Inhambane" },
    { code: "Panda", value: "Panda", provinceCode: "Inhambane" },
    { code: "Vilanculos", value: "Vilanculos", provinceCode: "Inhambane" },
    { code: "Zavala", value: "Zavala", provinceCode: "Inhambane" },
    { code: "Massinga", value: "Massinga", provinceCode: "Inhambane" },
    { code: "Homoine", value: "Homoine", provinceCode: "Inhambane" },
    { code: "Jangamo", value: "Jangamo", provinceCode: "Inhambane" },
    { code: "Mabilingane", value: "Mabilingane", provinceCode: "Inhambane" }
  ],
  "Sofala": [
    { code: "Beira", value: "Beira", provinceCode: "Sofala" },
    { code: "Dondo", value: "Dondo", provinceCode: "Sofala" },
    { code: "Gorongosa", value: "Gorongosa", provinceCode: "Sofala" },
    { code: "Muanza", value: "Muanza", provinceCode: "Sofala" },
    { code: "Nhamatanda", value: "Nhamatanda", provinceCode: "Sofala" },
    { code: "Chemba", value: "Chemba", provinceCode: "Sofala" },
    { code: "Caia", value: "Caia", provinceCode: "Sofala" },
    { code: "Marromeu", value: "Marromeu", provinceCode: "Sofala" },
    { code: "Chire", value: "Chire", provinceCode: "Sofala" }
  ],
  "Manica": [
    { code: "Chimoio", value: "Chimoio", provinceCode: "Manica" },
    { code: "Manica", value: "Manica", provinceCode: "Manica" },
    { code: "Barue", value: "Barué", provinceCode: "Manica" },
    { code: "Gondola", value: "Gondola", provinceCode: "Manica" },
    { code: "Macate", value: "Macate", provinceCode: "Manica" },
    { code: "Sussundenga", value: "Sussundenga", provinceCode: "Manica" },
    { code: "Tambarara", value: "Tambarara", provinceCode: "Manica" },
    { code: "Vanduzi", value: "Vanduzi", provinceCode: "Manica" },
    { code: "Machaze", value: "Machaze", provinceCode: "Manica" }
  ],
  "Tete": [
    { code: "Tete", value: "Tete", provinceCode: "Tete" },
    { code: "Moatize", value: "Moatize", provinceCode: "Tete" },
    { code: "Changara", value: "Changara", provinceCode: "Tete" },
    { code: "Chiuta", value: "Chiuta", provinceCode: "Tete" },
    { code: "Marávia", value: "Marávia", provinceCode: "Tete" },
    { code: "Cahora-Bassa", value: "Cahora-Bassa", provinceCode: "Tete" },
    { code: "Songo", value: "Songo", provinceCode: "Tete" },
    { code: "Magoe", value: "Magoé", provinceCode: "Tete" },
    { code: "Doa", value: "Doa", provinceCode: "Tete" },
    { code: "Luanga", value: "Luanga", provinceCode: "Tete" }
  ],
  "Zambezia": [
    { code: "Quelimane", value: "Quelimane", provinceCode: "Zambezia" },
    { code: "Mocuba", value: "Mocuba", provinceCode: "Zambezia" },
    { code: "Alto Molocue", value: "Alto Molócuè", provinceCode: "Zambezia" },
    { code: "Chinde", value: "Chinde", provinceCode: "Zambezia" },
    { code: "Gurué", value: "Gurué", provinceCode: "Zambezia" },
    { code: "Inhassunge", value: "Inhassunge", provinceCode: "Zambezia" },
    { code: "Lugela", value: "Lugela", provinceCode: "Zambezia" },
    { code: "Maganja da Costa", value: "Maganja da Costa", provinceCode: "Zambezia" },
    { code: "Milange", value: "Milange", provinceCode: "Zambezia" },
    { code: "Mopeia", value: "Mopeia", provinceCode: "Zambezia" },
    { code: "Namarrai", value: "Namarrai", provinceCode: "Zambezia" },
    { code: "Nicoadala", value: "Nicoadala", provinceCode: "Zambezia" },
    { code: "Pebane", value: "Pebane", provinceCode: "Zambezia" }
  ],
  "Nampula": [
    { code: "Nampula", value: "Nampula", provinceCode: "Nampula" },
    { code: "Angoche", value: "Angoche", provinceCode: "Nampula" },
    { code: "Eráti", value: "Eráti", provinceCode: "Nampula" },
    { code: "Lalau", value: "Lalau", provinceCode: "Nampula" },
    { code: "Larde", value: "Larde", provinceCode: "Nampula" },
    { code: "Liúpo", value: "Liúpo", provinceCode: "Nampula" },
    { code: "Malema", value: "Malema", provinceCode: "Nampula" },
    { code: "Mecubúri", value: "Mecubúri", provinceCode: "Nampula" },
    { code: "Mogincual", value: "Mogincual", provinceCode: "Nampula" },
    { code: "Mogovolas", value: "Mogovolas", provinceCode: "Nampula" },
    { code: "Monapo", value: "Monapo", provinceCode: "Nampula" },
    { code: "Mossuril", value: "Mossuril", provinceCode: "Nampula" },
    { code: "Muecate", value: "Muecate", provinceCode: "Nampula" },
    { code: "Murrupula", value: "Murrupula", provinceCode: "Nampula" },
    { code: "Nacarôa", value: "Nacarôa", provinceCode: "Nampula" },
    { code: "Ribáuè", value: "Ribáuè", provinceCode: "Nampula" }
  ],
  "Cabo Delgado": [
    { code: "Pemba", value: "Pemba", provinceCode: "Cabo Delgado" },
    { code: "Chiúre", value: "Chiúre", provinceCode: "Cabo Delgado" },
    { code: "Ancuabe", value: "Ancuabe", provinceCode: "Cabo Delgado" },
    { code: "Balama", value: "Balama", provinceCode: "Cabo Delgado" },
    { code: "Mecufi", value: "Mecufi", provinceCode: "Cabo Delgado" },
    { code: "Metarica", value: "Metarica", provinceCode: "Cabo Delgado" },
    { code: "Muamba", value: "Muamba", provinceCode: "Cabo Delgado" },
    { code: "Mueda", value: "Mueda", provinceCode: "Cabo Delgado" },
    { code: "Muidumbe", value: "Muidumbe", provinceCode: "Cabo Delgado" },
    { code: "Namuno", value: "Namuno", provinceCode: "Cabo Delgado" },
    { code: "Nangade", value: "Nangade", provinceCode: "Cabo Delgado" },
    { code: "Palma", value: "Palma", provinceCode: "Cabo Delgado" },
    { code: "Quissanga", value: "Quissanga", provinceCode: "Cabo Delgado" },
    { code: "Macomia", value: "Macomia", provinceCode: "Cabo Delgado" },
    { code: "Meluco", value: "Meluco", provinceCode: "Cabo Delgado" }
  ],
  "Niassa": [
    { code: "Lichinga", value: "Lichinga", provinceCode: "Niassa" },
    { code: "Cuamba", value: "Cuamba", provinceCode: "Niassa" },
    { code: "Lago", value: "Lago", provinceCode: "Niassa" },
    { code: "Chimbonila", value: "Chimbonila", provinceCode: "Niassa" },
    { code: "Majune", value: "Majune", provinceCode: "Niassa" },
    { code: "Mandimba", value: "Mandimba", provinceCode: "Niassa" },
    { code: "Marrupa", value: "Marrupa", provinceCode: "Niassa" },
    { code: "Maúa", value: "Maúa", provinceCode: "Niassa" },
    { code: "Mavago", value: "Mavago", provinceCode: "Niassa" },
    { code: "Mecanhelas", value: "Mecanhelas", provinceCode: "Niassa" },
    { code: "Mecula", value: "Mecula", provinceCode: "Niassa" },
    { code: "Muembe", value: "Muembe", provinceCode: "Niassa" },
    { code: "N'gauma", value: "N'gauma", provinceCode: "Niassa" },
    { code: "Nipepe", value: "Nipepe", provinceCode: "Niassa" },
    { code: "Sanga", value: "Sanga", provinceCode: "Niassa" }
  ]
};

/**
 * Convert payment method type to EnumItem
 */
export function paymentMethodToEnumItem(method: PaymentMethodType, id: number): EnumItem {
  return {
    id,
    code: method,
    value: method
  };
}

/**
 * Convert gender type to EnumItem
 */
export function genderToEnumItem(gender: GenderType, id: number): EnumItem {
  const genderLabels: Record<GenderType, string> = {
    "M": "Masculino",
    "F": "Feminino",
    "Other": "Outro"
  };
  
  return {
    id,
    code: gender,
    value: genderLabels[gender]
  };
}

/**
 * Convert province type to EnumItem
 */
export function provinceToEnumItem(province: ProvinceType, id: number): EnumItem {
  return {
    id,
    code: province,
    value: province
  };
}

/**
 * Convert district type to EnumItem
 */
export function districtToEnumItem(district: DistrictType, id: number): EnumItem {
  return {
    id,
    code: district.code,
    value: district.value
  };
}

