import * as z from "zod";

export const education = z
  .object({
    id: z.number(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .or(
    z
      .object({
        id: z.number(),
        name: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
      .array()
  );

/* export const educationsSchema = z.object({
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
}); */
const error = z
  .object({
    code: z.string(),
    message: z.string(),
    meta: z
      .object({
        cause: z.string().optional(),
      })
      .optional(),
  })
  .optional();

export const educationInputSchema = z.object({
  name: z.string(),
});

export const educationOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  education: education.nullish(),
  error: error,
});
export const createEducationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

/* export const educationId = z.object({
  educationId: z.string(),
}); */

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
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type EducationInput = z.infer<typeof educationInputSchema>;
export type EducationOutput = z.infer<typeof educationOutputSchema>;
// export type EducationIdSchema = z.infer<typeof educationId>;

export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
