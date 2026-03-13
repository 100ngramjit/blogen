import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Hono } from "hono";
import { sign } from "hono/jwt";
import { envVars } from "../types";
import bcrypt from "bcryptjs";
import { zValidator } from "@hono/zod-validator";
import { signinSchema, signupSchema } from "../validation/schemas";

export const userRouter = new Hono<envVars>();

const createPrismaClient = (connectionString: string) => {
  if (!connectionString) throw new Error("Missing DATABASE_URL");

  return new PrismaClient({
    accelerateUrl: connectionString,
  }).$extends(withAccelerate());
};

userRouter.post("/signup", zValidator("json", signupSchema), async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  try {
    const body = c.req.valid("json");
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
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
  } catch (e: any) {
    c.status(403);
    console.error("Signup Error:", e.message || e);
    return c.json({ err: e, message: e?.message });
  }
});

userRouter.post("/signin", zValidator("json", signinSchema), async (c) => {
  const prisma = createPrismaClient(c.env.DATABASE_URL);
  const body = c.req.valid("json");
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(body.password, user.password);
      if (passwordMatch) {
        const jwtResponse = await sign(
          {
            email: body.email,
            id: user.id,
          },
          c.env.JWT_SECRET
        );
        return c.json({ token: jwtResponse, name: user.name });
      }
    }
    c.status(401);
    return c.json({ msg: "The email or password provided is wrong" });
  } catch (e: any) {
    c.status(403);
    console.error("Signin Error:", e.message || e);
    return c.json({ err: e, message: e?.message });
  }
});

