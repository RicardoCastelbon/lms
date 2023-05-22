import { Education, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import { IContext } from "../context";
import {
  EducationIdSchema,
  FilterQuerySchema,
  educationId,
  noInput,
} from "@/src/common/validation/global";
import {
  // CreateEducationInput,
  UpdateEducationInput,
  // ParamsInput,
  FilterQueryInput,
  EducationInput,
} from "../../common/validation/education";

export const createEducation = async ({
  input,
  ctx,
}: {
  input: EducationInput;
  ctx: IContext;
}) => {
  try {
    const education: Education = await ctx.prisma.education.create({
      data: {
        name: input.name,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Resource created",
      education,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          meta: { ...error.meta },
        },
      };
    }
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};

export const updateEducation = async ({
  paramsInput,
  input,
  ctx,
}: {
  paramsInput: EducationIdSchema;
  input: UpdateEducationInput["body"];
  ctx: IContext;
}) => {
  try {
    const education = await ctx.prisma.education.update({
      where: { id: Number(paramsInput.educationId) },
      data: input,
    });

    return {
      success: true,
      code: 200,
      message: "Resource found",
      education,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(
          `An operation failed because it depends on one or more records that were required but not found. ${error.cause}`
        );

        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            meta: { ...error.meta },
          },
        };
      }
    }

    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};

export const findEducation = async ({
  input,
  ctx,
}: {
  input: EducationIdSchema;
  ctx: IContext;
}) => {
  try {
    const education: Education | null = await ctx.prisma.education.findFirst({
      where: { id: Number(input.educationId) },
    });

    if (!education) {
      return {
        success: false,
        code: 404,
        message: "Education not found, please try again.",
        education,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        education,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};
// Find educations paginated
export const findAllEducationsPagination = async ({
  filterQuery,
  ctx,
}: {
  filterQuery: FilterQueryInput;
  ctx: IContext;
}) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    const education = await ctx.prisma.education.findMany({
      skip,
      take: limit,
    });
    if (education.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No educations found, please try again",
        education,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found.",
        education,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};

//Would later need one to get all educations within a school // Niclas.
export const findAllEducations = async ({ ctx }: { ctx: IContext }) => {
  try {
    // const page = filterQuery.page || 1;
    // const limit = filterQuery.limit || 10;
    // const skip = (page - 1) * limit;

    const education = await ctx.prisma.education.findMany();

    if (education.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No educations found, please try again",
        education,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        education: education,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};

export const deleteEducation = async ({
  input,
  ctx,
}: {
  input: EducationIdSchema;
  ctx: IContext;
}) => {
  try {
    const education = await ctx.prisma.education.delete({
      where: { id: Number(input.educationId) },
    });

    return {
      success: true,
      code: 200,
      message: "Resource found",
      education,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.log(
          `An operation failed because it depends on one or more records that were required but not found. ${error.cause}`
        );

        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            meta: { ...error.meta },
          },
        };
      }
    }

    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // optional: pass the original error to retain stack trace
        cause: error,
      }),
    };
  }
};

/* 
      EXAMPLE OF ERROR CATCH. 
      LINK TO ERROR CODES REFERENCE -> https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Note with that title already exists",
        });
      } */

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
