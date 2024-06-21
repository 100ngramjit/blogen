import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  console.log(body);
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const jwtResponse = await sign(
      {
        user: {
          email: body.email,
        },
      },
      c.env.JWT_SECRET
    );
    return c.json({ token: jwtResponse });
  } catch (e) {
    console.log("caught", e);
    c.status(403);
    return c.json({ err: e });
  }
});

app.post("/api/v1/signin", async (c) => {
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
    const jwtResponse = await sign(
      {
        user: {
          email: body.email,
        },
      },
      c.env.JWT_SECRET
    );
    return c.json({ token: jwtResponse });
  } catch (e) {
    console.log("caught", e);
    c.status(403);
    return c.json({ err: e });
  }
});

// app.get("/api/v1/blog/:id", (c) => {
//   const id = c.req.param("id");
//   console.log(id);
//   return c.text("get blog route");
// });

// app.post("/api/v1/blog", (c) => {
//   return c.text("signin route");
// });

// app.put("/api/v1/blog", (c) => {
//   return c.text("signin route");
// });

export default app;
