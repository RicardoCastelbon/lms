import { t } from "../../trpc";
import {
  exerciseLibOutputSchema,
  exerciseLibInputSchema,
  updateExerciseInputSchema,
  exerciseLibId,
} from "../../../common/validation/exercise_lib";

import {
  createExerciseLibController,
  deleteExerciseLib,
  getAllExercisesLib,
  getOneExerciseLib,
  updateExerciseLib,
} from "../../controllers/exercise_lib.controller";
import { z } from "zod";
import {
  FilterQuerySchema,
  educationId,
  noInput,
} from "@/src/common/validation/global";
export const exerciseLibRouter = t.router({
  // Create Exercise_Lib
  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/exercise-lib/create",
      },
    })
    .input(exerciseLibInputSchema)
    .output(exerciseLibOutputSchema)
    .mutation(({ input, ctx }) => createExerciseLibController({ input, ctx })),
  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/exercise-lib/getMany",
      },
    })
    .input(noInput) //Only used to satisfy Swagger, not needed within the controller function.
    .output(exerciseLibOutputSchema)
    .query(({ ctx }) => getAllExercisesLib({ ctx })),

  getOne: t.procedure
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
  updateExerciseLib: t.procedure
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
  deleteExerciseLib: t.procedure
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

//GET ONE Course
// getOne: t.procedure
//   .meta({
//     openapi: {
//       method: "GET",
//       path: "/course-lib/getOne/{course_libId}",
//     },
//   })
//   .input(exerciseLibInputSchema)
//   .output(exerciseLibId);
// .query(({ input, ctx }) =>
//   findExerciseLibController({ paramsInput: input, ctx })
// ),
