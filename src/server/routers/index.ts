import { createEducationSchema } from "@/src/common/validation/education";
import { t } from "../trpc";
import { educationRouter } from "./education";
import { userRouter } from "./user";
import { createEducationController } from "../controllers/education.controller";

export const serverRouter = t.router({
  users: userRouter,
  education: educationRouter,
});
//Should this have "I" prefixed in the name? Since it's a type, not an interface.
export type IServerRouter = typeof serverRouter;
