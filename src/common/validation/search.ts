import * as z from "zod";

export const searchSchema = z.object({
  search: z.string(),
});

export type ISearch = z.infer<typeof searchSchema>;
