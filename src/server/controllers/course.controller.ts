import { Course, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  CourseInputSchema,
  UpdateCourseInputSchema,
  CourseIdSchema,
  CourseSlugSchema,
} from "../../common/validation/course-end-user";
import { IContext } from "../context";
import { EducationIdSchema, educationId } from "@/src/common/validation/global";
import { slugilizer } from "../utils/controller-utils";

export const addCourse = async ({
  input,
  ctx,
}: {
  input: CourseInputSchema;
  ctx: IContext;
}) => {
  console.log(input);

  try {
    const slug = slugilizer(input.title);
    const course: Course = await ctx.prisma.course.create({
      data: {
        title: input.title,
        slug: slug,
        icon: input.icon,
        color: input.color,
        content: input.content,
        // educationId: input.educationId,
        points: input.points,
        published: input.published,
        education: {
          connect: { id: input.educationId },
        },
      },
    });

    return {
      success: true,
      code: 201,
      message: "Resource created",
      course,
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

export const getCoursesByEducationId = async ({
  input,
  ctx,
}: {
  input: EducationIdSchema;
  ctx: IContext;
}) => {
  try {
    const courses: Course[] = await ctx.prisma.course.findMany({
      where: { educationId: Number(input.educationId) },
    });

    if (courses.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No courses found, please try again",
        courses: null,
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

export const getOneCourseBySlug = async ({
  input,
  ctx,
}: {
  input: CourseSlugSchema;
  ctx: IContext;
}) => {
  try {
    const course: Course | null = await ctx.prisma.course.findFirst({
      where: { slug: input.courseSlug },
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

export const updateCourse = async ({
  input,
  ctx,
}: {
  input: UpdateCourseInputSchema;
  ctx: IContext;
}) => {
  // NOTE!!! The input params passed to the update function will update, if a certain param isn't passed the old value will remain. Be careful what params are sent from the frontend. Might have to write a util for this to remove all unused parameters.
  try {
    // let returnObject;
    const course = await ctx.prisma.course.update({
      where: { id: Number(input.courseId) },
      data: input.body,
    });

    const courses = await ctx.prisma.course.findMany();

    return {
      success: true,
      code: 200,
      message: "Resource updated",
      course: courses,
    };

    // return returnObject;
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

export const deleteCourse = async ({
  input,
  ctx,
}: {
  input: CourseIdSchema;
  ctx: IContext;
}) => {
  try {
    const course = await ctx.prisma.course.delete({
      where: { id: Number(input.courseId) },
    });
    return {
      success: true,
      code: 200,
      message: "Resource found",
      course,
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
