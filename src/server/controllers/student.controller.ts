import { CourseIdSchema } from "@/src/common/validation/course-end-user";
import { FilterQueryInput } from "@/src/common/validation/education";
import { EducationIdSchema } from "@/src/common/validation/global";
// import CoursesPage from "@/src/pages/admin/courses";
// import students from "@/src/pages/dashboard/[course]/students";
import { Education, Module, Prisma, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Context } from "vm";
import {
    StudentIdSchema,
    StudentInputSchema,
    UpdateStudentInputSchema,
} from "../../common/validation/student";
import { IContext } from "../context";

export const findStudent = async ({
  input,
  ctx,
}: {
  input: StudentIdSchema;
  ctx: IContext;
}) => {
  try {
    const user: User | null = await ctx.prisma.user.findFirst({
      where: { id: Number(input.studentId) },
    });

    if (user === null) {
      return {
        success: false,
        code: 404,
        message: "Module not found, please try again.",
        user,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        user,
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

export const findAllStudents = async ({
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

    const users: User[] = await ctx.prisma.user.findMany({
      skip,
      take: limit,
    });
    if (users.length <= 0) {
      return {
        success: false,
        code: 404,
        message: "No users found, please try again",
        users,
      };
    } else {
      return {
        success: true,
        code: 200,
        message: "Resource found",
        user: users,
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

export const getStudentsByEducationId = async ({
    input,
    ctx,
  }: {
    input: EducationIdSchema;
    ctx: IContext;
  }) => {
    try {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.educationId) {
        // Handle the case when session or user or educationId is not available
        return {
          success: false,
          code: 400,
          message: "Invalid session data",
          students: null,
        };
      }
  
      const educationId = input.educationId; // Use the educationId from the input directly
  
  
      const users: User[] = await ctx.prisma.user.findMany({
        where: { educationId: Number(educationId) },
      });
  
  
      if (users.length <= 0) {
        console.log("No users found");
        return {
          success: false,
          code: 404,
          message: "No users found, please try again",
          students: null,
        };
      } else {
        return {
          success: true,
          code: 200,
          message: "Resource found",
          students: users,
          error: undefined,
        };
      }
    } catch (error) {
      console.log("An error occurred:", error);
  
      return {
        success: false,
        code: 500,
        message: "An unexpected error occurred, please try again later.",
        students: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
        },
      };
    }
  };
  

