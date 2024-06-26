import NextAuth from "next-auth/next";
import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";

const handler = NextAuth(NEXT_AUTH_CONFIG);

export const GET = handler;
export const POST = handler;
