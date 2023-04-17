import { educationSchema } from "../../common/validation/education";
import { t } from "../trpc";

export const educationRouter = t.router({
  //CREATE EDUCATION
  create: t.procedure
    .input(educationSchema)
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      const result = await ctx.prisma.education.create({
        data: { name },
      });

      return {
        status: 201,
        message: "Education created successfully",
        result: result.name,
      };
    }),
  //READ EDUCATION
  //UPDATE EDUCATION
  //DELETE EDUCATION
});
