import { t } from "../trpc";
import { userRouter } from "./user";

export const serverRouter = t.router({
  users: userRouter,
});
//Should this have "I" prefixed in the name? Since it's a type, not an interface.
export type IServerRouter = typeof serverRouter;
