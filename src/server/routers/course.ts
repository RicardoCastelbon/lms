//All teacher-created course routes goes here
import { t } from "../trpc";

import {
  courseOutputSchema,
  courseInputSchema,
  updateCourseInputSchema,
  courseId,
} from "../../common/validation/course-end-user";
import {
  FilterQuerySchema,
  educationId,
  noInput,
} from "@/src/common/validation/global";
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCoursesByEducationId,
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
    .input(courseInputSchema)
    .output(courseOutputSchema)
    .mutation(({ input, ctx }) => addCourse({ input, ctx })),
  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getMany",
      },
    })
    .input(noInput) //Only used to satisfy Swagger, not needed within the controller function.
    .output(courseOutputSchema)
    .query(({ ctx }) => getAllCourses({ ctx })),
  getManyByEducationId: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getManyByEducationId/{educationId}",
      },
    })
    .input(educationId) //Only used to satisfy Swagger, not needed within the controller function.
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getCoursesByEducationId({ input, ctx })),

  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getOne/{courseId}",
      },
    })
    .input(courseId) //Only used to satisfy Swagger, not needed within the controller function.
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getOneCourse({ input, ctx })),
  // UPDATE COURSE_LIB
  updateCourse: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/course/update/{courseId}",
      },
    })
    .input(updateCourseInputSchema)
    .output(courseOutputSchema)
    .mutation(({ input, ctx }) =>
      updateCourse({
        input,
        ctx,
      })
    ),
  deleteCourse: t.procedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/course/delete/{courseId}",
      },
    })
    .input(courseId)
    .output(courseOutputSchema)
    .mutation(({ input, ctx }) =>
      deleteCourse({
        input,
        ctx,
      })
    ),
});
