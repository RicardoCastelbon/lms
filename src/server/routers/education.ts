import {
  createEducationSchema,
  educationId,
} from "../../common/validation/education";
import { createEducationController } from "../controllers/education.controller";
import { t } from "../trpc";

export const educationRouter = t.router({
  //CREATE EDUCATION
  create: t.procedure
    .input(createEducationSchema)
    .mutation(({ input, ctx }) => createEducationController({ input, ctx })),

  create2: t.procedure
    .input(createEducationSchema)
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      const result = await ctx.prisma.education.create({
        data: { name },
      });

      const result3 = await ctx.prisma.user.create({
        //yarn prisma generate -> it generates the atributes to work in prisma client
        data: {
          email: "rick@mail.com",
          //education is not a atribute from user, it is a reference to the education table
          //with this syntax we can define the value for in which education is the user
          education: {
            connect: {
              id: "4",
            },
          },
          userRole: "TEACHER",
        },
        //if we want education to be returned we need to add include
        include: {
          education: true,
        },
        //with select we can return just the attributes that we want
        /*  select: {
          email: true,
        }, */
      });

      console.log(result3);

      return {
        status: 201,
        message: "Education created successfully",
        result: result.name,
      };
    }),
  //READ ONE EDUCATION
  //READ MANY EDUCATIONS
  //UPDATE EDUCATION
  //DELETE EDUCATION
});
