import { z } from "zod";
export const VenueSchema = z.object({
  name: z
    .string()
    .min(5)
    .openapi({ example: "Gelora Bung Karno Main Stadium" }),
  slug: z
    .string()
    .min(5)
    .openapi({ example: "gelora-bung-karno-main-stadium" }),
  address: z.string().min(5).openapi({
    example:
      "Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270",
  }),
  imageUrl: z.string().url().openapi({
    example:
      "https://lh3.googleusercontent.com/p/AF1QipNoNWkYp1CqB4BKDQ9lXPVChQcYGzxTrNgOARfL=s680-w680-h510",
  }),
  latitude: z.number().openapi({ example: -6.2185912 }),
  longitude: z.number().openapi({ example: 106.8026347 }),
  mapsUrl: z
    .string()
    .url()
    .openapi({ example: "https://maps.app.goo.gl/u54acCexufu5eGXF9" }),
  zoomLevel: z.number().openapi({ example: 15 }),
});

export const VenueIdSchema = z.object({
  id: z.string().min(5).openapi({ example: "cm0afwxpl0008mthgynlrw7p9" }),
});
