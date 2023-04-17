// all user related routes goes here

import { t } from "../trpc";
import { hash } from "argon2";
import { signUpSchema } from "../../common/validation/auth";
import { TRPCError } from "@trpc/server";
import { Education } from "@prisma/client";

export const userRouter = t.router({
  signup: t.procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const { email, password, education } = input;

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
    const edu: Education = {
      id: 1,
      name: "chas",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ctx.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        education: { connect: { id: education } },
      },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
  }),
});
