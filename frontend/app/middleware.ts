// import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const currentUser = sessionStorage.getItem("authToken");
//   const protectedRoutes = ["/create", "/feed"];
//   if (
//     (request.nextUrl.pathname.startsWith("/register") ||
//       request.nextUrl.pathname.startsWith("/signin")) &&
//     currentUser
//   ) {
//     return NextResponse.redirect(new URL("/feed", request.url));
//   }
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );
//   if (!currentUser && isProtectedRoute) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }
// }
// export const config = {
//   matcher: ["/feed/:path*", "/create/:path*", "/signin", "/register"],
// };
