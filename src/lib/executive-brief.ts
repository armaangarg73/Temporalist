import { corsair } from "@/server/corsair";

export async function getExecutiveBriefData(userId: string) {

  const tenant = corsair.withTenant(userId);

  const emails = await tenant.gmail.api.messages.list({
    maxResults: 5,
  });

  const emailSummaries = [];

  for (const message of emails.messages ?? []) {
    if (!message.id) continue;

    const email = await tenant.gmail.api.messages.get({
      id: message.id,
      format: "full",
    });

    const headers = email.payload?.headers ?? [];

    const subject =
      headers.find((h) => h.name === "Subject")?.value ?? "No subject";

    const from =
      headers.find((h) => h.name === "From")?.value ?? "Unknown Sender";

    emailSummaries.push({
      from,
      subject,
      snippet: email.snippet,
    });
  }

const events = await tenant.googlecalendar.api.events.getMany({
  calendarId: "primary",
  singleEvents: true,
  orderBy: "startTime",
  maxResults: 10,
});

  return {
    emails: emailSummaries,
    events,
  };
}
