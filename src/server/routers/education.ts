import { t } from "../trpc";
import {
  createEducationController,
  deleteEducationController,
  findAllEducationsController,
  findEducationController,
  updateEducationController,
} from "../controllers/education.controller";
import {
  createEducationSchema,
  educationSchema,
  educationsSchema,
  filterQuery,
  params,
  updateEducationSchema,
} from "../../common/validation/education";
import { z } from "zod";

export const educationRouter = t.router({
  //CREATE EDUCATION
  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/educations/create",
      },
    })
    .output(educationSchema)
    .input(createEducationSchema)
    .mutation(({ input, ctx }) => createEducationController({ input, ctx })),

  //GET ONE EDUCATION
  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/educations/getOne/{educationId}",
      },
    })
    .input(params)
    .output(educationSchema)
    .query(({ input, ctx }) =>
      findEducationController({ paramsInput: input, ctx })
    ),

  //GET MANY EDUCATIONS
  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/educations/getMany",
      },
    })
    .output(educationsSchema)
    .input(filterQuery)
    .query(({ input, ctx }) =>
      findAllEducationsController({ filterQuery: input, ctx })
    ),

  //UPDATE EDUCATION
  update: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/educations/update/{educationId}",
      },
    })
    .output(educationSchema)
    .input(updateEducationSchema)
    .mutation(({ input, ctx }) =>
      updateEducationController({
        paramsInput: input,
        input: input.body,
        ctx,
      })
    ),

  //DELETE EDUCATION
  delete: t.procedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/educations/delete/{educationId}",
      },
    })
    .input(params)
    .output(educationSchema)
    .mutation(({ input, ctx }) =>
      deleteEducationController({ paramsInput: input, ctx })
    ),
});
