import * as z from "zod";

export const courseEndUserSchema = z.object({
  title: z.string().email(),
  icon: z.string(),
  color: z.string(),
  content: z.string(),
});

export type IcourseEndUserSchema = z.infer<typeof courseEndUserSchema>;
