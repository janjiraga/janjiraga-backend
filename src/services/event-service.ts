import { z } from "zod";
import { prisma } from "../libs/db";
import { EventSchema } from "../schemas/event-schema";

export const getAll = async (
  page: string = "1", // default value page is 1
  limit: string = "8", // default value limit is 8
  q?: string // q is not required
) => {
  try {
    const take = Number(limit);
    const skip = Number(limit) * (Number(page) - 1);

    // take and skip for pagination
    // q for search by name
    const events = prisma.event.findMany({
      take,
      skip,
      where: {
        OR: [
          {
            name: {
              mode: "insensitive",
              contains: q,
            },
          },
          {
            category: {
              name: {
                mode: "insensitive",
                contains: q,
              },
            },
          },
          {
            category: {
              slug: {
                contains: q,
              },
            },
          },
        ],
      },
      include: {
        category: true,
        venue: true,
        user: true,
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (body: z.infer<typeof EventSchema>) => {
  try {
    const newEvent = await prisma.event.create({
      data: {
        ...body,
      },
    });
    return newEvent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getById = async (id: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteById = async (id: string) => {
  return await prisma.event.delete({
    where: { id },
  });
};

export const update = async (id: string, body: z.infer<typeof EventSchema>) => {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return updatedEvent;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
