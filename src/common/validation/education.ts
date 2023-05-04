import * as z from "zod";

export const educationSchema = z.object({
  status: z.string(),
  education: z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});
export const educationsSchema = z.object({
  status: z.string(),
  results: z.number(),
  education: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});

export const createEducationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export const params = z.object({
  educationId: z.string(),
});

export const updateEducationSchema = z.object({
  educationId: z.string(),
  body: z
    .object({
      name: z.string(),
    })
    .partial(),
});

export const updatedEducationResponse = z.object({
  status: z.string(),
  updateEducationSchema,
  //data: z.string(),
});

export const filterQuery = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
});

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
export type ParamsInput = z.infer<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
