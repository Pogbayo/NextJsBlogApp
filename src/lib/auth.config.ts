import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const isOnLoginPage = req.nextUrl.pathname.startsWith("/login");
      const isOnAdminPanel = req.nextUrl.pathname.startsWith("/admin");
      const isOnBlogPage = req.nextUrl.pathname.startsWith("/blog");
  
      // Redirect unauthenticated users to the login page on the first visit
      if (!token && !isOnLoginPage) {
        return false;
      }
  
      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && token) {
        return false;
      }
  
      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && (!token || !token.isAdmin)) {
        return false;
      }
  
      // ALLOW BOTH ADMIN AND AUTHENTICATED USERS TO ACCESS THE BLOG PAGE
      if (isOnBlogPage) {
        return true; // Return true if token is present
      }
  
      return true;
    },
  },
});

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"], // Ensure middleware runs on all pages except API and static files
};
