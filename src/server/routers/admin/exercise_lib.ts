import { t } from "../../trpc";
import {
  createExerciseLibController,
  //   deleteExerciseLibController,
  //   findAllExerciseLibController,
  findExerciseLibController,
  //   updatedExerciseLibController,
} from "../../controllers/exercise_lib.controller";
// ../../controllers/exercise_lib.controller
import {
  createExerciseLibSchema,
  exerciseLibSchema,
  filterQuery,
  params,
  //   exerciseLibSchema,
  //   updatedExerciseLibSchema,
} from "../../../common/validation/exercise_lib";
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
    .output(exerciseLibSchema)

    .input(createExerciseLibSchema)
    .mutation(({ input, ctx }) => createExerciseLibController({ input, ctx })),
});

//GET ONE Course
getOne: t.procedure
  .meta({
    openapi: {
      method: "GET",
      path: "/course-lib/getOne/{course_libId}",
    },
  })
  .input(params)
  .output(exerciseLibSchema);
// .query(({ input, ctx }) =>
//   findExerciseLibController({ paramsInput: input, ctx })
// ),
