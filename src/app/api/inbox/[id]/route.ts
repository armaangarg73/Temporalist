import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;

  const email = await prisma.email.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      subject: true,
      from: true,
      snippet: true,
    },
  });

  if (!email) {
    return Response.json(
      {
        error: "Email not found",
      },
      {
        status: 404,
      },
    );
  }

  return Response.json({
    id: email.id,
    subject: email.subject,
    from: email.from,
    body: email.snippet,
  });
}
