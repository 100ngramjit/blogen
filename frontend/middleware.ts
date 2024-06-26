export { default } from "next-auth/middleware";

export const config = { matcher: ["/blogs", "/create", "/api/user"] };
