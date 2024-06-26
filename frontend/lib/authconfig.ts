import CredentialsProvider from "next-auth/providers/credentials";

// Import User and DefaultSession from "next-auth" instead of "next-auth/next"
import { User, DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the built-in User type
interface CustomUser extends User {
  jwtToken?: string;
}

// Extend the built-in Session type
interface CustomSession extends Session {
  user: {
    jwtToken?: string;
  } & DefaultSession["user"];
}

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ) {
        if (!credentials) return null;

        const res = await fetch(
          "https://my-app.blogen.workers.dev/api/user/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log("user", user.token);

        if (res.ok && user.token) {
          return {
            id: user.id || credentials.username,
            email: credentials.username,
            jwtToken: user.token,
          } as CustomUser;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser | User }) {
      if (user && "jwtToken" in user) {
        token.jwtToken = user.jwtToken;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          ...session.user,
          jwtToken: token.jwtToken as string,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
