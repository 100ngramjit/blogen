import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("User-Agent"));

  return c.json({ msg: "Hello Hono!" });
});

export default app;
