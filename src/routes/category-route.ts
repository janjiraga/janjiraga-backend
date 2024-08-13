import { OpenAPIHono, z } from "@hono/zod-openapi";
import { categoryService } from "../services";
import { CreateCategorySchema } from "../schemas/category-schema";

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
    const categories = await categoryService.getAll();

    return c.json({
      code: 200,
      status: "success",
      data: categories,
    });
  }
);

categoryRoute.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateCategorySchema,
          },
        },
      },
    },
    description: "Create new category",
    responses: {
      201: {
        description: "Successfully create new category.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const body: z.infer<typeof CreateCategorySchema> = await c.req.json();
    const newCategory = await categoryService.create(body);

    return c.json(
      {
        code: 201,
        status: "success",
        newCategory,
      },
      201
    );
  }
);
