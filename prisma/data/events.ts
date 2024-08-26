import { generateSlug } from "../../src/libs/slugify";
export const dataEvents = [
  {
    slug: generateSlug("Trofeo Persib"),
    name: "Trofeo Persib",
    price: 100000,
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipPXIjnm1txU40MU3fK3rnRM1yQf9d9OWA_SMTVc=s680-w680-h510",
    description: "Main bola bareng pemain Persib Bandung",
    maxParticipants: 20,
    dateTimeStart: new Date("2024-08-31T07:00:00Z"),
    dateTimeEnd: new Date("2024-08-31T09:00:00Z"),
    categoryId: "cm0ahuiod00019sl65ccwaqmc",
    venueId: "cm0ahuizs00089sl6zjkmn8yx",
    userId: "cm0ahxq2w0004ccelkeo72yvo",
  },
  {
    slug: generateSlug("Weekend Fun Futsal"),
    name: "Weekend Fun Futsal",
    price: 50000,
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNsgF60TY8bYQLWnbQuBbMYl_hZ_BUdgpYfyCvM=s680-w680-h510",
    description:
      "Lapangan sudah di Booking 2 Jam Just for Fun - Cari Keringet haha",
    maxParticipants: 20,
    dateTimeStart: new Date("2024-08-31T07:00:00Z"),
    dateTimeEnd: new Date("2024-08-31T09:00:00Z"),
    categoryId: "cm0ahuiqt00049sl60ggeizsu",
    venueId: "cm0ahuj45000a9sl6q1o0ec3r",
    userId: "cm0ahxq2w0004ccelkeo72yvo",
  },
];
