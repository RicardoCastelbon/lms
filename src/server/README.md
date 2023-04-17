# Server folder (The acutal API)

This is where the backend lives, it's combined of routers, contexts (which wraps our appplication) trpc instatiation(backend) and util functions.

Endpoints are being notated as properties of the router object. In the example below, "signUp" and "getUser" are two different enpoints on the userRouter.

Example:

`/server/routers/user.ts`

```
export const userRouter = t.router({

getUser: t.procedure.query(() => {
    return {id: 3, email: "test@mail.com", name: "test"}
}),

signup: t.procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
const { username, email, password } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

 // logic for creating a user...

}),
});
```

## Router folder

This is where all the specific routers go, e.g userRouter, courseRouter, authRouter etc.
They are to be exported and imported into routers/index.ts which is the root-router of the application. It will bundle all routers and export them as one. As well as handling root-level endpoints.

`/server/routers/index.ts`

```
import { userRouter } from "./user";


export const serverRouter = t.router({
  users: userRouter,
});

export type IServerRouter = typeof serverRouter;
```
