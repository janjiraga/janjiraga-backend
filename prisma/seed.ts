import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { dataCategories } from "./data/categories";
import { dataVenues } from "./data/venues";
import { dataEvents } from "./data/events";

async function main() {
  for (const category of dataCategories) {
    const newCategoryResult = await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    console.info(`🆕 Category: ${newCategoryResult.name}`);
  }

  for (const venue of dataVenues) {
    const newVenueResult = await prisma.venue.upsert({
      where: { slug: venue.slug },
      update: venue,
      create: venue,
    });
    console.info(`🆕 Venue: ${newVenueResult.name}`);
  }

  for (const event of dataEvents) {
    const newEventResult = await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event,
    });
    console.info(`🆕 Event: ${newEventResult.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
