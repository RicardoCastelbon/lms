import { TRPCError, initTRPC } from "@trpc/server";
import { IContext } from "./context";
import { OpenApiMeta } from "trpc-openapi";

export const t = initTRPC.context<IContext>().meta<OpenApiMeta>().create();
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const router = t.router;

/* const isAuthed = t.middleware(({ctx, next}) => {

}) */

const isAuthed = middleware(async (opts) => {
  const { ctx } = opts;
  console.log("isAuthed middleware", ctx.session);
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next();
});
const isTeacher = middleware(async (opts) => {
  const { ctx } = opts;
  console.log("isTeacher middleware", ctx.session);
  if (ctx.session?.user?.role !== "TEACHER") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next();
});

const isAdmin = middleware(async (opts) => {
  const { ctx } = opts;
  //   console.log(ctx);

  console.log("isAdmin middleware", ctx.session);

  if (ctx.session?.admin?.role === "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: ctx.session?.admin,
    },
  });
});

export const privateProcedure = t.procedure.use(isAuthed);
export const teacherProcedure = t.procedure.use(isTeacher);
export const adminProcedure = t.procedure.use(isAdmin);
