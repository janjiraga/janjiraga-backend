import { OpenAPIHono, z } from "@hono/zod-openapi";
import { venueService } from "../services";
import { VenueIdSchema, VenueSchema } from "../schemas/venue-schema";

const apiTags = ["Venue"];

export const venueRoute = new OpenAPIHono();

venueRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

venueRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all venue.",
    responses: {
      200: {
        description: "Successfully get all venue.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const venues = await venueService.getAll();

    return c.json({
      code: 200,
      status: "success",
      data: venues,
    });
  }
);

venueRoute.openapi(
  {
    method: "get",
    path: "/{id}",
    request: {
      params: VenueIdSchema,
    },
    description: "Get venue by id.",
    responses: {
      200: {
        description: "Successfully get venue by id.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const venue = await venueService.getById(id);

    return c.json({
      code: 200,
      status: "success",
      venue,
    });
  }
);

venueRoute.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: VenueSchema,
          },
        },
      },
    },
    description: "Create new venue",
    responses: {
      201: {
        description: "Successfully create new venue.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const body: z.infer<typeof VenueSchema> = await c.req.json();
    const newVenue = await venueService.create(body);

    return c.json(
      {
        code: 201,
        status: "success",
        newVenue,
      },
      201
    );
  }
);

venueRoute.openapi(
  {
    method: "put",
    path: "/{id}",
    request: {
      params: VenueIdSchema,
      body: {
        content: {
          "application/json": {
            schema: VenueSchema,
          },
        },
      },
    },
    description: "Update venue by id.",
    responses: {
      201: {
        description: "Successfully update venue.",
      },
      404: {
        description: "Venue not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const targetVenue = await venueService.getById(id);

    if (!targetVenue) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Venue not found.",
        },
        404
      );
    }

    const body: z.infer<typeof VenueSchema> = await c.req.json();
    const updatedVenue = await venueService.update(id, body);

    return c.json(
      {
        code: 201,
        status: "success",
        updatedVenue,
      },
      201
    );
  }
);

venueRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    request: {
      params: VenueIdSchema,
    },
    description: "Delete venue by ID.",
    responses: {
      200: {
        description: "Successfully delete venue.",
      },
      404: {
        description: "Venue not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const targetVenue = await venueService.getById(id);

    if (!targetVenue) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Venue not found.",
        },
        404
      );
    }

    const deletedVenue = await venueService.deleteById(targetVenue.id);

    return c.json(
      {
        code: 200,
        status: "success",
        message: `Venue with ID ${deletedVenue.id} has been deleted.`,
        deletedVenue,
      },
      200
    );
  }
);
