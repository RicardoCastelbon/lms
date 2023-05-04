import { t } from "../trpc";
import { educationRouter } from "./education";
import { userRouter } from "./user";
import { adminRouter } from "./admin/admin";
import { courseLibRouter } from "./admin/course_lib";
import { courseRouter } from "./course";

export const serverRouter = t.router({
  users: userRouter,
  education: educationRouter,
  admin: adminRouter,
  course_lib: courseLibRouter,
  course: courseRouter,
});

//Should this have "I" prefixed in the name? Since it's a type, not an interface.
export type IServerRouter = typeof serverRouter;
