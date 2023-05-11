import { TRPCError, initTRPC } from "@trpc/server";
import { IContext } from "./context";
import { OpenApiMeta } from "trpc-openapi";

export const t = initTRPC.context<IContext>().meta<OpenApiMeta>().create();
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const router = t.router;

/* const isAuthed = t.middleware(({ctx, next}) => {

}) */
const isAdmin = middleware(async (opts) => {
  const { ctx } = opts;
  if (ctx.session?.admin?.role === "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: ctx.session?.admin,
    },
  });
});

export const adminProcedure = t.procedure.use(isAdmin);
