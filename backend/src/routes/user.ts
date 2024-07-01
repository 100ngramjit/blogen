import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { envVars } from "../types";

export const userRouter = new Hono<envVars>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign(
      { id: user.id, email: body.email },
      c.env.JWT_SECRET
    );
    return c.json({
      token,
      name: body.name,
    });
  } catch (e) {
    c.status(403);
    return c.json({ err: e });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (user) {
      const jwtResponse = await sign(
        {
          email: body.email,
          id: user?.id,
        },
        c.env.JWT_SECRET
      );
      return c.json({ token: jwtResponse, name: user.name });
    }
    return c.json({ msg: "The email or password provided is wrong" });
  } catch (e) {
    c.status(403);
    return c.json({ err: e });
  }
});
