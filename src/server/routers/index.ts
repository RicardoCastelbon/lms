import { t } from "../trpc";
import { educationRouter } from "./education";
import { userRouter } from "./user";
import { adminRouter } from "./admin/admin";
import { courseRouter } from "./course";
import { moduleRouter } from "./module";

export const serverRouter = t.router({
  users: userRouter,
  education: educationRouter,
  admin: adminRouter,
  course: courseRouter,
  module: moduleRouter,
});
//Should this have "I" prefixed in the name? Since it's a type, not an interface.
export type IServerRouter = typeof serverRouter;
