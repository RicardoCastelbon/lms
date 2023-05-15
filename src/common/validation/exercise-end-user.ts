import * as z from "zod";

//Default definition of resource, as object OR array of resource-objects
const exercise = z
  .object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    moduleId: z.number(),
  })
  .or(
    z
      .object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        moduleId: z.number(),
      })
      .array()
  );

//Error, should be attatched to all outputs
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

//Default resourse input schema, used for creating a resource
export const exerciseInputSchema = z.object({
  title: z.string(),
  content: z.string(),
  moduleId: z.number(),
});

//Default resource output schema, used in all outputs.
export const exerciseOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  exercise: exercise.nullish(),
  error: error,
});

//Special schema for updating a resource, resourseId is attached. Body is all optional.
export const updateExerciseInputSchema = z.object({
  exerciseId: z.string(),
  body: z
    .object({
      title: z.string(),
      content: z.string(),
      moduleId: z.number(),
    })
    .partial(),
});

export const exerciseId = z.object({
  exerciseId: z.string(),
});

export const exerciseSlug = z.object({
  exerciseSlug: z.string(),
});

export const filterQuery = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
});

export type ExerciseIdSchema = z.infer<typeof exerciseId>;
export type ExerciseSlugSchema = z.infer<typeof exerciseSlug>;
export type ExerciseInputSchema = z.infer<typeof exerciseInputSchema>;
export type ExerciseOutputSchema = z.infer<typeof exerciseOutputSchema>;
export type UpdateExerciseInputSchema = z.infer<
  typeof updateExerciseInputSchema
>;
export type FilterQuerySchema = z.infer<typeof filterQuery>;
