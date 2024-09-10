import { OpenAPIHono, z } from "@hono/zod-openapi";
import { checkUserToken } from "../middleware/check-user-token";
import { EventParticipantSchema } from "../schemas/event-participant-schema";
import { eventParticipantService } from "../services";

type Bindings = {
  TOKEN: string;
};

type Variables = {
  user: {
    id: string;
  };
};

export type HonoApp = { Bindings: Bindings; Variables: Variables };

const apiTags = ["Event"];

export const eventParticipantRoute = new OpenAPIHono<HonoApp>();

eventParticipantRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

eventParticipantRoute.openapi(
  {
    method: "post",
    path: "/",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    description: "Join an event.",
    responses: {
      200: {
        description: "Successfully join an event.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const body: z.infer<typeof EventParticipantSchema> = await c.req.json();
    const newEvent = await eventParticipantService.create({
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
