export { default } from "next-auth/middleware";

export const config = { matcher: ["/feed", "/create", "/api/user"] };
