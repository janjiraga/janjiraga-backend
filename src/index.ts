import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { z } from "zod";
import { prisma } from "../src/libs/db";
import { eventRoute } from "./routes/event-route";
import { categoryRoute } from "./routes";

const description =
  "Janjiraga is a social platform designed to bring together sports enthusiasts who share the same passion.";
const app = new OpenAPIHono();

app.use("/*", cors());

app.onError((err, c) => {
  return c.json(
    {
      code: 500,
      status: "error",
      message: err.message,
    },
    500
  );
});

app.route("/events", eventRoute);
app.route("/categories", categoryRoute);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
    description,
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

app.get("/", (c) => {
  return c.json({
    description,
    ui: "/ui",
  });
});

export default app;
