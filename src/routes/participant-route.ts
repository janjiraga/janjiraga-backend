import { OpenAPIHono, z } from "@hono/zod-openapi";
import { checkUserToken } from "../middleware/check-user-token";
import { ParticipantSchema } from "../schemas/participant-schema";
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

const apiTags = ["Event"];

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
