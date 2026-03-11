import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

import { Hono } from "hono";
import { sign } from "hono/jwt";
import { envVars } from "../types";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<envVars>();

userRouter.post("/signup", async (c) => {
  const pool = new Pool({ connectionString: c.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  try {
    const body = await c.req.json();
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
  } catch (e) {
    c.status(403);
    return c.json({ err: e });
  }
});

userRouter.post("/signin", async (c) => {
  const pool = new Pool({ connectionString: c.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  const body = await c.req.json();
  try {
    console.log(body);
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    console.log(user);
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
    return c.json({ msg: "The email or password provided is wrong" });
  } catch (e: any) {
    c.status(403);
    console.error("Prisma Error Details", e.message || e);
    return c.json({ err: e, message: e?.message });
  }
});
