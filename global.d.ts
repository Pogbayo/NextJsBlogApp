
// import NextAuth from "next-auth";
// import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     userName: string;
//     email: string;
//     isAdmin: boolean;
//   }

//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       userName: string;
//       email: string;
//       isAdmin: boolean;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     userName: string;
//     email: string;
//     isAdmin: boolean;
//   }
// }


// declare namespace NodeJS {
//     interface ProcessEnv {
//       GITHUB_ID: string;
//       GITHUB_SECRET: string;
//     }
//   }
  

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    userName: string;
    email: string;
    isAdmin: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      userName: string;
      email: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string;
    email: string;
    isAdmin: boolean;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
  }
}
