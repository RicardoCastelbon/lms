import { t } from "../../trpc";
import {
  createCourseLibController,
  findAllCourseLibController,
  findCourseLibController,
} from "../../controllers/course_lib.controller";

import {
  createCourseLibSchema,
  courseLibSchema,
  filterQuery,
  params,
  coursesLibSchema,
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
  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course-lib/getOne/{course_libId}",
      },
    })
    .input(params)
    .output(courseLibSchema)
    .query(({ input, ctx }) =>
      findCourseLibController({ paramsInput: input, ctx })
    ),

  //GET MANY coursers_lib
  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course-lib/getMany",
      },
    })
    .output(coursesLibSchema)
    .input(filterQuery)
    .query(({ input, ctx }) =>
      findAllCourseLibController({ filterQuery: input, ctx })
    ),
});
