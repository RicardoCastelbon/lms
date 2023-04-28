import * as z from "zod";

export const moduleEndUserSchema = z.object({
  title: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  content: z.string(),
});

export type ImoduleEndUserSchema = z.infer<typeof moduleEndUserSchema>;
