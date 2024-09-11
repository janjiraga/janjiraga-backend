import { prisma } from "../libs/db";
import { z } from "zod";
import { ParticipantSchema } from "../schemas/participant-schema";

type ErrorResponse = {
  error: string;
};

export const createParticipant = async (
  body: z.infer<typeof ParticipantSchema>
) => {
  try {
    // Ensure the user and event exist
    const user = await prisma.user.findUnique({ where: { id: body.userId } });
    const event = await prisma.event.findUnique({
      where: { id: body.eventId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!event) {
      throw new Error("Event not found");
    }

    // Create the Participant
    const newParticipant = await prisma.participant.create({
      data: {
        userId: body.userId,
        eventId: body.eventId,
        isPaid: body.isPaid,
      },
    });

    return newParticipant;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("User has already joined this event");
    }
    console.error(error);
    throw error;
  }
};

export const getParticipantById = async (id: string) => {
  try {
    const event = await prisma.participant.findUnique({
      where: { id },
      include: {
        event: true,
      },
    });
    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteParticipantById = async (id: string) => {
  return await prisma.participant.delete({
    where: { id },
  });
};

export const updateParticipantById = async (
  id: string,
  body: z.infer<typeof ParticipantSchema>
) => {
  try {
    const updatedParticipant = await prisma.participant.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return updatedParticipant;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
