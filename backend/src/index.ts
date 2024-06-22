import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/posts";
import { envVars } from "./types";
// Create the main Hono app
const app = new Hono<envVars>();

app.route("/api/post", postRouter);
app.route("/api/user", userRouter);

export default app;
