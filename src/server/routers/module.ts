import { t } from "../trpc";
import {
  createModuleController,
  deleteModuleController,
  findAllModulesByCourseSlugController,
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
import { courseId } from "@/src/common/validation/course-end-user";

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

  getManyByCourseSlug: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/modules/getManyByCourseSlug",
      },
    })
    .input(courseId) //Only used to satisfy Swagger, not needed within the controller function.
    .output(moduleOutputSchema)
    .query(({ input, ctx }) =>
      findAllModulesByCourseSlugController({ input, ctx })
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
