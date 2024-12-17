// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token || !token.isAdmin) {
          return false; 
        }
      }
      return !! token; 
    },
  },
  pages: {
    signIn: "/login", 
  },
});

export const config = {
    matcher: [
        "/((?!api|static|.*\\..*|_next|register|login).*)",
      ],};
