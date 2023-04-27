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
    const course_lib: Course_lib = await ctx.prisma.course_lib.create({
      data: {
        title: input.title,
        description: input.description,
        content: input.content,
      },
    });
    return {
      status: "success",
      course_lib,
    };
  } catch (error) {
    console.log(error);
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
