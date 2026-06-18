import { corsair } from "@/server/corsair";

export async function syncCalendar(userId: string) {
  const tenant = corsair.withTenant(userId);

  const events = await tenant.googlecalendar.api.events.getMany({
    calendarId: "primary",
    maxResults: 20,
    singleEvents: true,
    orderBy: "startTime",
  });

  return events.items ?? [];
}
