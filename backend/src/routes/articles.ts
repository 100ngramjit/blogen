import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { envVars } from "../types";
import { verify } from "hono/jwt";
import { zValidator } from "@hono/zod-validator";
import { createArticleSchema, updateArticleSchema } from "../validation/schemas";

export const articleRouter = new Hono<envVars>();

const createPrismaClient = (connectionString: string) => {
  if (!connectionString) throw new Error("Missing DATABASE_URL");

  return new PrismaClient({
    accelerateUrl: connectionString,
  }).$extends(withAccelerate());
};

// Public Routes
articleRouter.get("/latest", async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const page = parseInt(c.req.query("p") || "1");
  const limit = parseInt(c.req.query("l") || "6");
  const skip = (page - 1) * limit;

  try {
    const latestPosts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalPosts = await prisma.post.count({
      where: { published: true }
    });

    return c.json({ 
      posts: latestPosts, 
      number_of_posts: latestPosts.length,
      total_posts: totalPosts,
      has_more: skip + latestPosts.length < totalPosts
    });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});

articleRouter.get("/details/:id", async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  try {
    const id = c.req.param("id");

    // Optional: Get userId for previewing drafts
    let userId: string | undefined;
    const authHeader = c.req.header("Authorization") || "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const isUserVerified = await verify(token, c.env.JWT_SECRET, "HS256");
        userId = isUserVerified.id as string;
      } catch (e) {
        // Token invalid, continue as guest
      }
    }

    // First check if article exists at all
    const basePost = await prisma.post.findUnique({
      where: { id },
      select: { published: true, authorId: true }
    });

    if (!basePost) {
      c.status(404);
      return c.json({ err: "Article not found" });
    }

    // Handle accessibility
    const isAuthor = userId === basePost.authorId;
    if (!basePost.published && !isAuthor) {
      c.status(403);
      return c.json({ 
        err: "This is a private blog", 
        isPrivate: true 
      });
    }

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json({ article: post });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});



articleRouter.get("/search", async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const query = c.req.query("q") || "";
  const page = parseInt(c.req.query("p") || "1");
  const limit = parseInt(c.req.query("l") || "6");
  const skip = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    });

    const totalPosts = await prisma.post.count({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return c.json({ 
      posts, 
      number_of_posts: posts.length,
      total_posts: totalPosts,
      has_more: skip + posts.length < totalPosts
    });
  } catch (e) {
    c.status(500);
    return c.json({ err: "Search failed" });
  }
});

// Middleware for Authenticated Routes
articleRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization") || "";
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      c.status(403);
      return c.json({ err: "Invalid token" });
    }
    const token = authHeader.split(" ")[1];
    const isUserVerified = await verify(token, c.env.JWT_SECRET, "HS256");
    if (isUserVerified) {
      c.set("userId", isUserVerified.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ err: "user is not authenticated" });
    }
  } catch (e) {
    c.status(500);
    return c.json({ err: "Session expired or invalid token" });
  }
});

// Protected Routes
articleRouter.post("/", zValidator("json", createArticleSchema), async (c) => {
  const authorId = c.get("userId");
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  try {
    const body = c.req.valid("json");
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? false,
        authorId: authorId,
      },
    });
    return c.json({ id: post.id });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});

articleRouter.put("/:id", zValidator("json", updateArticleSchema), async (c) => {
  const userId = c.get("userId");
  const prisma = createPrismaClient(c.env.DATABASE_URL);

  try {
    const id = c.req.param("id");
    const body = c.req.valid("json");

    // Authorization check: Verify ownership
    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true }
    });

    if (!existingPost) {
      c.status(404);
      return c.json({ err: "Article not found" });
    }

    if (existingPost.authorId !== userId) {
      c.status(401);
      return c.json({ err: "Unauthorized: You can only edit your own articles" });
    }

    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    return c.json({ edited: post });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});


articleRouter.delete("/:id", async (c) => {
  const userId = c.get("userId");
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  try {
    const id = c.req.param("id");

    // Authorization check: Verify ownership
    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true }
    });

    if (!existingPost) {
      c.status(404);
      return c.json({ err: "Article not found" });
    }

    if (existingPost.authorId !== userId) {
      c.status(401);
      return c.json({ err: "Unauthorized: You can only delete your own articles" });
    }

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
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const page = parseInt(c.req.query("p") || "1");
  const limit = parseInt(c.req.query("l") || "6");
  const skip = (page - 1) * limit;

  try {
    const authorId = c.get("userId");
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    });

    const totalPosts = await prisma.post.count({
      where: { authorId: authorId }
    });

    return c.json({ 
      posts: posts, 
      number_of_posts: posts.length,
      total_posts: totalPosts,
      has_more: skip + posts.length < totalPosts
    });
  } catch (e) {
    c.status(411);
    return c.json({ err: e });
  }
});

