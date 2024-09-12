import { OpenAPIHono, z } from "@hono/zod-openapi";
import { checkUserToken } from "../middleware/check-user-token";
import {
  ParticipantSchema,
  ParticipantIdSchema,
} from "../schemas/participant-schema";
import { participantService } from "../services";

type Bindings = {
  TOKEN: string;
};

type Variables = {
  user: {
    id: string;
  };
};

export type HonoApp = { Bindings: Bindings; Variables: Variables };

const apiTags = ["Participant"];

export const participantRoute = new OpenAPIHono<HonoApp>();

participantRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

participantRoute.openapi(
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
            schema: ParticipantSchema,
          },
        },
      },
    },
    description: "Join an event.",
    responses: {
      200: {
        description: "Successfully join an event.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const body: z.infer<typeof ParticipantSchema> = await c.req.json();
    const newEvent = await participantService.createParticipant({
      ...body,
    });

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

participantRoute.openapi(
  {
    method: "get",
    path: "/{id}",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    request: {
      params: ParticipantIdSchema,
    },
    description: "Get participant by id.",
    responses: {
      200: {
        description: "Successfully get participant by id.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const participant = await participantService.getParticipantById(id);

    return c.json({
      code: 200,
      status: "success",
      participant,
    });
  }
);

participantRoute.openapi(
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
      params: ParticipantIdSchema,
    },
    description: "Delete participant by ID.",
    responses: {
      200: {
        description: "Successfully delete participant.",
      },
      404: {
        description: "Participant not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const targetParticipant = await participantService.getParticipantById(id);

    if (!targetParticipant) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Participant not found.",
        },
        404
      );
    }

    const deletedParticipant = await participantService.deleteParticipantById(
      targetParticipant.id
    );

    return c.json(
      {
        code: 200,
        status: "success",
        message: `Participant with ID ${deletedParticipant.id} has been deleted.`,
        deletedParticipant,
      },
      200
    );
  }
);
