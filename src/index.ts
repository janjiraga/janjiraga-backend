import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { z } from "zod";
import { prisma } from "../src/libs/db";

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

// basic route
// ------ added code -------
const basicRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            description: z.string(),
            ui: z.string(),
          }),
        },
      },
      description: "say hello",
    },
  },
});

app.openapi(basicRoute, (c) => {
  return c.json({ description, ui: "/ui" }, 200);
});
// ------ end added code -------

const eventRoute = createRoute({
  method: "get",
  path: "/events",
  description: "Get all events",
  responses: {
    200: {
      description: "Successfully get all events",
    },
  },
});
app.openapi(eventRoute, (c) => {
  const events = prisma.event.findMany();
  return c.json(events, 200);
});

// The openapi.json will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
    description,
  },
});

// swagger ui doc will be available at {server url}/ui
// fell free to change the url
// swaggerUI url must have same path as openapi.json
app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
