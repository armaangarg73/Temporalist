import { prisma } from "../src/lib/prisma";

async function main() {
  const activity = await prisma.activity.create({
    data: {
      type: "test",
      title: "Activity System Working",
      description: "First activity inserted",
    },
  });

  console.log(activity);
}

main().catch(console.error);
