import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
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
        const token = user.token;
        console.log("user", user.token);
        if (res.ok && user.token) {
          return { id: token };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});
export const GET = handler;
export const POST = handler;
