import { z } from "zod";
import { prisma } from "../libs/db";
import { VenueSchema } from "../schemas/venue-schema";

export const getAll = async () => {
  try {
    const venues = await prisma.venue.findMany();
    return venues;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async (body: z.infer<typeof VenueSchema>) => {
  try {
    const newVenue = await prisma.venue.create({
      data: {
        ...body,
      },
    });
    return newVenue;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getById = async (id: string) => {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id },
    });
    return venue;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const update = async (id: string, body: z.infer<typeof VenueSchema>) => {
  try {
    const { name } = body;

    const updatedVenue = await prisma.venue.update({
      where: { id },
      data: {
        name,
      },
    });

    return updatedVenue;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteById = async (id: string) => {
  try {
    return await prisma.venue.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
