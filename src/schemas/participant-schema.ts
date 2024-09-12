import { z } from "zod";

export const ParticipantSchema = z.object({
  eventId: z.string().min(5).openapi({ example: "cm0afwxpl0008mthgynlrw7p9" }),
  userId: z.string().min(5).openapi({ example: "cm0afwxpl0008mthgynlrw7p9" }),
  isPaid: z.boolean().openapi({ example: false }),
});

export const ParticipantIdSchema = z.object({
  id: z.string().min(5).openapi({ example: "cm0afwxpl0008mthgynlrw7p9" }),
});
