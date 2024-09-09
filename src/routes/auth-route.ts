import { OpenAPIHono } from "@hono/zod-openapi";
import { authService } from "../services";
import { RegisterSchema, LoginSchema } from "../schemas/auth-schema";
import { checkUserToken } from "../middleware/check-user-token";

type Bindings = {
  TOKEN: string;
};

type Variables = {
  user: {
    id: string;
  };
};

export type HonoApp = { Bindings: Bindings; Variables: Variables };

const apiTags = ["Auth"];

export const authRoute = new OpenAPIHono<HonoApp>();

authRoute.openapi(
  {
    method: "post",
    path: "/register",
    description: "Register a new user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: RegisterSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successful registration",
      },
      400: {
        description: "Username already exists",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    try {
      await authService.register(await c.req.json());

      return c.json({
        message: "Success",
      });
    } catch (error) {
      return c.json(
        {
          message: (error as Error).message,
        },
        400
      );
    }
  }
);

authRoute.openapi(
  {
    method: "post",
    path: "/login",
    description: "Login with username and password",
    request: {
      body: {
        content: {
          "application/json": {
            schema: LoginSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Login successful",
      },
      400: {
        description: "Username or password is incorrect",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    try {
      const token = await authService.login(await c.req.json());

      return c.json({
        message: "Success",
        data: {
          token,
        },
      });
    } catch (error) {
      return c.json(
        {
          message: (error as Error).message,
        },
        400
      );
    }
  }
);

authRoute.openapi(
  {
    method: "get",
    path: "/my-profile",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    description: "Get current user profile",
    responses: {
      200: {
        description: "Successfully get current user profile.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    try {
      const user = c.get("user") as { id: string };

      const userData = await authService.getUserProfile(user?.id);

      return c.json(
        {
          message: "Success",
          data: userData,
        },
        200
      );
    } catch (error) {
      return c.json(
        {
          message: (error as Error).message,
        },
        400
      );
    }
  }
);
