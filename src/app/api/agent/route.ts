import { prisma } from "@/lib/prisma";

export async function GET() {
  const brief = await prisma.executiveBrief.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const meetings = (brief?.data as any)?.meetings ?? [];
  const emails = (brief?.data as any)?.emails ?? [];
  const urgentItems = (brief?.data as any)?.urgentItems ?? [];
  const recommendedActions = (brief?.data as any)?.recommendedActions ?? [];

  const now = new Date();

  const nextMeeting =
    meetings.find((meeting: any) => {
      const start = meeting.start?.dateTime || meeting.start?.date;

      return start && new Date(start) > now;
    }) ?? null;

  return Response.json({
    emails,
    meetings,
    urgentItems,
    recommendedActions,
    nextMeeting,
  });
}
