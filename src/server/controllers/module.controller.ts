import { FilterQueryInput } from "@/src/common/validation/education";
import { Education, Module, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import {
  ModuleIdSchema,
  ModuleInputSchema,
  UpdateModuleInputSchema,
} from "../../common/validation/module-end-user";

export const createModuleController = async ({
  input,
  ctx,
}: {
  input: ModuleInputSchema;
  ctx: Context;
}) => {
  try {
    const module: Module = await ctx.prisma.module.create({
      data: {
        title: input.title,
        startDate: input.startDate,
        endDate: input.endDate,
        content: input.content,
        course: {
          connect: { id: input.courseId },
        },
      },
    });

    return {
      success: true,
      code: 201,
      message: "Resource created",
      module,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // related records could not be found.
      if (error.code === "P2015") {
        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            meta: { ...error.meta },
          },
        };
      }
      if (error.code === "P2025") {
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

export const updateModuleController = async ({
  moduleId,
  input,
  ctx,
}: {
  moduleId: ModuleIdSchema;
  input: UpdateModuleInputSchema["body"];
  ctx: Context;
}) => {
  try {
    const module: Module = await ctx.prisma.module.update({
      where: { id: Number(moduleId.moduleId) },
      data: input,
    });

    return {
      success: true,
      code: 200,
      message: "Resource found",
      module,
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

export const findModuleController = async ({
  input,
  ctx,
}: {
  input: ModuleIdSchema;
  ctx: Context;
}) => {
  try {
    const module: Module = await ctx.prisma.module.findFirst({
      where: { id: Number(input.moduleId) },
    });

    if (module === null) {
      return {
        success: false,
        code: 404,
        message: "Module not found, please try again.",
        module,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        module,
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

export const findAllModulesController = async ({
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

    const modules: Module[] = await ctx.prisma.module.findMany({
      skip,
      take: limit,
    });
    if (modules.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No modules found, please try again",
        modules,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        module: modules,
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

export const deleteModuleController = async ({
  input,
  ctx,
}: {
  input: ModuleIdSchema;
  ctx: Context;
}) => {
  try {
    const module: Module = await ctx.prisma.module.delete({
      where: { id: Number(input.moduleId) },
    });
    return {
      success: true,
      code: 200,
      message: "Resource found",
      module,
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
