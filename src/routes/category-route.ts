import { OpenAPIHono, z } from "@hono/zod-openapi";
import { categoryService } from "../services";
import { CategoryIdSchema, CategorySchema } from "../schemas/category-schema";

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
            schema: CategorySchema,
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
    const body: z.infer<typeof CategorySchema> = await c.req.json();
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

categoryRoute.openapi(
  {
    method: "put",
    path: "/{id}",
    request: {
      params: CategoryIdSchema,
      body: {
        content: {
          "application/json": {
            schema: CategorySchema,
          },
        },
      },
    },
    description: "Update category by id.",
    responses: {
      201: {
        description: "Successfully update category.",
      },
      404: {
        description: "Category not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const targetCategory = categoryService.getById(id);

    if (!targetCategory) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Product not found.",
        },
        404
      );
    }

    const body: z.infer<typeof CategorySchema> = await c.req.json();
    const updatedCategory = await categoryService.update(id, body);

    return c.json(
      {
        code: 201,
        status: "success",
        updatedCategory,
      },
      201
    );
  }
);
