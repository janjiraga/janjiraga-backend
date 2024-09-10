import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import {
  categoryRoute,
  eventRoute,
  authRoute,
  venueRoute,
  eventParticipantRoute,
  participantRoute,
} from "./routes";

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

app.route("/auth", authRoute);
app.route("/categories", categoryRoute);
app.route("/venues", venueRoute);
app.route("/events", eventRoute);
app.route("/event-participants", eventParticipantRoute);
app.route("/participants", participantRoute);

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
