import { z } from "zod";

export const EventQueryParameterSchema = z.object({
  page: z
    .string()
    .min(1)
    .openapi({ param: { name: "page", in: "query" }, example: "1" })
    .optional(),
  limit: z
    .string()
    .min(1)
    .openapi({ param: { name: "limit", in: "query" }, example: "8" })
    .optional(),
  q: z
    .string()
    .min(1)
    .openapi({ param: { name: "q", in: "query" }, example: "Mabar badminton" })
    .optional(),
});
