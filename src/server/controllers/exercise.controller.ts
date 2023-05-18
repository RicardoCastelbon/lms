import { FilterQueryInput } from "@/src/common/validation/education";
import { ModuleIdSchema } from "@/src/common/validation/module-end-user";
import { Exercise, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import {
  ExerciseIdSchema,
  ExerciseInputSchema,
  ExerciseSlugSchema,
  UpdateExerciseInputSchema,
} from "../../common/validation/exercise-end-user";
import { IContext } from "../context";
import { slugilizer } from "../utils/controller-utils";

export const createExerciseController = async ({
  input,
  ctx,
}: {
  input: ExerciseInputSchema;
  ctx: IContext;
}) => {
  try {
    const slug = slugilizer(input.title);
    const exercise: Exercise = await ctx.prisma.exercise.create({
      data: {
        title: input.title,
        slug: slug,
        // description: input.description,
        content: input.content,
        module: {
          connect: { id: input.moduleId },
        },
      },
    });

    return {
      success: true,
      code: 201,
      message: "Resource created",
      exercise,
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

export const updateExerciseController = async ({
  exerciseId,
  input,
  ctx,
}: {
  exerciseId: ExerciseIdSchema;
  input: UpdateExerciseInputSchema["body"];
  ctx: IContext;
}) => {
  try {
    const exercise: Exercise = await ctx.prisma.exercise.update({
      where: { id: Number(exerciseId.exerciseId) },
      data: input,
    });

    return {
      success: true,
      code: 200,
      message: "Resource found",
      exercise,
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

export const findExerciseController = async ({
  input,
  ctx,
}: {
  input: ExerciseIdSchema;
  ctx: IContext;
}) => {
  try {
    const exercise: Exercise | null = await ctx.prisma.exercise.findFirst({
      where: { id: Number(input.exerciseId) },
    });

    if (module === null) {
      return {
        success: false,
        code: 404,
        message: "Module not found, please try again.",
        exercise,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        exercise,
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

export const getOneExerciseBySlug = async ({
  input,
  ctx,
}: {
  input: ExerciseSlugSchema;
  ctx: IContext;
}) => {
  try {
    const exercise: Exercise | null = await ctx.prisma.exercise.findFirst({
      where: { slug: input.exerciseSlug },
    });

    if (exercise === null) {
      return {
        success: false,
        code: 404,
        message: "Exercise not found, please try again.",
        exercise,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        exercise,
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

export const findAllExercisesController = async ({
  filterQuery,
  ctx,
}: {
  filterQuery: FilterQueryInput;
  ctx: IContext;
}) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    const exercises: Exercise[] = await ctx.prisma.exercise.findMany({
      skip,
      take: limit,
    });
    if (exercises.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No modules found, please try again",
        exercise: exercises,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        exercise: exercises,
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

export const findAllExercisesByModuleIdController = async ({
  input,
  ctx,
}: {
  input: ModuleIdSchema;
  ctx: IContext;
}) => {
  try {
    const exercises: Exercise[] = await ctx.prisma.exercise.findMany({
      where: { moduleId: Number(input.moduleId) },
    });

    if (exercises.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No modules found, please try again",
        exercise: exercises,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        exercise: exercises,
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

export const deleteExerciseController = async ({
  input,
  ctx,
}: {
  input: ExerciseIdSchema;
  ctx: Context;
}) => {
  try {
    const exercise: Exercise = await ctx.prisma.exercise.delete({
      where: { id: Number(input.exerciseId) },
    });
    return {
      success: true,
      code: 200,
      message: "Resource found",
      exercise,
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
