import { prisma } from "../libs/db";

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
        name: {
          mode: "insensitive",
          contains: q,
        },
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
