import { t } from "../trpc";
import {
  createEducation,
  deleteEducation,
    findAllEducations,
  findAllEducationsPagination,
  findEducation,
  updateEducation,
} from "../controllers/education.controller";
import {
  createEducationSchema,
  educationInputSchema,
  educationOutputSchema,
  // educationSchema,
  // educationsSchema,
  filterQuery,
  // params,
  updatedEducationResponse,
  updateEducationSchema,
} from "../../common/validation/education";
import { z } from "zod";
import { educationId, noInput } from "@/src/common/validation/global";

export const educationRouter = t.router({
  //CREATE EDUCATION
  create: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/educations/create",
      },
    })
    .input(educationInputSchema)
    .output(educationOutputSchema)
    .mutation(({ input, ctx }) => createEducation({ input, ctx })),

  //GET ONE EDUCATION
  getOne: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/educations/getOne/{educationId}",
      },
    })
    .input(educationId)
    .output(educationOutputSchema)
    .query(({ input, ctx }) => findEducation({ input, ctx })),

  //GET MANY EDUCATIONS Pagination
  getMany: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/educations/getMany",
      },
    })
    .input(filterQuery)
    .output(educationOutputSchema)
    .query(({ input, ctx }) =>
    findAllEducationsPagination({ filterQuery: input, ctx })
    ),
  //GET ALL EDUCATIONS
  getAll: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/educations/get-all",
      },
    })
    .input(noInput)
    .output(educationOutputSchema)
    .query(({ ctx }) => findAllEducations({ ctx })),

  //UPDATE EDUCATION
  update: t.procedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/educations/update/{educationId}",
      },
    })
    .input(updateEducationSchema)
    .output(educationOutputSchema)
    .mutation(({ input, ctx }) =>
    updateEducation({
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
    .input(educationId)
    .output(educationOutputSchema)
    .mutation(({ input, ctx }) => deleteEducation({ input, ctx })),
});
