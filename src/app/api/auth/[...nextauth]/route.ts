import NextAuth from "next-auth";

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        console.log(profile);
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.sub.toString(),
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // username: {
        //   label: "username:",
        //   type: "text",
        //   placholder: "username",
        // },
        email: {
          label: "Email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials, req) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials

        await connect();

        try {
          const user = await User.findOne({ email: credentials?.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not Found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  // session: {
  //   strategy: "jwt",
  //   maxAge: 1 * 24 * 60 * 60, // 세션의 최대 유지 기간 (1일)
  // },

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
});

export { handler as GET, handler as POST };
