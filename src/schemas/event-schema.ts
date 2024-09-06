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
    .openapi({ param: { name: "q", in: "query" }, example: "" })
    .optional(),
});

export const EventSchema = z.object({
  name: z.string().min(5).openapi({ example: "Fun Football GBK" }),
  slug: z.string().min(5).openapi({ example: "fun-football-gbk" }),
  price: z.number().int().positive().openapi({ example: 100000 }),
  imageUrl: z.string().url().openapi({
    example:
      "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?q=80&w=1559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }),
  description: z
    .string()
    .min(5)
    .openapi({ example: "Buat yang suka bola merapat sini" }),
  maxParticipants: z.number().int().positive().openapi({ example: 30 }),
  dateTimeStart: z
    .string()
    .datetime()
    .openapi({ example: "2024-08-21T07:00:00Z" }),
  dateTimeEnd: z
    .string()
    .datetime()
    .openapi({ example: "2024-08-21T09:00:00Z" }),
  categoryId: z.string().openapi({ example: "cm0afwxnl0001mthg44x5nbxw" }),
  userId: z.string().openapi({ example: "cm0afvp7k0000ofg4gph6il5r" }),
  venueId: z.string().openapi({ example: "cm0afwxpl0008mthgynlrw7p9" }),
});

export const EventIdSchema = z.object({
  id: z.string().min(5).openapi({ example: "clzt8isvb0001gktlplgahqay" }),
});

export const EventSlugSchema = z.object({
  slug: z.string().min(5).openapi({ example: "" }),
});
