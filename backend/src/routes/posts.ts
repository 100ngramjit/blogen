import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { envVars } from "../types";
import { verify } from "hono/jwt";

export const postRouter = new Hono<envVars>();

postRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization") as string;
  const isUserVerified = await verify(token.split(" ")[1], c.env.JWT_SECRET);
  if (isUserVerified) {
    c.set("userId", isUserVerified.id as string);
    await next();
  } else {
    c.status(411);
    return c.json({ err: "user is not authenticated" });
  }
});

postRouter.post("/", async (c) => {
  const authorId = c.get("userId");
  console.log("hello");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    console.log(post);
    return c.json({ id: post.id });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});

postRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ id: post.id });
});

postRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const authorId = c.get("userId");
    const post = await prisma.post.findFirst({
      where: {
        authorId: authorId,
      },
    });
    return c.json({ posts: post });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});
postRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const authorId = c.get("userId");
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
    });
    return c.json({ posts: posts });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});
