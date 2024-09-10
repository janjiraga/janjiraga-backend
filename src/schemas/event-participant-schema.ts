import { z } from "zod";

export const EventParticipantSchema = z.object({
  eventId: z.string().min(5).openapi({}),
  userId: z.string().min(5).openapi({}),
  participantId: z.string().min(5).openapi({}),
});
