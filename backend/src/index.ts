import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { articleRouter } from "./routes/articles";
import { envVars } from "./types";
import { cors } from "hono/cors";
// Create the main Hono app
const app = new Hono<envVars>();

app.route("/api/article", articleRouter);
app.route("/api/user", userRouter);

app.notFound((c) => {
  c.status(404);
  return c.json({
    Error: "Invalid API route, please check the address",
  });
});

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.options("*", (c) => {
  return c.text("", 204);
});
export default app;
