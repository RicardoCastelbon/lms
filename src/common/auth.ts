import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
// import Providers from "next-auth/providers";
import { prisma } from "./prisma";
import { loginSchema, adminLoginSchema } from "./validation/auth";
import { User } from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
        education: { label: "Education", type: "number" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const result = await prisma.user.findFirst({
            where: { email },
          });
          // const newId = String(result?.id);

          if (!result) return null;

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;

          return { id: result.id, email };
        } catch {
          return null;
        }
      },
    }),
    Credentials({
      id: "Mycredentials",
      name: "Mycredentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "asjohn@gmail.com",
        },
        password: { label: "Password", type: "password" },
        education: { label: "Education", type: "number" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const result = await prisma.user.findFirst({
            where: { email },
          });
          // const newId = String(result?.id);

          if (!result) return null;

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;

          return { id: result.id, email };
        } catch {
          return null;
        }
      },
    }),
    Credentials({
      id: "AdminCredentails",
      name: "AdminCredentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await adminLoginSchema.parseAsync(
            credentials
          );

          const result = await prisma.admin.findFirst({
            where: { email },
          });
          // const newId = String(result?.id);

          if (!result) return null;

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;

          return {
            id: result.id,
            email,
            nextPage: "/admin/dashboard",
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      //infering user.id to be a number and not the optional string
      if (user && typeof user.id === "number") {
        token.userId = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",

    newUser: "/sign-up",

  },
  secret: "super-secret",
};
