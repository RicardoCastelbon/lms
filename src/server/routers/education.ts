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
  filterQuery,
  params,
  updateEducationSchema,
} from "../../common/validation/education";

export const educationRouter = t.router({
  //CREATE EDUCATION
  create: t.procedure
    .input(createEducationSchema)
    .mutation(({ input, ctx }) => createEducationController({ input, ctx })),

  //READ ONE EDUCATION
  getOne: t.procedure
    .input(params)
    .query(({ input, ctx }) =>
      findEducationController({ paramsInput: input, ctx })
    ),

  //READ MANY EDUCATIONS
  getMany: t.procedure
    .input(filterQuery)
    .query(({ input, ctx }) =>
      findAllEducationsController({ filterQuery: input, ctx })
    ),

  //UPDATE EDUCATION
  update: t.procedure.input(updateEducationSchema).mutation(({ input, ctx }) =>
    updateEducationController({
      paramsInput: input.params,
      input: input.body,
      ctx,
    })
  ),

  //DELETE EDUCATION
  delete: t.procedure
    .input(params)
    .mutation(({ input, ctx }) =>
      deleteEducationController({ paramsInput: input, ctx })
    ),
});
