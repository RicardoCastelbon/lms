import * as z from "zod";

export const exerciseLibSchema = z.object({
  status: z.string(),
  exercise_lib: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    // createdAt: z.date(), // to be added later
    // updatedAt: z.date(),// to be added later
  }),
});

export const exercisesLibSchema = z.object({
  status: z.string(),
  results: z.number(),
  course_lib: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      content: z.string(),
      // createdAt: z.date(), // to be added later
      // updatedAt: z.date(), // to be added later
    })
  ),
});

export const createExerciseLibSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "A description is required" }),
  content: z.string({ required_error: "Content is required" }),
});

export const params = z.object({
  exercise_libId: z.string(),
});

// export const updatedExerciseLibSchema = z.object({
//   exercise_libId: z.string(),
//   body: z
//     .object({
//       title: z.string(),
//       description: z.string(),
//       content: z.string(),
//     })
//     .partial(),
// });

// export const updatedExerciseLibSchema = z.object({
//   status: z.string(),
//   updatedExerciseLibSchema: updatedExerciseLibSchema,
// });

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
  // name: z.string(),
});

export type CreateExerciseLibInput = z.infer<typeof createExerciseLibSchema>;
// export type UpdatedExerciseLibInput = z.infer<typeof updatedExerciseLibSchema>;
export type ParamsInput = z.infer<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
