import { Course_lib, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { IContext } from "../context";
import {
  CourseLibInputSchema,
  UpdateCourseLibInputSchema,
  CourseLibIdSchema,
} from "../../common/validation/course-lib";

export const createCourseLibController = async ({
  input,
  ctx,
}: {
  input: CourseLibInputSchema;
  ctx: IContext;
}) => {
  try {
    const course_lib: Course_lib = await ctx.prisma.course_lib.create({
      data: {
        title: input.title,
        description: input.description,
        content: input.content,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Resource created",
      course_lib,
    };
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // related records could not be found.
      if (error.code === "P2015") {
        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            meta: { ...error.meta },
          },
        };
      }
      if (error.code === "P2025") {
        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            meta: { ...error.meta },
          },
        };
      }
    }
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};

export const getOneCourseLib = async ({
  input,
  ctx,
}: {
  input: CourseLibIdSchema;
  ctx: IContext;
}) => {
  try {
    const course_lib: Course_lib | null = await ctx.prisma.course_lib.findFirst(
      {
        where: { id: Number(input.courseLibId) },
      }
    );

    if (!course_lib) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Education with ID: ${input.courseLibId} not found`,
      });
    }

    return {
      status: "success",
      course_lib,
    };
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to find course library",
    });
  }
};

export const getAllCoursesLibController = async ({
  ctx,
}: {
  ctx: IContext;
}) => {
  try {
    const coursesLib: Course_lib[] = await ctx.prisma.course_lib.findMany();

    if (coursesLib.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No courses found, please try again",
        coursesLib,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        courseLib: coursesLib,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};

export const updatedCourseLibController = async ({
  input,
  ctx,
}: {
  input: UpdateCourseLibInputSchema;
  ctx: IContext;
}) => {
  try {
    const courseLib: Course_lib = await ctx.prisma.course_lib.update({
      where: { id: Number(input.courseLibId) },
      data: input.body,
    });
    return {
      success: true,
      code: 200,
      message: "Resource found",
      courseLib,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(
          `An operation failed because it depends on one or more records that were required but not found. ${error.cause}`
        );
        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            meta: { ...error.meta },
          },
        };
      }
    }
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};
