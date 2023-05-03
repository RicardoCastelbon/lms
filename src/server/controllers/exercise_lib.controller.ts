import { ExerciseLib, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import {
  ExerciseLibIdSchema,
  ExerciseLibInputSchema,
  ExerciseLibOutputSchema,
} from "../../common/validation/exercise_lib";

export const createExerciseLibController = async ({
  input,
  ctx,
}: {
  input: ExerciseLibInputSchema;
  ctx: Context;
}) => {
  try {
    console.log("Creating course lib with input:", input);
    const exerciseLib: ExerciseLib = await ctx.prisma.exerciseLib.create({
      // Fix the typo here
      data: {
        title: input.exerciseLib.title, // Access the properties from the first element of exercise_lib array
        description: input.exerciseLib.description,
        content: input.exerciseLib.content,
      },
      include: {
        _all: true,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Exercise library created successfully.",
      exerciseLib,
      error: null,
    };
  } catch (error) {
    console.log("Error creating exercise lib:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create course library",
    });
  }
};

// export const findExerciseLibController = async ({
//   //   paramsInput,
//   ctx,
// }: {
//   //   paramsInput: ParamsInput;
//   ctx: Context;
// }) => {
//   try {
//     const course_lib: Exercise_lib | null =
//       await ctx.prisma.exercise_lib.findFirst({
//         // where: { id: Number(paramsInput.exercise_libId) },
//       });

//     if (!course_lib) {
//       throw new TRPCError({
//         code: "NOT_FOUND",
//         // message: `Education with ID: ${paramsInput.exercise_libId} not found`,
//       });
//     }

//     return {
//       status: "success",
//       course_lib,
//     };
//   } catch (error) {
//     console.log(error);
//     throw new TRPCError({
//       code: "INTERNAL_SERVER_ERROR",
//       message: "Failed to find course library",
//     });
//   }
// };

// export const updatedCourseLibController = async ({
//   paramsInput,
//   input,
//   ctx,
// }: {
//   paramsInput: ParamsInput;
//   input: UpdatedExerciseLibInput["body"];
//   ctx: Context;
// }) => {
//   try {
//     const exercise_lib = await ctx.prisma.exercise_lib.update({
//       where: { id: Number(paramsInput.exercise_libId) },
//       data: input,
//     });

//     return {
//       status: "success",
//       exercise_lib,
//     };
//   } catch (error) {
//     console.log(error);
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       console.log(error.code, error.message);
//       return error;
//     }
//   }
// };
