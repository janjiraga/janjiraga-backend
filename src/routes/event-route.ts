import { OpenAPIHono } from "@hono/zod-openapi";
import { eventService } from "../services";

const apiTags = ["Event"];

export const eventRoute = new OpenAPIHono();

eventRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all events.",
    responses: {
      200: {
        description: "Successfully get all events.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const eventList = await eventService.getAll();

    return c.json({
      code: 200,
      status: "success",
      data: eventList,
    });
  }
);
