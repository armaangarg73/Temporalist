import { corsair } from "@/server/corsair";

export async function getExecutiveBriefData() {
  const emails = await corsair.gmail.api.messages.list({
    maxResults: 5,
  });

  const emailSummaries = [];

  for (const message of emails.messages ?? []) {
    if (!message.id) {
      continue;
    }

    const email = await corsair.gmail.api.messages.get({
      id: message.id,
      format: "full",
    });

    const headers = email.payload?.headers ?? [];

    const subject =
      headers.find((h) => h.name == "Subject")?.value ?? "No subject";
    const from =
      headers.find((h) => h.name === "From")?.value ?? "Unknown Sender";

    emailSummaries.push({
      from,
      subject,
      snippet: email.snippet,
    });
  }

  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const start = new Date(tomorrow);
  start.setHours(0, 0, 0, 0);

  const end = new Date(tomorrow);
  end.setHours(23, 59, 59, 999);

  const events = await corsair.googlecalendar.api.events.getMany({
    calendarId: "primary",
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
  });

  return {
    emails: emailSummaries,
    events,
  };
}
