import { prisma } from "../libs/db";
import { z } from "zod";
import { ParticipantSchema } from "../schemas/participant-schema";

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
  } catch (error) {
    console.error(error);
    throw error;
  }
};
