import { z } from "zod";

// Email validation helper
const emailSchema = z.string().email("Email inválido");

// Password validation: minimum 6 characters
const passwordSchema = z.string().min(6, "A senha deve ter pelo menos 6 caracteres");

// Login validation schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Validation function that returns formatted errors
export function validateLogin(data: unknown) {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

