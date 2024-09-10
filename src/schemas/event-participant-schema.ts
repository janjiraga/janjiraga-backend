import { z } from "zod";

export const EventParticipantSchema = z.object({
  eventId: z.string().min(5).openapi({ example: "Fun Football GBK" }),
  userId: z.string().min(5).openapi({ example: "Fun Football GBK" }),
  participantId: z.string().min(5).openapi({ example: "Fun Football GBK" }),
});
