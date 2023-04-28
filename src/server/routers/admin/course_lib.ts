import { t } from "../../trpc";
import {
  createCourseLibController,
  findCourseLibController,
} from "../../controllers/course_lib.controller";

import {
  createCourseLibSchema,
  courseLibSchema,
  filterQuery,
  params,
} from "../../../common/validation/course_lib";
import { z } from "zod";

export const courseLibRouter = t.router({
  // Create Course_Lib

  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/course-lib/create",
      },
    })
    .output(courseLibSchema)
    .input(createCourseLibSchema)
    .mutation(({ input, ctx }) => createCourseLibController({ input, ctx })),

  //GET ONE Course
  // getOne: t.procedure
  //   .meta({
  //     openapi: {
  //       method: "GET",
  //       path: "/admin/courses/getOne/{courseLibId}",
  //     },
  //   })
  //   .input(params)
  //   .output(courseLibSchema)
  //   .query(({ input, ctx }) =>
  //     findCourseLibController({ paramsInput: input, ctx })
  //   ),
});
