import { t } from "../../trpc";
import {
  moduleLibOutputSchema,
  moduleLibInputSchema,
  updateModuleLibInputSchema,
  moduleLibId,
  // ModuleLibInputSchema,
} from "../../../common/validation/module-lib";

import {
  createModuleLibController, getOneModuleLib,
//   deleteModuleLib,
   getAllModulesLib,
   updateModuleLib,
   deleteModuleLib,
//   getOneModuleLib,
//   updateModuleLib,
} from "../../controllers/module-lib.controller";
import { z } from "zod";
import {
  FilterQuerySchema,
  educationId,
  noInput,
} from "@/src/common/validation/global";
export const moduleLibRouter = t.router({
  // Create Exercise_Lib
  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/module-lib/create",
      },
    })
    .input(moduleLibInputSchema)
    .output(moduleLibOutputSchema)
    .mutation(({ input, ctx }) => createModuleLibController({ input, ctx })),

  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/module-lib/getMany",
      },
    })
    .input(noInput) //Only used to satisfy Swagger, not needed within the controller function.
    .output(moduleLibOutputSchema)
    .query(({ ctx }) => getAllModulesLib({ ctx })),

  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/module-lib/getOne/{moduleLibId}",
      },
    })
    .input(moduleLibId)
    .output(moduleLibOutputSchema)
    .query(({ input, ctx }) => getOneModuleLib({ input, ctx })),

//   // UPDATE EXERCISE_LIB
  updateModuleLib: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/module-lib/update/{moduleLibId}",
      },
    })
    .input(updateModuleLibInputSchema)
    .output(moduleLibOutputSchema)
    .mutation(({ input, ctx }) =>
      updateModuleLib({
        input,
        ctx,
      })
    ),
  deletemoduleLib: t.procedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/module-lib/delete/{moduleLibId}",
      },
    })
    .input(moduleLibId)
    .output(moduleLibOutputSchema)
    .mutation(({ input, ctx }) =>
      deleteModuleLib({
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
