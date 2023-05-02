import { Course_lib, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import {
  CreateCourseLibInput,
  UpdatedCourseLibInput,
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
    // Get the current page from the filterQuery, or default to the first page (1)
    const page = filterQuery.page || 1;

    // Get the limit from the filterQuery, or default to 8 records per page
    const limit = filterQuery.limit || 8;

    // Calculate the number of records to skip based on the current page and limit
    const skip = (page - 1) * limit;

    // Retrieve the records for the current page, limited to the specified number of records per page
    const [course_lib, totalCount] = await Promise.all([
      ctx.prisma.course_lib.findMany({
        skip,
        take: limit,
      }),

      // Retrieve the total number of records in the database
      ctx.prisma.course_lib.count(),
    ]);

    // Calculate the total number of pages based on the total number of records and the limit per page
    const totalPages = Math.ceil(totalCount / limit);

    console.log("Retrieved courses:", course_lib);
    console.log("Total number of courses:", totalCount);
    console.log("Total number of pages:", totalPages);

    // Return the retrieved courses, along with some metadata about the current page and the total number of pages
    return {
      status: "success",
      results: course_lib.length,
      totalPages,
      currentPage: page,
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

export const updatedCourseLibController = async ({
  paramsInput,
  input,
  ctx,
}: {
  paramsInput: ParamsInput;
  input: UpdatedCourseLibInput["body"];
  ctx: Context;
}) => {
  try {
    const course_lib = await ctx.prisma.course_lib.update({
      where: { id: Number(paramsInput.course_libId) },
      data: input,
    });

    return {
      status: "success",
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

export const deleteCourseLibController = async ({
  paramsInput,
  ctx,
}: {
  paramsInput: ParamsInput;
  ctx: Context;
}) => {
  try {
    const course_lib = await ctx.prisma.course_lib.delete({
      where: { id: Number(paramsInput.course_libId) },
    });

    return {
      status: "success",
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
