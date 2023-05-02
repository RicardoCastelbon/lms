import * as z from "zod";

//Input
export const courseEndUserSchema = z.object({
  title: z.string(),
  icon: z.string(),
  color: z.string(),
  content: z.string(),
  educationId: z.number(),
  points: z.string(),
  published: z.boolean(),
});

//CreateCourse output
export const courseCreateOutputSchema = z.object({
  status: z.string(),
  course: z.object({
    id: z.number(),
    title: z.string(),
    icon: z.string(),
    color: z.string(),
    content: z.string(),
    educationId: z.number(),
    points: z.string(),
    published: z.boolean(),
  }),
});

//FindAll courses output
export const courseFindAllOutputSchema = z.object({
  status: z.string(),
  // result: z.number(),
  courses: z
    .object({
      id: z.number(),
      title: z.string(),
      icon: z.string(),
      color: z.string(),
      content: z.string(),
      educationId: z.number(),
      points: z.string(),
      published: z.boolean(),
    })
    .array(),
});

export const noResourceFound = z.object({
  status: z.string(),
  message: z.string(),
});
export const filterQuery = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
});
export const noInput = z.void();

export type FilterQuerySchema = z.infer<typeof filterQuery>;
export type NoResourceFoundSchema = z.infer<typeof noResourceFound>;
export type NoInputSchema = z.infer<typeof noInput>;
export type CourseEndUserSchema = z.infer<typeof courseEndUserSchema>;
export type CourseCreateOutputSchema = z.infer<typeof courseCreateOutputSchema>;
export type CourseFindAllOutputSchema = z.infer<
  typeof courseFindAllOutputSchema
>;
