import { OpenAPIHono } from "@hono/zod-openapi";

const apiTags = ["Category"];

export const categoryRoute = new OpenAPIHono();

categoryRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all category.",
    responses: {
      200: {
        description: "Successfully get all category.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    return c.json({
      code: 200,
      status: "success",
      data: [],
    });
  }
);
