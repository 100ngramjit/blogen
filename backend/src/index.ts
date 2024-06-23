import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { articleRouter } from "./routes/articles";
import { envVars } from "./types";
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

export default app;
