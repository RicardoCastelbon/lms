import { initTRPC } from "@trpc/server";
import { IContext } from "./context";
import { OpenApiMeta } from "trpc-openapi";

export const t = initTRPC.context<IContext>().meta<OpenApiMeta>().create();
