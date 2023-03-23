import { User, type AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        name: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log("🚀🔥✨[...nextauth].ts🚩13行 ", credentials);
        return {
          id: "1",
          name: "zyan",
          image: null,
          email: null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },

    // eslint-disable-next-line @typescript-eslint/require-await
    async jwt({ token, user }) {
      delete token.picture;
      delete token.email;
      console.log("🚀🔥✨[...nextauth].ts🚩37行 ", token);

      return token;
    },
  },
};

export default NextAuth(authOptions);
