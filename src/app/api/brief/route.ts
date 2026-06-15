import { prisma } from "@/lib/prisma";

export async function GET() {
  const brief = await prisma.executiveBrief.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(
    brief?.data ?? {
      emails: [],
      meetings: [],
      urgentItems: [],
      recommendedActions: [],
    },
  );
}
