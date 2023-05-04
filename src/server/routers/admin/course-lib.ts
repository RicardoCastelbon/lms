import { t } from "../../trpc";
import {
  createCourseLib,
  getAllCoursesLib,
  updatedCourseLib,
  deleteCourseLib,
  getOneCourseLib,
} from "../../controllers/course-lib.controller";

import {
  courseLibOutputSchema,
  courseLibInputSchema,
  updateCourseLibInputSchema,
  courseLibId,
} from "../../../common/validation/course-lib";

import { z } from "zod";
import { noInput } from "@/src/common/validation/global";
import { courseOutputSchema } from "@/src/common/validation/course-end-user";

export const courseLibRouter = t.router({
  // Create Course_Lib
  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/course-lib/create",
      },
    })
    .output(courseLibOutputSchema)
    .input(courseLibInputSchema)
    .mutation(({ input, ctx }) => createCourseLib({ input, ctx })),
  // GET MANY coursers_lib
  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course-lib/getMany",
      },
    })
    .input(noInput)
    .output(courseLibOutputSchema)
    .query(({ ctx }) => getAllCoursesLib({ ctx })),
  //   //GET ONE Course
  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course-lib/getOne/{courseLibId}",
      },
    })
    .input(courseLibId) //Only used to satisfy Swagger, not needed within the controller function.
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getOneCourseLib({ input, ctx })),

  //   // UPDATE COURSE_LIB
  updateCourseLib: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/course-lib/update/{courseLibId}",
      },
    })
    .input(updateCourseLibInputSchema)
    .output(courseLibOutputSchema)
    .mutation(({ input, ctx }) =>
      updatedCourseLib({
        input,
        ctx,
      })
    ),

  //   //DELETE EDUCATION
  delete: t.procedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/course-lib/delete/{courseLibId}",
      },
    })
    .input(courseLibId)
    .output(courseLibOutputSchema)
    .mutation(({ input, ctx }) => deleteCourseLib({ input, ctx })),
});
