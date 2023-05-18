import { t } from "../trpc";
import {
  createExerciseController,
  deleteExerciseController,
  findAllExercisesByModuleIdController,
  findAllExercisesController,
  findExerciseController,
  updateExerciseController,
  getOneExerciseBySlug,
} from "../controllers/exercise.controller";
import {
  exerciseOutputSchema,
  exerciseId,
  exerciseInputSchema,
  updateExerciseInputSchema,
  filterQuery,
  exerciseSlug,
} from "../../common/validation/exercise-end-user";
import { moduleId } from "@/src/common/validation/module-end-user";

export const exerciseRouter = t.router({
  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/exercises/create",
      },
    })
    .input(exerciseInputSchema)
    .output(exerciseOutputSchema)
    .mutation(({ input, ctx }) => createExerciseController({ input, ctx })),

  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/exercises/getOne/{exerciseId}",
      },
    })
    .input(exerciseId)
    .output(exerciseOutputSchema)
    .query(({ input, ctx }) => findExerciseController({ input: input, ctx })),

  getExerciseBySlug: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/exercise/getOneBySlug/{courseSlug}",
      },
    })
    .input(exerciseSlug)
    .output(exerciseOutputSchema)
    .query(({ input, ctx }) => getOneExerciseBySlug({ input, ctx })),

  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/exercises/getMany",
      },
    })
    .input(filterQuery)
    .output(exerciseOutputSchema)
    .query(({ input, ctx }) =>
      findAllExercisesController({ filterQuery: input, ctx })
    ),

  getManyByModuleId: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/exercises/getMany/{moduleId}",
      },
    })
    .input(moduleId)
    .output(exerciseOutputSchema)
    .query(({ input, ctx }) =>
      findAllExercisesByModuleIdController({ input, ctx })
    ),

  update: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/exercises/update/{exerciseId}",
      },
    })
    .input(updateExerciseInputSchema)
    .output(exerciseOutputSchema)
    .mutation(({ input, ctx }) =>
      updateExerciseController({
        exerciseId: input,
        input: input.body,
        ctx,
      })
    ),

  delete: t.procedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/exercises/delete/{exerciseId}",
      },
    })
    .input(exerciseId)
    .output(exerciseOutputSchema)
    .mutation(({ input, ctx }) =>
      deleteExerciseController({ input: input, ctx })
    ),
});
