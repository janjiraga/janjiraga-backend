import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(20, "username must be at most 20 characters")
    .toLowerCase()
    .openapi({ example: "user" }),
  email: z.string().email().openapi({ example: "user@mail.com" }),
  password: z.string().min(6).openapi({ example: "password" }),
  firstName: z.string().openapi({ example: "user" }),
  lastName: z.string().openapi({ example: "user" }),
  phone: z.string().openapi({ example: "08123456789" }),
});

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(20, "username must be at most 20 characters")
    .toLowerCase()
    .openapi({ example: "user" }),
  password: z.string().min(6).openapi({ example: "password" }),
});
