import { t } from "../trpc";
import {
    deleteExercise,
  findAllExercisesByModuleId,
  findAllExercises,
  findExercise,
    updateExercise,
  getOneExerciseBySlug,
  createExercise,
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
import { updateEducation } from "../controllers/education.controller";

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
    .mutation(({ input, ctx }) => createExercise({ input, ctx })),

  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/exercises/getOne/{exerciseId}",
      },
    })
    .input(exerciseId)
    .output(exerciseOutputSchema)
    .query(({ input, ctx }) => findExercise({ input: input, ctx })),

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
      findAllExercises({ filterQuery: input, ctx })
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
      findAllExercisesByModuleId({ input, ctx })
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
    updateExercise({
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
      deleteExercise({ input: input, ctx })
    ),
});
