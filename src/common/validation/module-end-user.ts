import * as z from "zod";
import { exerciseOutputSchema } from "./exercise-end-user";

//Default definition of resource, as object OR array of resource-objects
const moduleEndUser = z
  .object({
    id: z.number(),
    title: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    content: z.string(),
    courseId: z.number(),
    // course: z.object({}),
    published: z.boolean(),

    exercises: z
      .object({
        id: z.number(),
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        published: z.boolean(),

        moduleId: z.number(),
      })
      .array(),
  })
  .or(
    z
      .object({
        id: z.number(),
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        content: z.string(),
        courseId: z.number(),
        published: z.boolean(),

        // course: z.object({}),
        exercises: z
          .object({
            id: z.number(),
            title: z.string(),
            slug: z.string(),
            content: z.string(),
            published: z.boolean(),

            moduleId: z.number(),
          })
          .array(),
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
export const moduleInputSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  content: z.string(),
  courseId: z.number(),
  published: z.boolean(),

});

//Default resource output schema, used in all outputs.
export const moduleOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  module: moduleEndUser.nullish(),
  // module: moduleEndUser.nullish(),
  error: error,
});

export const moduleRenderSchema = z.object({
  // .object({
  id: z.number(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  content: z.string(),
  courseId: z.number(),
  // course: z.object({}),
  published: z.boolean(),

  exercises: z
    .object({
      id: z.number(),
      title: z.string(),
      slug: z.string(),
      content: z.string(),
      moduleId: z.number(),
      published: z.boolean(),

    })
    .array(),
});
/* export const moduleCreateOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  module: moduleEndUser.nullish(),
  error: error,
}); */

//Special schema for updating a resource, resourseId is attached. Body is all optional.
export const updateModuleInputSchema = z.object({
  moduleId: z.string(),
  body: z
    .object({
      title: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      content: z.string(),
      courseId: z.number(),
      published: z.boolean(),

    })
    .partial(),
});

export const moduleId = z.object({
  moduleId: z.string(),
});

export const filterQuery = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
});

export type ModuleIdSchema = z.infer<typeof moduleId>;
export type ModuleInputSchema = z.infer<typeof moduleInputSchema>;
export type ModuleOutputSchema = z.infer<typeof moduleOutputSchema>;
export type UpdateModuleInputSchema = z.infer<typeof updateModuleInputSchema>;
export type FilterQuerySchema = z.infer<typeof filterQuery>;
export type ModuleRenderSchema = z.infer<typeof moduleRenderSchema>;
