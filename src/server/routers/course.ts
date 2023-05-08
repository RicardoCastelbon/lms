//All teacher-created course routes goes here
import { t } from "../trpc";

import {
  courseOutputSchema,
  courseInputSchema,
  updateCourseInputSchema,
  courseId,
  courseSlug,
} from "../../common/validation/course-end-user";
import { educationId, noInput } from "@/src/common/validation/global";
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCoursesByEducationId,
  getOneCourse,
  getOneCourseBySlug,
  updateCourse,
} from "../controllers/course.controller";

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
    .input(noInput)
    .output(courseOutputSchema)
    .query(({ ctx }) => getAllCourses({ ctx })),
  getManyByEducationId: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getMany/{educationId}",
      },
    })
    .input(educationId)
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getCoursesByEducationId({ input, ctx })),

  getCourseBySlug: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/course/getOne/{courseSlug}",
      },
    })
    .input(courseSlug)
    .output(courseOutputSchema)
    .query(({ input, ctx }) => getOneCourseBySlug({ input, ctx })),

  getOne: t.procedure
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
