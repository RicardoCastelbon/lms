import { t } from "../trpc";
import { educationRouter } from "./education";
import { userRouter } from "./user";
import { adminRouter } from "./admin/admin";
import { courseLibRouter } from "./admin/course-lib";
import { courseRouter } from "./course";
import { exerciseLibRouter } from "./admin/exercise_lib";
import { moduleLibRouter } from "./admin/modules-lib";

export const serverRouter = t.router({
  users: userRouter,
  education: educationRouter,
  admin: adminRouter,
  exercise_lib: exerciseLibRouter,
  courseLib: courseLibRouter,
  course: courseRouter,
  moduleLib: moduleLibRouter
});

//Should this have "I" prefixed in the name? Since it's a type, not an interface.
export type IServerRouter = typeof serverRouter;
