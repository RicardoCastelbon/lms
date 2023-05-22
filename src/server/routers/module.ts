import { privateProcedure, t, teacherProcedure } from "../trpc";
import {
  createModule,
  deleteModule,
  findAllModulesByCourseId,
  findAllModules,
  findModuleController,
  updateModule,
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
  create: teacherProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/modules/create",
      },
    })
    .input(moduleInputSchema)
    .output(moduleOutputSchema)
    .mutation(({ input, ctx }) => createModule({ input, ctx })),

  getOne: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/modules/getOne/{moduleId}",
      },
    })
    .input(moduleId)
    .output(moduleOutputSchema)
    .query(({ input, ctx }) => findModuleController({ input: input, ctx })),

  getMany: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/modules/getMany",
      },
    })
    .input(filterQuery)
    .output(moduleOutputSchema)
    .query(({ input, ctx }) =>
    findAllModules({ filterQuery: input, ctx })
    ),

  getManyByCourseId: privateProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/modules/getMany/{courseId}",
      },
    })
    .input(courseId)
    .output(moduleOutputSchema)
    .query(({ input, ctx }) =>
      findAllModulesByCourseId({ input, ctx })
    ),

  update: teacherProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/modules/update/{moduleId}",
      },
    })
    .input(updateModuleInputSchema)
    .output(moduleOutputSchema)
    .mutation(({ input, ctx }) =>
    updateModule({
        input,
        ctx,
      })
    ),

  delete: teacherProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/modules/delete/{moduleId}",
      },
    })
    .input(moduleId)
    .output(moduleOutputSchema)
    .mutation(({ input, ctx }) =>
    deleteModule({ input: input, ctx })
    ),
});
