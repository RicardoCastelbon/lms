//All teacher-created course routes goes here
import { privateProcedure, t, teacherProcedure } from "../trpc";

import {
  courseOutputSchema,
  courseInputSchema,
  updateCourseInputSchema,
  courseId,
  courseSlug,
} from "../../common/validation/course-end-user";
import { educationId, noInput } from "@/src/common/validation/global";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCoursesByEducationId,
  getOneCourse,
  getOneCourseBySlug,
  updateCourse,
} from "../controllers/course.controller";

export const courseRouter = t.router({
  create: teacherProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/course/create",
      },
    })
    .input(courseInputSchema)
    .output(courseOutputSchema)
    .mutation(({ input, ctx }) => createCourse({ input, ctx })),
  getMany: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getMany",
      },
    })
    .input(noInput)
    .output(courseOutputSchema)
    .query(({ ctx }) => getAllCourses({ ctx })),

  getManyByEducationId: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getMany/{educationId}",
      },
    })
    .input(educationId)
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getCoursesByEducationId({ input, ctx })),

  getCourseBySlug: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getOne/{courseSlug}",
      },
    })
    .input(courseSlug)
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getOneCourseBySlug({ input, ctx })),

  getOne: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getOne/{courseId}",
      },
    })
    .input(courseId)
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getOneCourse({ input, ctx })),
  // UPDATE COURSE_LIB
  updateCourse: teacherProcedure
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
  deleteCourse: teacherProcedure
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
