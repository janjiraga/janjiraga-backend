import { OpenAPIHono, z } from "@hono/zod-openapi";
import { eventService } from "../services";
import {
  EventSchema,
  EventIdSchema,
  EventQueryParameterSchema,
} from "../schemas/event-schema";
import { checkUserToken } from "../middleware/check-user-token";

const apiTags = ["Event"];

export const eventRoute = new OpenAPIHono();

eventRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

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
    method: "get",
    path: "/{id}",
    request: {
      params: EventIdSchema,
    },
    description: "Get event by ID.",
    responses: {
      200: {
        description: "Successfully get event.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;
    const event = await eventService.getById(id);

    return c.json({
      code: 200,
      status: "success",
      data: event,
    });
  }
);

eventRoute.openapi(
  {
    method: "post",
    path: "/",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
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
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
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

eventRoute.openapi(
  {
    method: "put",
    path: "/{id}",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    request: {
      params: EventIdSchema,
      body: {
        content: {
          "application/json": {
            schema: EventSchema,
          },
        },
      },
    },
    description: "Update event by id.",
    responses: {
      201: {
        description: "Successfully update event.",
      },
      404: {
        description: "Event not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
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

    const body: z.infer<typeof EventSchema> = await c.req.json();
    const updatedEvent = await eventService.update(id, body);

    return c.json(
      {
        code: 201,
        status: "success",
        updatedEvent,
      },
      201
    );
  }
);
