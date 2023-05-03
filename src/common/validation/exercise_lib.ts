import * as z from "zod";
//Default definition of resource, as object OR array of resource-objects
const exerciseLib = z
  .object({
    id: z.number(),
    title: z.string(),

    description: z.string(),
    content: z.string(),
    createdAt: z.date(), // to be added later
    updatedAt: z.date(), // to be added later
  })
  .or(
    z
      .object({
        id: z.number(),
        title: z.string(),
        published: z.boolean(), // exercise_lib: z.object({
        description: z.string(),
        content: z.string(),
        createdAt: z.date(), // to be added later
        updatedAt: z.date(), // to be added later
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
export const exerciseLibInputSchema = z.object({
  // status: z.string(),
  // result: z.number(),
  exerciseLib: z.object({
    // id: z.number(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    // published: z.boolean(),

    // createdAt: z.date(), // to be added later
    // updatedAt: z.date(), // to be added later
  }),
});

//Default resource output schema, used in all outputs.
export const exerciseLibOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  exerciseLib: exerciseLib.nullish(),
  error: error,
});

//Special schema for updating a resource, resourseId is attached. Body is all optional.
export const updateExerciseInputSchema = z.object({
  exerciseLibId: z.string(),
  body: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      content: z.string(),
      // published: z.boolean(),
      // createdAt: z.date(), // to be added later
      // updatedAt: z.date(), // to be added later
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
  // name: z.string(),
});
export const exerciseLibId = z.object({
  exerciseLibId: z.number(),
});
export type ExerciseLibIdSchema = z.infer<typeof exerciseLibId>;
export type ExerciseLibInputSchema = z.infer<typeof exerciseLibInputSchema>;
export type ExerciseLibOutputSchema = z.infer<typeof exerciseLibOutputSchema>;
export type UpdateExerciseLibInputSchema = z.TypeOf<
  typeof updateExerciseInputSchema
>;
