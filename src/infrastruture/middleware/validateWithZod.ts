import { ZodSchema } from "zod";
import { BadRequestException } from "../exception/defaultexception";

export function validateWithZod<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => 
      `${issue.path.join(".")}: ${issue.message}`
    ).join(", ");
    throw new BadRequestException(`Validation failed: ${formattedErrors}`);
  }
  
  return result.data;
}

