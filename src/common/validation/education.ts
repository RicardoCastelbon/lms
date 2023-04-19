import * as z from "zod";

export const createEducationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export const params = z.object({
  educationId: z.string(),
});

export const updateEducationSchema = z.object({
  params,
  body: z
    .object({
      name: z.string(),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
export type ParamsInput = z.infer<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
