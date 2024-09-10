import { z } from "zod";

export const ParticipantSchema = z.object({
  eventId: z.string().min(5).openapi({}),
  userId: z.string().min(5).openapi({}),
  isPaid: z.boolean().openapi({}),
});
