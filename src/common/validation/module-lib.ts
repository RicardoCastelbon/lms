import * as z from "zod";
//Default definition of resource, as object OR array of resource-objects
const moduleLib = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    createdAt: z.date().optional(), 
    updatedAt: z.date().optional(), 
  })
  .or(
    z
      .object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        content: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(), 
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
export const moduleLibInputSchema = z.object({
    moduleLib: z.object({
      title: z.string(),
      description: z.string(),
      content: z.string(),
      courseLibId: z.number(),
    }),
  });

//Default resource output schema, used in all outputs.
export const moduleLibOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  moduleLib: moduleLib.nullish(),
  error: error,
});

//Special schema for updating a resource, resourseId is attached. Body is all optional.
export const updateModuleLibInputSchema = z.object({
    moduleLibId: z.string(),
  body: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      content: z.string(),
      courseId: z.number(),

    })
    .partial(),
});


export const moduleLibId = z.object({
  moduleLibId: z.string(),
});
export type ModuleLibIdSchema = z.infer<typeof moduleLibId>;
export type ModuleLibInputSchema = z.infer<typeof moduleLibInputSchema>;
export type ModuleLibOutputSchema = z.infer<typeof moduleLibOutputSchema>;
export type UpdateModuleLibInputSchema = z.TypeOf<typeof updateModuleLibInputSchema
>;
