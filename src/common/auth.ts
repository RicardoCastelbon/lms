import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
// import Providers from "next-auth/providers";
import { prisma } from "./prisma";
import { loginSchema, adminLoginSchema } from "./validation/auth";
import { User } from "next-auth";
import { isValid } from "zod";
import { Role } from "@prisma/client";
import { log } from "console";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
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
            include: {
              education: true,
            },
          });

          // console.log(result);

          if (!result) return null;

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;

          return {
            id: result.id,
            email,
            role: result.userRole,
            nextPage: `/dashboard`,
            educationId: result.education.id,
            name: result.firstName,
            image: null,
          };
        } catch {
          return null;
        }
      },
    }),
    Credentials({
      id: "AdminCredentials",
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
        console.log("credentials", credentials);
        try {
          const { email, password } = await adminLoginSchema.parseAsync(
            credentials
          );

          const result = await prisma.admin.findFirst({
            where: { email },
          });

          console.log("result", result);

          if (!result) {
            console.error("Admin not found");
            return null;
          }

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) {
            console.error("Invalid password");
            return null;
          }

          console.log("Admin authorized", {
            id: result.id,
            email,
            nextPage: "/admin/dashboard",
            role: result.userRole,
          });

          return {
            id: result.id,
            email,
            nextPage: "/admin/dashboard",
            role: result.userRole,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    /* signIn: async ({ user }) => {
      console.log(user);
      return user;
    }, */
    jwt: async ({ token, user }) => {
      //infering user.id to be a number and not the optional string
      if (user && typeof user.id === "number") {
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
        token.educationId = user.educationId;
        token.name = user.name || null;
        token.image = user.image || null;

        // console.log("JWT callback:", token);
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.role = token.role || null;
        session.user.educationId = token.educationId || null;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.name = token.name || null;
        session.user.image = token.image || null;
      }

      // console.log("Session callback:", session);
      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
  },
  secret: "super-secret",
};
