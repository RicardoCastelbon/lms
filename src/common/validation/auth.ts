import * as z from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
  // email: z.string().email(),
  // password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
  education: z.number().or(z.string()),
  firstName: z.string(),
  lastName: z.string(),
  // errors: z.object({}).optional(),
  //userRole: z.string(),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const adminSignUpSchema = loginSchema.extend({
  email: z.string().email(),
  password: z.string().min(6),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;

export type IAdminLogin = z.infer<typeof adminLoginSchema>;
export type IAdminSignUp = z.infer<typeof adminSignUpSchema>;
