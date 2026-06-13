import { corsair } from "../src/server/corsair";

async function main() {
  const now = new Date();

  const tomorrowStart = new Date(now);
  tomorrowStart.setDate(now.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setHours(23, 59, 59, 999);

  const events = await corsair.googlecalendar.api.events.getMany({
    calendarId: "primary",
    timeMin: tomorrowStart.toISOString(),
    timeMax: tomorrowEnd.toISOString(),
  });

  console.log(JSON.stringify(events, null, 2));
}

main().catch(console.error);
