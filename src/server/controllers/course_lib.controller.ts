import { Course_lib, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import {
  CreateCourseLibInput,
  UpdateCourseLibInput,
  ParamsInput,
  FilterQueryInput,
} from "../../common/validation/course_lib";

export const createCourseLibController = async ({
  input,
  ctx,
}: {
  input: CreateCourseLibInput;
  ctx: Context;
}) => {
  try {
    console.log("Creating course lib with input:", input);
    const course_lib: Course_lib = await ctx.prisma.course_lib.create({
      data: {
        title: input.title,
        description: input.description,
        content: input.content,
      },
    });
    console.log("Created course lib:", course_lib);
    return {
      status: "success",
      course_lib,
    };
  } catch (error) {
    console.log("Error creating course lib:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create course library",
    });
  }
};

export const findCourseLibController = async ({
  paramsInput,
  ctx,
}: {
  paramsInput: ParamsInput;
  ctx: Context;
}) => {
  try {
    const course_lib: Course_lib | null = await ctx.prisma.course_lib.findFirst(
      {
        where: { id: Number(paramsInput.course_libId) },
      }
    );

    if (!course_lib) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Education with ID: ${paramsInput.course_libId} not found`,
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

export const findAllCourseLibController = async ({
  filterQuery,
  ctx,
}: {
  filterQuery: FilterQueryInput;
  ctx: Context;
}) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    const course_lib = await ctx.prisma.course_lib.findMany({
      skip,
      take: limit,
    });

    return {
      status: "success",
      results: course_lib.length,
      course_lib,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code, error.message);
      return error;
    }
  }
};
