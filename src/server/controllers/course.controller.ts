import { Course, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
// import { Context } from "vm";
import {
  CourseEndUserSchema,
  courseEndUserSchema,
} from "../../common/validation/course-end-user";
import { IContext } from "../context";

export const addCourse = async ({
  input,
  ctx,
}: {
  input: CourseEndUserSchema;
  ctx: IContext;
}) => {
  try {
    const course: Course = await ctx.prisma.course.create({
      data: {
        title: input.title,
        icon: input.icon,
        color: input.color,
        content: input.content,
        educationId: input.educationId,
        points: input.points,
      },
    });

    return {
      status: "success",
      course,
    };
  } catch (error) {
    /*  console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      
      EXAMPLE OF ERROR CATCH. 
      LINK TO ERROR CODES REFERENCE -> https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Note with that title already exists",
        });
      } 
      console.log(error.code, error.message);
      return error;
    } */
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
      // optional: pass the original error to retain stack trace
      cause: error,
    });
  }
};

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
