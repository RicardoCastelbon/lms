import { Course, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
// import { Context } from "vm";
import {
  // CourseEndUserSchema,

  // courseEndUserSchema,
  CourseInputSchema,
  courseInputSchema,
  updateCourseInputSchema,
  UpdateCourseInputSchema,
  CourseIdSchema,
} from "../../common/validation/course-end-user";
import { IContext } from "../context";

export const addCourse = async ({
  input,
  ctx,
}: {
  input: CourseInputSchema;
  ctx: IContext;
}) => {
  try {
    const course: Course = await ctx.prisma.course.create({
      data: {
        title: input.title,
        icon: input.icon,
        color: input.color,
        content: input.content,
        educationId: input.educationId,
        points: input.points,
        published: input.published,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Resource created",
      course,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // related records could not be found.
      if (error.code === "P2015") {
        return {
          error: {
            code: error.code,
            message: error.message,
            meta: { ...error.meta },
          },
        };
      }
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
      // optional: pass the original error to retain stack trace
      cause: error,
    });
  }
};

export const getAllCourses = async ({ ctx }: { ctx: IContext }) => {
  try {
    const courses: Course[] = await ctx.prisma.course.findMany();

    if (courses.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No courses found, please try again",
        courses,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        course: courses,
      };
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
      // optional: pass the original error to retain stack trace
      cause: error,
    });
  }
};
export const getOneCourse = async ({
  input,
  ctx,
}: {
  input: CourseIdSchema;
  ctx: IContext;
}) => {
  try {
    const course: Course | null = await ctx.prisma.course.findFirst({
      where: { id: Number(input.courseId) },
    });

    if (course === null) {
      return {
        success: false,
        code: 404,
        message: "Course not found, please try again.",
        course,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        course,
      };
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
      // optional: pass the original error to retain stack trace
      cause: error,
    });
  }
};

export const updateCourse = async ({
  input,
  ctx,
}: {
  input: UpdateCourseInputSchema;
  ctx: IContext;
}) => {
  // NOTE!!! The input params passed to the update function will update, if a certain param isn't passed the old value will remain. Be careful what params are sent from the frontend. Might have to write a util for this to remove all unused parameters.
  try {
    const course = await ctx.prisma.course.update({
      where: { id: Number(input.courseId) },
      data: input.body,
    });

    if (!course) {
      //REWRITE THIS IF CLAUSE!!
      return {
        success: false,
        course,
        error: new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
        }),
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        course,
      };
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(
          `An operation failed because it depends on one or more records that were required but not found. ${error.cause}`
        );

        return {
          error: {
            code: error.code,
            message: error.message,
            meta: { ...error.meta },
          },
        };
      }
    }

    return {
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};
