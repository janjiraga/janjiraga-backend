import { OpenAPIHono, z } from "@hono/zod-openapi";
import { categoryService } from "../services";
import { CategoryIdSchema, CategorySchema } from "../schemas/category-schema";
import { checkUserToken } from "../middleware/check-user-token";

const apiTags = ["Category"];

export const categoryRoute = new OpenAPIHono();

categoryRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

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
    method: "get",
    path: "/{id}",
    request: {
      params: CategoryIdSchema,
    },
    description: "Get category by id.",
    responses: {
      200: {
        description: "Successfully get category by id.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const category = await categoryService.getById(id);

    return c.json({
      code: 200,
      status: "success",
      category,
    });
  }
);

categoryRoute.openapi(
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
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
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

    const targetCategory = await categoryService.getById(id);

    if (!targetCategory) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Category not found.",
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

categoryRoute.openapi(
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
      params: CategoryIdSchema,
    },
    description: "Delete category by ID.",
    responses: {
      200: {
        description: "Successfully delete category.",
      },
      404: {
        description: "Category not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const targetCategory = await categoryService.getById(id);

    if (!targetCategory) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Category not found.",
        },
        404
      );
    }

    const deletedCategory = await categoryService.deleteById(targetCategory.id);

    return c.json(
      {
        code: 200,
        status: "success",
        message: `Category with ID ${deletedCategory.id} has been deleted.`,
        deletedCategory,
      },
      200
    );
  }
);
