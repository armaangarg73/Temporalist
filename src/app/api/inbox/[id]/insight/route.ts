import {prisma} from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const insight = await prisma.emailInsight.findUnique({
    where: {
      emailId: id,
    },
  });

  return Response.json({
    summary: insight?.summary ?? "",
    reply: insight?.reply ?? "",
    tasks: insight?.tasks ?? [],
  });
}
