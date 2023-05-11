import { adminProcedure, t } from "../../trpc";
import {
  moduleLibOutputSchema,
  moduleLibInputSchema,
  updateModuleLibInputSchema,
  moduleLibId,
} from "../../../common/validation/module-lib";

import {
  createModuleLibController,
  getOneModuleLib,
  getAllModulesLib,
  updateModuleLib,
  deleteModuleLib,
} from "../../controllers/module-lib.controller";
import { z } from "zod";
import { noInput } from "@/src/common/validation/global";
export const moduleLibRouter = t.router({
  // Create Exercise_Lib
  create: adminProcedure
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
  updateModuleLib: adminProcedure
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
  delete: adminProcedure
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
