import * as z from "zod";
//Default definition of resource, as object OR array of resource-objects
const student = z
  .object({
    id: z.number(),
    email:z.string().optional(),
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    createdAt: z.date().optional(), 
    updatedAt: z.date().optional(), 
  })
  .or(
    z
      .object({
        id: z.number(),
        email:z.string().optional(),
        password: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
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
export const studentInputSchema = z.object({
    //  id: z.number(),

      email:z.string().optional(),
      password: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),

  });

//Default resource output schema, used in all outputs.
export const studentOutputSchema = z.object({
  success: z.boolean().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
  students: student.nullish(),
  error: error,
});

//Special schema for updating a resource, resourseId is attached. Body is all optional.
export const updateStudentInputSchema = z.object({
    studentId: z.string(),
  body: z
    .object({
      id: z.number(),
      email:z.string().optional(),
      password: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .partial(),
});


export const studentId = z.object({
  studentId: z.string(),
});
export type StudentIdSchema = z.infer<typeof studentId>;
export type StudentInputSchema = z.infer<typeof studentInputSchema>;
export type StudentOutputSchema = z.infer<typeof studentOutputSchema>;
export type UpdateStudentInputSchema = z.TypeOf<typeof updateStudentInputSchema
>;
