import { z } from "zod";

// Enum values validation
const genderEnum = z.enum(["M", "F", "Other"]);
const roleEnum = z.enum(["Cliente", "Funcionario", "Administrador"]);
const paymentMethodEnum = z.enum(["M-pesa", "E-mola", "M-kesh", "Millenium Bim", "BCI"]);

// Email validation helper
const emailSchema = z.string().email("Email inválido");

// Password validation: minimum 8 characters, at least one letter and one number
const passwordSchema = z
  .string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .regex(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número");

// NUIT validation: Mozambique fiscal number (typically 9 digits)
const nuitSchema = z
  .string()
  .min(9, "NUIT deve ter pelo menos 9 dígitos")
  .max(9, "NUIT deve ter no máximo 9 dígitos")
  .regex(/^[0-9]+$/, "NUIT deve conter apenas números");

// MSISDN validation: Mozambique phone number (typically 9 digits starting with 8)
const msisdnSchema = z
  .string()
  .min(9, "MSISDN deve ter pelo menos 9 dígitos")
  .max(9, "MSISDN deve ter no máximo 9 dígitos")
  .regex(/^8[0-9]+$/, "MSISDN deve começar com 8");

// Date of birth validation (must be past date)
const dateOfBirthSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato AAAA-MM-DD")
  .refine((date) => new Date(date) < new Date(), "Data de nascimento deve ser no passado");

// User creation validation schema
export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nome completo deve ter pelo menos 3 caracteres")
    .max(100, "Nome completo deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-Z\s]+$/, "Nome completo deve conter apenas letras"),

  email: emailSchema,

  password: passwordSchema,

  code: z
    .string()
    .min(3, "Código deve ter pelo menos 3 caracteres")
    .max(20, "Código deve ter no máximo 20 caracteres")
    .regex(/^[A-Za-z0-9]+$/, "Código deve conter apenas letras e números"),

  nuit: nuitSchema,

  msisdn: msisdnSchema,

  address: z
    .string()
    .min(5, "Endereço deve ter pelo menos 5 caracteres")
    .max(200, "Endereço deve ter no máximo 200 caracteres"),

  dateOfBirth: dateOfBirthSchema.optional(),

  gender: genderEnum.optional(),

  role: roleEnum.optional(),

  notes: z.string().max(500, "Observações devem ter no máximo 500 caracteres").optional(),

  isActive: z.boolean().optional(),

  registrationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato AAAA-MM-DD")
    .optional(),

  nationality: z.string().max(50, "Nacionalidade deve ter no máximo 50 caracteres").optional(),

  maritalStatus: z.string().max(30, "Estado civil deve ter no máximo 30 caracteres").optional(),

  occupation: z.string().max(50, "Profissão deve ter no máximo 50 caracteres").optional(),

  preferredPaymentMethod: paymentMethodEnum.optional(),

  loyaltyPoints: z.number().int("Pontos devem ser inteiros").min(0, "Pontos não podem ser negativos").optional(),
});

// User update validation schema (all fields optional)
export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nome completo deve ter pelo menos 3 caracteres")
    .max(100, "Nome completo deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-Z\s]+$/, "Nome completo deve conter apenas letras")
    .optional(),

  address: z
    .string()
    .min(5, "Endereço deve ter pelo menos 5 caracteres")
    .max(200, "Endereço deve ter no máximo 200 caracteres")
    .optional(),

  dateOfBirth: dateOfBirthSchema.optional(),

  gender: genderEnum.optional(),

  notes: z.string().max(500, "Observações devem ter no máximo 500 caracteres").optional(),

  isActive: z.boolean().optional(),

  nationality: z.string().max(50, "Nacionalidade deve ter no máximo 50 caracteres").optional(),

  maritalStatus: z.string().max(30, "Estado civil deve ter no máximo 30 caracteres").optional(),

  occupation: z.string().max(50, "Profissão deve ter no máximo 50 caracteres").optional(),

  preferredPaymentMethod: paymentMethodEnum.optional(),
});

// Email update validation schema
export const updateEmailSchema = z.object({
  email: emailSchema,
});

// Password update validation schema
export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: passwordSchema,
});

// Validation function that returns formatted errors
export function validateCreateUser(data: unknown) {
  const result = createUserSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

export function validateUpdateUser(data: unknown) {
  const result = updateUserSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

export function validateUpdateEmail(data: unknown) {
  const result = updateEmailSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

export function validateUpdatePassword(data: unknown) {
  const result = updatePasswordSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

