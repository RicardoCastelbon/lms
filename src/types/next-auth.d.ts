import NextAuth, { DefaultSession, JWT, DefaultUser, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: number;
      role: string | null;
      // provider?: any | null;
      //username: string;
    } & DefaultSession["user"];
    admin: {
      id: number;
      provider: any | null;
      role: string | null;
    };
  }

  interface User {
    id: number;
    name?: string | null;
    email?: string | null;
    image?: string | null; // Default property
    role: string | null;
    //username: string;
  }

  interface Admin {
    id: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string | null;

    //username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number;
    username: string;
    role: string | any;
  }
}
