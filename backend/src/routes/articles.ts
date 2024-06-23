import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { envVars } from "../types";
import { verify } from "hono/jwt";

export const articleRouter = new Hono<envVars>();

articleRouter.use("/*", async (c, next) => {
  try {
    const token = c.req.header("Authorization") as string;
    if (!token) {
      c.status(403);
      return c.json({ err: "Invalid token" });
    }
    const isUserVerified = await verify(token.split(" ")[1], c.env.JWT_SECRET);
    if (isUserVerified) {
      c.set("userId", isUserVerified.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ err: "user is not authenticated" });
    }
  } catch (e) {
    c.status(500);
    return c.json({ err: e });
  }
});

articleRouter.post("/", async (c) => {
  const authorId = c.get("userId");
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
    return c.json({ id: post.id });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});

articleRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");

    const body = await c.req.json();

    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ edited: post });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});

articleRouter.get("/details/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    if (!post) {
      return c.json({ err: "No article found with this id" });
    }
    return c.json({ article: post });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});

articleRouter.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return c.json({ deleted: post });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});

articleRouter.get("/all", async (c) => {
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
    return c.json({ posts: posts, number_of_posts: posts.length });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});
