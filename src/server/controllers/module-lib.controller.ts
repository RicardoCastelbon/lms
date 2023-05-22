
import {  Module_lib, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  ModuleLibIdSchema,
  ModuleLibInputSchema,
  UpdateModuleLibInputSchema,
} from "../../common/validation/module-lib"
import { IContext } from "../context";

export const createModuleLib = async ({
  input,
  ctx,
}: {
  input: ModuleLibInputSchema;
  ctx: IContext;
}) => {
  try {
    console.log("Creating module lib with input:", input);
    const moduleLib: Module_lib = await ctx.prisma.module_lib.create({
      data: {
        title: input.title,
        description: input.description,
        content: input.content,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Module library created successfully.",
      moduleLib,
    };
  } catch (error) {
    console.log("Error creating module lib:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create module library",
    });
  }
};

export const getAllModulesLib = async ({ ctx }: { ctx: IContext }) => {
  try {
    const modulesLib: Module_lib[] = await ctx.prisma.module_lib.findMany();

    if (modulesLib.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No modules found, please try again",
        moduleLib: null,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        moduleLib: modulesLib,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: error,
      }),
    };
  }
};

export const getOneModuleLib = async ({
  input,
  ctx,
}: {
  input: ModuleLibIdSchema;
  ctx: IContext;
}) => {
  try {
    const moduleLib: Module_lib | null = await ctx.prisma.module_lib.findFirst({
      where: { id: Number(input.moduleLibId) },
    });

    if (moduleLib === null) {
      return {
        success: false,
        code: 404,
        message: "Module not found, please try again.",
        moduleLib,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        moduleLib,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: error,
      }),
    };
  }
};

export const updateModuleLib = async ({
  input,
  ctx,
}: {
  input: UpdateModuleLibInputSchema;
  ctx: IContext;
}) => {
  // NOTE!!! The input params passed to the update function will update, if a certain param isn't passed the old value will remain. Be careful what params are sent from the frontend. Might have to write a util for this to remove all unused parameters.
  try {
    const moduleLib = await ctx.prisma.module_lib.update({
      where: { id: Number(input.moduleLibId) },
      data: input.body,
    });

    return {
      success: true,
      code: 200,
      message: "Resource found",
      moduleLib,
    };
  } catch (error) {
    console.error("Error in updateModuleLib:", error); // Add this line to log the error

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

export const deleteModuleLib = async ({
  input,
  ctx,
}: {
  input: ModuleLibIdSchema;
  ctx: IContext;
}) => {
  try {
    const moduleLib = await ctx.prisma.module_lib.delete({
      where: { id: Number(input.moduleLibId) },
    });
    return {
      success: true,
      code: 200,
      message: "Resource found",
      moduleLib,
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
