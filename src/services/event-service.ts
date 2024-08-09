import { prisma } from "../libs/db";

export const getAll = async () => {
  try {
    const events = prisma.event.findMany();
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
