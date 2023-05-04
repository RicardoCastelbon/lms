import { t } from "../../trpc";
import {
  createCourseLibController,
  getAllCoursesLibController,
  updatedCourseLibController,
  // deleteCourseLibController,
  // findAllCourseLibController,
  // getOneCourseLib,
  // updatedCourseLibController,
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
    .mutation(({ input, ctx }) => createCourseLibController({ input, ctx })),
  // GET MANY coursers_lib
  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course-lib/getMany",
      },
    })
    .input(noInput)
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getAllCoursesLibController({ ctx })),
  //   //GET ONE Course
  //   getOne: t.procedure
  //     .meta({
  //       openapi: {
  //         method: "GET",
  //         path: "/course-lib/getOne/{courseLibId}",
  //       },
  //     })
  //     .input(courseLibId)
  //     .output(courseOutputSchema)
  //     .query(({ input, ctx }) => getOneCourseLib({ paramsInput: input, ctx })),

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
      updatedCourseLibController({
        input,
        ctx,
      })
    ),

  //   //DELETE EDUCATION
  //   delete: t.procedure
  //     .meta({
  //       openapi: {
  //         method: "DELETE",
  //         path: "/coourse-lib/delete/{courseLibId}",
  //       },
  //     })
  //     .input(params)
  //     .output(courseLibSchema)
  //     .mutation(({ input, ctx }) =>
  //       deleteCourseLibController({ paramsInput: input, ctx })
  //     ),
});
