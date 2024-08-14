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
  categoryId: z
    .string()
    .min(5)
    .openapi({ example: "clzsph7z40001huttely72d92" }),
  venueName: z
    .string()
    .min(5)
    .openapi({ example: "Gelora Bung Karno Main Stadium" }),
  venueAddress: z.string().min(5).openapi({
    example:
      "Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270",
  }),
  latitude: z.string().openapi({ example: "-6.2172335" }),
  longitude: z.string().openapi({ example: "106.7989901" }),
  maxParticipants: z.number().int().positive().openapi({ example: 30 }),
  dateTimeStart: z
    .string()
    .datetime()
    .openapi({ example: "2024-08-21T07:00:00Z" }),
  dateTimeEnd: z
    .string()
    .datetime()
    .openapi({ example: "2024-08-21T09:00:00Z" }),
});

export const EventIdSchema = z.object({
  id: z.string().min(5).openapi({ example: "clzt8isvb0001gktlplgahqay" }),
});
