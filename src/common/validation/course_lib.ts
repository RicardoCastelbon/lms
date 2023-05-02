import * as z from "zod";

export const courseLibSchema = z.object({
  status: z.string(),
  course_lib: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    // createdAt: z.date(), // to be added later
    // updatedAt: z.date(),// to be added later
  }),
});
export const coursesLibSchema = z.object({
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

export const createCourseLibSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "A description is required" }),
  content: z.string({ required_error: "Content is required" }),
});

export const params = z.object({
  course_libId: z.string(),
});

export const updatedCourseLibSchema = z.object({
  course_libId: z.string(),
  body: z
    .object({
      title: z.string(),
      description: z.string(),
      content: z.string(),
    })
    .partial(),
});

export const updatedCourseLibResponse = z.object({
  status: z.string(),
  updatedCourseLibSchema: updatedCourseLibSchema,
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
  // name: z.string(),
});

export type CreateCourseLibInput = z.infer<typeof createCourseLibSchema>;
export type UpdatedCourseLibInput = z.infer<typeof updatedCourseLibSchema>;
export type ParamsInput = z.infer<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
