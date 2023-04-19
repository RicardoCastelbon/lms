import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import {
  CreateEducationInput,
  UpdateEducationInput,
  ParamsInput,
  FilterQueryInput,
} from "../../common/validation/education";

export const createEducationController = async ({
  input,
  ctx,
}: {
  input: CreateEducationInput;
  ctx: Context;
}) => {
  try {
    const education = await ctx.prisma.education.create({
      data: {
        name: input.name,
      },
    });

    /*  
   USEFUL INFO ABOUT PRISMA
   const result = await ctx.prisma.user.create({
      //yarn prisma generate -> it generates the atributes to work in prisma client
      data: {
        email: "rick@mail.com",
        //education is not a atribute from user, it is a reference to the education table
        //with this syntax we can define the value for in which education is the user
        education: {
          connect: {
            id: 4,
          },
        },
        userRole: "TEACHER",
      },
      //if we want education to be returned we need to add include
      include: {
        education: true,
      },
      //with select we can return just the attributes that we want
      /*  select: {
          email: true,
        }, 
    }); */

    return {
      status: "success",
      data: {
        education,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      /* 
      EXAMPLE OF ERROR CATCH. 
      LINK TO ERROR CODES REFERENCE -> https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Note with that title already exists",
        });
      } */
      console.log(error.code, error.message);
    }
    //throw error;
  }
};

export const updateEducationController = async ({
  paramsInput,
  input,
  ctx,
}: {
  paramsInput: ParamsInput;
  input: UpdateEducationInput["body"];
  ctx: Context;
}) => {
  try {
    const updatedEducation = await ctx.prisma.education.update({
      where: { id: paramsInput.educationId },
      data: input,
    });

    return {
      status: "success",
      note: updatedEducation,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code, error.message);
    }
  }
};

export const findEducationController = async ({
  paramsInput,
  ctx,
}: {
  paramsInput: ParamsInput;
  ctx: Context;
}) => {
  try {
    const education = await ctx.prisma.education.findFirst({
      where: { id: paramsInput.educationId },
    });

    if (!education) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Education with ID: ${paramsInput.educationId} not found`,
      });
    }

    return {
      status: "success",
      education,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code, error.message);
    }
  }
};

export const findAllEducationsController = async ({
  filterQuery,
  ctx,
}: {
  filterQuery: FilterQueryInput;
  ctx: Context;
}) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    const educations = await ctx.prisma.education.findMany({
      skip,
      take: limit,
    });

    return {
      status: "success",
      results: educations.length,
      educations,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code, error.message);
    }
  }
};

export const deleteEducationController = async ({
  paramsInput,
  ctx,
}: {
  paramsInput: ParamsInput;
  ctx: Context;
}) => {
  try {
    await ctx.prisma.education.delete({
      where: { id: paramsInput.educationId },
    });

    return {
      status: "success",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code, error.message);
    }
  }
};
