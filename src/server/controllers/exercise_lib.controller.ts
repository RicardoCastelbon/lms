import { Exercise_lib, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import {
  ExerciseLibIdSchema,
  ExerciseLibInputSchema,
  ExerciseLibOutputSchema,
  UpdateExerciseLibInputSchema,
} from "../../common/validation/exercise_lib";
import { IContext } from "../context";

export const createExerciseLibController = async ({
  input,
  ctx,
}: {
  input: ExerciseLibInputSchema;
  ctx: IContext;
}) => {
  try {
    console.log("Creating exercise lib with input:", input);
    const exerciseLib: Exercise_lib = await ctx.prisma.exercise_lib.create({
      // Fix the typo here
      data: {
        title: input.title, // Access the properties from the first element of exercise_lib array
        description: input.description,
        content: input.content,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Exercise library created successfully.",
      exerciseLib,
    };
  } catch (error) {
    console.log("Error creating exercise lib:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create exercise library",
    });
  }
};

export const getAllExercisesLib = async ({ ctx }: { ctx: IContext }) => {
  try {
    const exercisesLib: Exercise_lib[] =
      await ctx.prisma.exercise_lib.findMany();

    console.log("Exercises fetched from database:", exercisesLib);

    if (exercisesLib.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No exercises found, please try again",
        exerciseLib: null,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        exerciseLib: exercisesLib,
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

export const getOneExerciseLib = async ({
  input,
  ctx,
}: {
  input: ExerciseLibIdSchema;
  ctx: IContext;
}) => {
  try {
    const exerciseLib: Exercise_lib | null =
      await ctx.prisma.exercise_lib.findFirst({
        where: { id: Number(input.exerciseLibId) },
      });

    if (exerciseLib === null) {
      return {
        success: false,
        code: 404,
        message: "Exercise not found, please try again.",
        exerciseLib,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        exerciseLib,
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

export const updateExerciseLib = async ({
  input,
  ctx,
}: {
  input: UpdateExerciseLibInputSchema;
  ctx: IContext;
}) => {
  // NOTE!!! The input params passed to the update function will update, if a certain param isn't passed the old value will remain. Be careful what params are sent from the frontend. Might have to write a util for this to remove all unused parameters.
  try {
    const exerciseLib = await ctx.prisma.exercise_lib.update({
      where: { id: Number(input.exerciseLibId) },
      data: input.body,
    });

    return {
      success: true,
      code: 200,
      message: "Resource found",
      exerciseLib,
    };
  } catch (error) {
    console.error("Error in updateExerciseLib:", error); // Add this line to log the error

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

export const deleteExerciseLib = async ({
  input,
  ctx,
}: {
  input: ExerciseLibIdSchema;
  ctx: IContext;
}) => {
  try {
    const exerciseLib = await ctx.prisma.exercise_lib.delete({
      where: { id: Number(input.exerciseLibId) },
    });
    return {
      success: true,
      code: 200,
      message: "Resource found",
      exerciseLib,
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
