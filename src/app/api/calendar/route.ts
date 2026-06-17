import { auth } from "@/auth";
import { corsair } from "@/server/corsair";

export async function GET() {
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

  const tenant = corsair.withTenant(userId);

  const now = new Date();

  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  const events = await tenant.googlecalendar.api.events.getMany({
    calendarId: "primary",
    timeMin: now.toISOString(),
    timeMax: nextWeek.toISOString(),
  });

  const meetings =
    events.items?.map((event) => ({
      id: event.id,
      summary: event.summary ?? "Untitled Meeting",
      description: event.description ?? "",
      location: event.location ?? "No location",
      start: event.start?.dateTime ?? event.start?.date,
      end: event.end?.dateTime ?? event.end?.date,
      attendees: event.attendees ?? [],
    })) ?? [];

  return Response.json(meetings);
}
