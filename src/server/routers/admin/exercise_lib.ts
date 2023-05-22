import { adminProcedure, privateProcedure, t } from "../../trpc";
import {
  exerciseLibOutputSchema,
  exerciseLibInputSchema,
  updateExerciseInputSchema,
  exerciseLibId,
} from "../../../common/validation/exercise_lib";

import {
  createExerciseLib,
  deleteExerciseLib,
  getAllExercisesLib,
  getOneExerciseLib,
  updateExerciseLib,
} from "../../controllers/exercise-lib.controller";
import { z } from "zod";
import {
  FilterQuerySchema,
  educationId,
  noInput,
} from "@/src/common/validation/global";
export const exerciseLibRouter = t.router({
  // Create Exercise_Lib
  create: adminProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/exercise-lib/create",
      },
    })
    .input(exerciseLibInputSchema)
    .output(exerciseLibOutputSchema)
    .mutation(({ input, ctx }) => createExerciseLib({ input, ctx })),
  getMany: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/exercise-lib/getMany",
      },
    })
    .input(noInput) //Only used to satisfy Swagger, not needed within the controller function.
    .output(exerciseLibOutputSchema)
    .query(({ ctx }) => getAllExercisesLib({ ctx })),

  getOne: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/exercise-lib/getOne/{exerciseLibId}",
      },
    })
    .input(exerciseLibId)
    .output(exerciseLibOutputSchema)
    .query(({ input, ctx }) => getOneExerciseLib({ input, ctx })),

  // UPDATE EXERCISE_LIB
  updateExerciseLib: adminProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/exercise-lib/update/{exerciseLibId}",
      },
    })
    .input(updateExerciseInputSchema)
    .output(exerciseLibOutputSchema)
    .mutation(({ input, ctx }) =>
      updateExerciseLib({
        input,
        ctx,
      })
    ),
  deleteExerciseLib: adminProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/exercise-lib/delete/{exerciseLibId}",
      },
    })
    .input(exerciseLibId)
    .output(exerciseLibOutputSchema)
    .mutation(({ input, ctx }) =>
      deleteExerciseLib({
        input,
        ctx,
      })
    ),
});

