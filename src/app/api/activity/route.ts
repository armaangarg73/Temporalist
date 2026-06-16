import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = searchParams.get("limit");

  const activities = await prisma.activity.findMany({
    take: limit ? Number(limit) : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(activities);
}
