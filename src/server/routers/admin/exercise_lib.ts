import { t } from "../../trpc";
import {
  exerciseLibOutputSchema,
  exerciseLibInputSchema,
  updateExerciseInputSchema,
  exerciseLibId,
} from "../../../common/validation/exercise_lib";

import { createExerciseLibController } from "../../controllers/exercise_lib.controller";
// ../../controllers/exercise_lib.controller
import { z } from "zod";

export const exerciseLibRouter = t.router({
  // Create Course_Lib

  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/exercise-lib/create",
      },
    })
    .output(exerciseLibInputSchema)
    .input(exerciseLibInputSchema)
    .mutation(({ input, ctx }) => createExerciseLibController({ input, ctx })),
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
