export const example = "I'm just a placeholder";

import { t } from "../trpc";
// import { hash } from "argon2";
// import { signUpSchema } from "../../common/validation/auth";
// import { TRPCError } from "@trpc/server";
import { userRouter } from "./user";

export const serverRouter = t.router({
  users: userRouter,
  /*   signup: t.procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const { username, email, password } = input;

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

    const result = await ctx.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
  }), */
});
//Should this have "I" prefixed in the name? Since it's a type, not an interface.
export type IServerRouter = typeof serverRouter;
