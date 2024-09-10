import { z } from "zod";
import { prisma } from "../libs/db";
import { EventParticipantSchema } from "../schemas/event-participant-schema";

export const create = async (body: z.infer<typeof EventParticipantSchema>) => {
  try {
    const newParticipant = await prisma.eventParticipant.create({
      data: {
        ...body,
      },
    });
    return newParticipant;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
