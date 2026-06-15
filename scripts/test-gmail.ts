import { corsair } from "../src/server/corsair";

async function main() {
  const emails = await corsair.gmail.api.messages.list({
    maxResults: 10
  });

  const id = emails.messages?.[0]?.id;

  if (!id) {
    console.log("No unread emails");
    return;
  }

  const email = await corsair.gmail.api.messages.get({
    id,
    format: "full",
  });

  const headers = email.payload?.headers ?? [];

  const subject =
    headers.find((h) => h.name === "Subject")?.value ?? "No Subject";

  const from =
    headers.find((h) => h.name === "From")?.value ?? "Unknown Sender";

  console.log({
    from,
    subject,
    snippet: email.snippet,
  });
}

main().catch(console.error);
