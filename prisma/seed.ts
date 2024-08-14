import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { dataCategories } from "./data/categories";
import { dataEvents } from "./data/events";

async function main() {
  for (const category of dataCategories) {
    const newCategoryResult = await prisma.category.upsert({
      where: { name: category.name },
      update: category,
      create: category,
    });
    console.info(`🆕 Category: ${newCategoryResult.name}`);
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
