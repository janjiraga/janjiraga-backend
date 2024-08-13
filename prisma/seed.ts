import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { dataCategories } from "./data/categories";

async function main() {
  for (const category of dataCategories) {
    const newCategoryResult = await prisma.category.upsert({
      where: { name: category.name },
      update: category,
      create: category,
    });
    console.info(`🆕 Product: ${newCategoryResult.name}`);
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
