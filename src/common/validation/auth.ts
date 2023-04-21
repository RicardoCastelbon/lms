import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const adminSignUpSchema = loginSchema.extend({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpSchema = loginSchema.extend({
  education: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  userRole: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type IAdminLogin = z.infer<typeof adminLoginSchema>;
export type IAdminSignUp = z.infer<typeof adminSignUpSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
