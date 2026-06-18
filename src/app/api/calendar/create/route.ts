import { auth } from "@/auth";
import { corsair } from "@/server/corsair";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const tenant = corsair.withTenant(session.user.id);

  const event = await tenant.googlecalendar.api.events.create({
    calendarId: "primary",
    event: {
      summary: body.summary,
      description: body.description,
      location: body.location,

      start: {
        dateTime: body.start,
      },

      end: {
        dateTime: body.end,
      },

      attendees:
        body.attendees?.map((email: string) => ({
          email,
        })) ?? [],
    },
  });

  return Response.json(event);
}
