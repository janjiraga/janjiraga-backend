import { OpenAPIHono } from "@hono/zod-openapi";
import { eventService } from "../services";
import { EventQueryParameterSchema } from "../schemas/event-schema";

const apiTags = ["Event"];

export const eventRoute = new OpenAPIHono();

eventRoute.openapi(
  {
    method: "get",
    path: "/",
    request: {
      query: EventQueryParameterSchema,
    },
    description: "Get all events.",
    responses: {
      200: {
        description: "Successfully get all events.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const page = c.req.query("page");
    const limit = c.req.query("limit");
    const q = c.req.query("q");
    const eventList = await eventService.getAll(page, limit, q);

    return c.json({
      code: 200,
      status: "success",
      data: eventList,
    });
  }
);
