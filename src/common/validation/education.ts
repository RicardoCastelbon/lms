import * as z from "zod";

export const createEducationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export const educationId = z.object({
  educationId: z.string(),
});

export const updateEducationSchema = z.object({
  educationId,
  body: z
    .object({
      name: z.string(),
    })
    .partial(),
});

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
export type EducationId = z.infer<typeof educationId>;
