import * as z from "zod";
//Default definition of resource, as object OR array of resource-objects
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
    createdAt: z.date(),
    updatedAt: z.date(),
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
        createdAt: z.date(),
        updatedAt: z.date(),
      })
      .array()
  );

//Error, should be attatched to all outputSchemas
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
export const courseInputSchema = z.object({
  title: z.string(),
  icon: z.string(),
  color: z.string(),
  content: z.string(),
  educationId: z.number(),
  points: z.string(),
  published: z.boolean(),
});

//Default resource output schema, used in all output methods in router.
export const courseOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  course: course.nullish(),
  error: error,
});

//Special schema for updating a resource, resourseId is attached. Body is all optional.
export const updateCourseInputSchema = z.object({
  courseId: z.string(),
  body: z
    .object({
      title: z.string(),
      icon: z.string(),
      color: z.string(),
      content: z.string(),
      educationId: z.number(),
      points: z.string(),
      published: z.boolean(),
    })
    .partial(),
});
export const courseId = z.object({
  courseId: z.string(),
});

export type CourseIdSchema = z.infer<typeof courseId>;
export type CourseInputSchema = z.infer<typeof courseInputSchema>;
export type CourseOutputSchema = z.infer<typeof courseOutputSchema>;
export type UpdateCourseInputSchema = z.infer<typeof updateCourseInputSchema>;
