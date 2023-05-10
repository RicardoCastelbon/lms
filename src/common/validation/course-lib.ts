import * as z from "zod";
//Default definition of resource, as object OR array of resource-objects
const courseLib = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    /*  education: z
      .object({
        connect: z.object({
          id: z.number(),
        }),
      })
      .optional(), */
  })
  .or(
    z
      .object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        content: z.string(),
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
export const courseLibInputSchema = z.object({
  //  id: z.number(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  // createdAt: z.date(),
  // updatedAt: z.date(),

});

//Default resource output schema, used in all output methods in router.
export const courseLibOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  courseLib: courseLib.nullish(),
  error: error,
});

//Special schema for updating a resource, resourseId is attached. Body is all optional.
export const updateCourseLibInputSchema = z.object({
  courseLibId: z.string(),
  body: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      content: z.string(),
      // createdAt: z.date(),
      // updatedAt: z.date(),
    })
    .partial(),
});
export const courseLibId = z.object({
  courseLibId: z.string(),
});

export type CourseLibIdSchema = z.infer<typeof courseLibId>;
export type CourseLibInputSchema = z.infer<typeof courseLibInputSchema>;
export type CourseLibOutputSchema = z.infer<typeof courseLibOutputSchema>;
export type UpdateCourseLibInputSchema = z.infer<
  typeof updateCourseLibInputSchema
>;
