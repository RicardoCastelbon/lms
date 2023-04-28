import * as z from "zod";

export const courseEndUserSchema = z.object({
  title: z.string(),
  icon: z.string(),
  color: z.string(),
  content: z.string(),
  educationId: z.number(),
  points: z.string(),
});

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
  }),
});

export type CourseEndUserSchema = z.infer<typeof courseEndUserSchema>;
export type CourseCreateOutputSchema = z.infer<typeof courseCreateOutputSchema>;
