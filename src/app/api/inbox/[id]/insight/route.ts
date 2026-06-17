import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const userId = session.user.id;

  const { id } = await params;

  const insight = await prisma.emailInsight.findUnique({
    where: {
      userId_emailId: {
        userId: userId,
        emailId: id,
      },
    },
  });

  return Response.json({
    summary: insight?.summary ?? "",
    reply: insight?.reply ?? "",
    tasks: insight?.tasks ?? [],
  });
}
