import { OpenAPIHono, z } from "@hono/zod-openapi";
import { eventService } from "../services";
import {
  EventQueryParameterSchema,
  EventSchema,
  EventIdSchema,
} from "../schemas/event-schema";

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

eventRoute.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: EventSchema,
          },
        },
      },
    },
    description: "Create new event",
    responses: {
      201: {
        description: "Successfully create new event.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const body: z.infer<typeof EventSchema> = await c.req.json();
    const newEvent = await eventService.create(body);

    return c.json(
      {
        code: 201,
        status: "success",
        newEvent,
      },
      201
    );
  }
);

eventRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    request: {
      params: EventIdSchema,
    },
    description: "Delete event by ID.",
    responses: {
      200: {
        description: "Successfully delete event.",
      },
      404: {
        description: "Event not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    try {
      const id = c.req.param("id")!;

      const targetEvent = await eventService.getById(id);

      if (!targetEvent) {
        return c.json(
          {
            code: 404,
            status: "error",
            message: "Event not found.",
          },
          404
        );
      }

      const deletedEvent = await eventService.deleteById(targetEvent.id);

      return c.json(
        {
          code: 200,
          status: "success",
          message: `Event with ID ${deletedEvent.id} has been deleted.`,
          deletedEvent,
        },
        200
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
