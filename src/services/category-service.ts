import { z } from "zod";
import { prisma } from "../libs/db";
import { CreateCategorySchema } from "../schemas/category-schema";

export const getAll = async () => {
  try {
    const categories = prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (body: z.infer<typeof CreateCategorySchema>) => {
  try {
    const { name } = body;
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    return newCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
