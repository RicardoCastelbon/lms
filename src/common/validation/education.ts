import * as z from "zod";

export const educationSchema = z.object({
  name: z.string(),
});

export type IEducation = z.infer<typeof educationSchema>;
