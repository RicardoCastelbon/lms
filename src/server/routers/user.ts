// all user related routes goes here

import { t } from "../trpc";
import { hash } from "argon2";
import { loginSchema, signUpSchema } from "../../common/validation/auth";
import { TRPCError } from "@trpc/server";
import { Education, Role } from "@prisma/client";
import { log } from "console";

export const userRouter = t.router({
  signup: t.procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const { email, password, education, firstName, lastName } = input;
    try {
      console.log(input);

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        //Need to find a solution for the different errors.
        return {
          status: false,
          code: 409,
          message: "Conflict, An account with this email already exists",
          error: new TRPCError({
            code: "CONFLICT",
            message: "User already exists.",
          }),
        };
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
          userRole: Role.STUDENT,
        },
      });

      return {
        status: true,
        code: 201,
        message: "Account created successfully",
        result: result.email,
      };
    } catch (error) {
      console.log(error);
    }
  }),
});
