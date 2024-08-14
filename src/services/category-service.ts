import { z } from "zod";
import { prisma } from "../libs/db";
import { CategorySchema } from "../schemas/category-schema";

export const getAll = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (body: z.infer<typeof CategorySchema>) => {
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

export const getById = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const update = async (
  id: string,
  body: z.infer<typeof CategorySchema>
) => {
  try {
    const { name } = body;

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });

    return updatedCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteById = async (id: string) => {
  try {
    return await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
