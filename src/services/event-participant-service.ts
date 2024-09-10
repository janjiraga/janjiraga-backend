import { z } from "zod";
import { prisma } from "../libs/db";
import { EventParticipantSchema } from "../schemas/event-participant-schema";

export const createEventParticipant = async (
  body: z.infer<typeof EventParticipantSchema>
) => {
  try {
    // Ensure the participant exists
    const participant = await prisma.participant.findUnique({
      where: { id: body.participantId },
    });

    if (!participant) {
      throw new Error("Participant not found");
    }

    // Ensure the event exists
    const event = await prisma.event.findUnique({
      where: { id: body.eventId },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    // Create the EventParticipant record
    const newEventParticipant = await prisma.eventParticipant.create({
      data: {
        eventId: body.eventId,
        participantId: body.participantId,
        userId: body.userId,
      },
    });

    return newEventParticipant;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
