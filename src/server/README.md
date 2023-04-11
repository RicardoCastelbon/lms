# Server folder (The acutal API)

This is where the backend lives, it's combined of routers, contexts (which wraps our appplication) trpc instatiation(backend) and util functions.

Endpoints are being notated as properties of the router object. In the example below, "signUp" and "getUser" are two different enpoints.

Example:

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

    if (exists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password);

    const result = await ctx.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };

}),
});
```
