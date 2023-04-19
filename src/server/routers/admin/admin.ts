// all user related routes goes here

import { t } from "../../trpc";
import { hash } from "argon2";
import {
  adminLoginSchema,
  adminSignUpSchema,
} from "../../../common/validation/auth";
import { TRPCError } from "@trpc/server";
import { Education } from "@prisma/client";
import { log } from "console";

export const adminRouter = t.router({
  signup: t.procedure
    .input(adminLoginSchema)
    .mutation(async ({ input, ctx }) => {
      console.log("Inside signup mutation", input);

      const { email, password } = input;
      try {
        const exists = await ctx.prisma.admin.findFirst({
          where: { email },
        });

        if (exists) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Admin already exists.",
          });
        }

        const hashedPassword = await hash(password);

        const result = await ctx.prisma.admin.create({
          data: {
            email,
            password: hashedPassword,
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
