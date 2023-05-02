//All teacher-created course routes goes here
import { t } from "../trpc";

import {
  courseCreateOutputSchema,
  courseEndUserSchema,
  courseFindAllOutputSchema,
  courseFindOneOutputSchema,
  filterQuery,
  getOneParams,
  noInput,
  noResourceFound,
  updatedCourseSchema,
} from "../../common/validation/course-end-user";
import {
  addCourse,
  getAllCourses,
  getOneCourse,
  updateCourse,
} from "../controllers/course.controller";
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
  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getMany",
      },
    })
    .input(noInput) //Only used to satisfy Swagger, not needed within the controller function.
    .output(courseFindAllOutputSchema)
    .query(({ ctx }) => getAllCourses({ ctx })),

  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getOne/{courseId}",
      },
    })
    .input(getOneParams) //Only used to satisfy Swagger, not needed within the controller function.
    .output(courseFindOneOutputSchema)
    .query(({ input, ctx }) => getOneCourse({ input, ctx })),
  // UPDATE COURSE_LIB
  updateCourse: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/course/update/{courseId}",
      },
    })
    .output(courseFindOneOutputSchema)
    .input(updatedCourseSchema)
    .mutation(({ input, ctx }) =>
      updateCourse({
        input,
        ctx,
      })
    ),
});
