import * as z from "zod";

export const filterQuery = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
});
export const noInput = z.void();

export const educationId = z.object({
  educationId: z.string(),
});

// export const courseLibId = z.object({
//   courseLibId: z.string(),
// });
export type FilterQuerySchema = z.infer<typeof filterQuery>;
export type NoInputSchema = z.infer<typeof noInput>;
export type EducationIdSchema = z.infer<typeof educationId>;
// export type CourseLibIdSchema = z.infer<typeof courseLibId>;
