import { type AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
import { schema } from "./schema";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "user-login",
      credentials: {
        name: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("请输入姓名和密码");
        const { name, password } = credentials;

        const result = schema.safeParse({
          name,
          password,
        });

        if (!result.success) {
          const { fieldErrors } = result.error.flatten();

          const errorStr = Object.keys(fieldErrors).reduce((acc, key) => {
            const cur = fieldErrors[key as "name" | "password"];
            return cur ? `${acc}${cur.join(",")} ` : acc;
          }, "" as string);

          throw new Error(encodeURIComponent(errorStr));
        }

        const find = await prisma.user.findUnique({
          where: {
            name,
          },
        });

        if (!find) {
          throw new Error(encodeURIComponent("用户不存在"));
        }

        if (find.password !== password) {
          throw new Error(encodeURIComponent("密码错误"));
        } else {
          return {
            id: find.id,
            name: find.name,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({ session, token }) {
      session.user.id = Number(token.sub);

      return session;
    },

    // eslint-disable-next-line @typescript-eslint/require-await
    async jwt({ token }) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
