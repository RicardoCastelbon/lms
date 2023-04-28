//All teacher-created course routes goes here
import { t } from "../trpc";

import {
  courseCreateOutputSchema,
  courseEndUserSchema,
} from "../../common/validation/course-end-user";
import { addCourse } from "../controllers/course.controller";
import { Course } from "@prisma/client";
import { IContext } from "../context";
import { TRPCError } from "@trpc/server";

export const courseRouter = t.router({
  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/course/create",
      },
    })
    .input(courseEndUserSchema)
    .output(courseCreateOutputSchema)
    .mutation(({ input, ctx }) => addCourse({ input, ctx })),
  /*   .mutation(async ({ input, ctx }) => {
      try {
        const course: Course = await ctx.prisma.course.create({
          data: {
            title: input.title,
            icon: input.icon,
            color: input.color,
            content: input.content,
            educationId: input.educationId,
            points: input.points,
          },
        });
        return course;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          // optional: pass the original error to retain stack trace
          cause: error,
        });
      }
    }), */
});
