// all user related routes goes here

import { t } from "../trpc";
import { hash } from "argon2";
import { loginSchema, signUpSchema } from "../../common/validation/auth";
import { TRPCError } from "@trpc/server";
import { Education } from "@prisma/client";
import { log } from "console";

export const userRouter = t.router({
  signup: t.procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const { email, password, education, firstName, lastName, userRole } = input;
    try {
      console.log(input);

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);
      /*  const edu: Education = {
        id: 1,
        name: "chas",
        createdAt: new Date(),
        updatedAt: new Date(),
      }; */

      const result = await ctx.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          /* education: {
            create: {
              name: "Angular",
            },
          }, */
          education: { connect: { id: education } },
          firstName,
          lastName,
          userRole,
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    } catch (error) {
      console.log(error);
    }
  }),
});
