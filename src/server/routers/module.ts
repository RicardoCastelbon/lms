import { t } from "../trpc";
import {
  createModuleController,
  deleteModuleController,
  findAllModulesController,
  findModuleController,
  updateModuleController,
} from "../controllers/module.controller";
import {
  moduleOutputSchema,
  moduleId,
  moduleInputSchema,
  updateModuleInputSchema,
  filterQuery,
} from "../../common/validation/module-end-user";

export const moduleRouter = t.router({
  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/modules/create",
      },
    })
    .input(moduleInputSchema)
    .output(moduleOutputSchema)
    .mutation(({ input, ctx }) => createModuleController({ input, ctx })),

  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/modules/getOne/{moduleId}",
      },
    })
    .input(moduleId)
    .output(moduleOutputSchema)
    .query(({ input, ctx }) => findModuleController({ input: input, ctx })),

  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/modules/getMany",
      },
    })
    .input(filterQuery)
    .output(moduleOutputSchema)
    .query(({ input, ctx }) =>
      findAllModulesController({ filterQuery: input, ctx })
    ),

  update: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/modules/update/{moduleId}",
      },
    })
    .input(updateModuleInputSchema)
    .output(moduleOutputSchema)
    .mutation(({ input, ctx }) =>
      updateModuleController({
        moduleId: input,
        input: input.body,
        ctx,
      })
    ),

  delete: t.procedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/modules/delete/{moduleId}",
      },
    })
    .input(moduleId)
    .output(moduleOutputSchema)
    .mutation(({ input, ctx }) =>
      deleteModuleController({ input: input, ctx })
    ),
});
