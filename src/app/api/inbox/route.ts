import { prisma } from "@/lib/prisma";

export async function GET() {
  const emails = await prisma.email.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      subject: true,
      from: true,
      snippet: true,
    },
  });

  return Response.json(emails);
}
