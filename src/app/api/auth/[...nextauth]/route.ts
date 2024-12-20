

// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST, authOptions };
// route.ts
// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth"; 

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST, authOptions };

import NextAuth, { Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models";
import connectToDb from "@/lib/utils";
import { JWT } from "next-auth/jwt";


// lib/types.ts or a similar file
export interface UserType {
  id: string;
  userName: string;
  email: string;
  isAdmin: boolean;
}

export const config = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        const { userName, password } = credentials;

        try {
          await connectToDb();
          const user = await User.findOne({ userName });
          if (!user) throw new Error("Invalid username or password");

          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (!isPasswordCorrect) throw new Error("Invalid username or password");

          return {
            id: user._id.toString(),
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin || false,
          };
        } catch (err) {
          console.error("Login error: ", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async  session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        name: token.userName,
        id: token.id,
        email: token.email,
        isAdmin: token.isAdmin,
      };
      return session;
    },
   async jwt({ token, user }: { token: JWT; user?: UserType }) {
    if (user) {
    token.id = user.id;
    token.userName = user.userName;
    token.isAdmin = user.isAdmin;
  }
  return token;
}

  },
};

export const GET = NextAuth(config);
export const POST = NextAuth(config);
