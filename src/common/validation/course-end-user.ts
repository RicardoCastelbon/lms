import * as z from "zod";
const course = z
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
  .or(
    z
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
      .array()
  );
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
  course: course,
  /* course: z.object({
    id: z.number(),
    title: z.string(),
    icon: z.string(),
    color: z.string(),
    content: z.string(),
    educationId: z.number(),
    points: z.string(),
    published: z.boolean(),
  }), */
});

//FindAll courses output
export const courseFindAllOutputSchema = z.object({
  success: z.boolean(),
  code: z.number(),
  message: z.string().optional(),
  courses: course,
});

//Find one course output
export const courseFindOneOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  course: course.nullish(),
  error: z
    .object({
      code: z.string(),
      message: z.string(),
      meta: z
        .object({
          cause: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const updatedCourseSchema = z.object({
  courseId: z.string(),
  body: z
    .object({
      title: z.string().optional(),
      icon: z.string().optional(),
      color: z.string().optional(),
      content: z.string().optional(),
      educationId: z.number().optional(),
      points: z.string().optional(),
      published: z.boolean().optional(),
    })
    .partial(),
});
export const getOneParams = z.object({
  courseId: z.string(),
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

export type getOneSchema = z.infer<typeof getOneParams>;
export type getOneOutputSchema = z.infer<typeof courseFindOneOutputSchema>;

export type updateCourseSchema = z.infer<typeof updatedCourseSchema>;

export type CourseFindAllOutputSchema = z.infer<
  typeof courseFindAllOutputSchema
>;

export type FilterQuerySchema = z.infer<typeof filterQuery>;
export type NoResourceFoundSchema = z.infer<typeof noResourceFound>;
export type NoInputSchema = z.infer<typeof noInput>;

export type CourseEndUserSchema = z.infer<typeof courseEndUserSchema>;
export type CourseCreateOutputSchema = z.infer<typeof courseCreateOutputSchema>;
