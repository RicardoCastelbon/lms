import { t } from "../trpc";
import { educationRouter } from "./education";
import { userRouter } from "./user";
import { adminRouter } from "./admin/admin";
import { courseLibRouter } from "./admin/course_lib";

export const serverRouter = t.router({
  users: userRouter,
  education: educationRouter,
  admin: adminRouter,
  course_lib: courseLibRouter,
});
//Should this have "I" prefixed in the name? Since it's a type, not an interface.
export type IServerRouter = typeof serverRouter;
