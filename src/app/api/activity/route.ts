import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const { searchParams } = new URL(req.url);

  const limit = Number(searchParams.get("limit") ?? 5);

  const activities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return Response.json(activities);
}
