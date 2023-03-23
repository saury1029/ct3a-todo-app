import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    id: number;
    name: string;
  }

  interface Session {
    user: User;
  }
}
