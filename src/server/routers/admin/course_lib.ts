import { t } from "../../trpc";
import {
  createCourseLibController,
  findAllCourseLibController,
  findCourseLibController,
  updatedCourseLibController,
} from "../../controllers/course_lib.controller";

import {
  createCourseLibSchema,
  courseLibSchema,
  filterQuery,
  params,
  coursesLibSchema,
  updatedCourseLibSchema,
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

  // UPDATE COURSE_LIB
  updateCourseLib: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/course-lib/update/{course_libId}",
      },
    })
    .output(courseLibSchema)
    .input(updatedCourseLibSchema)
    .mutation(({ input, ctx }) =>
      updatedCourseLibController({
        paramsInput: input,
        input: input.body,
        ctx,
      })
    ),
});
