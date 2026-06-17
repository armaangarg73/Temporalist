import { auth } from "@/auth";
import { corsair } from "@/server/corsair";
import { decode } from "he";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tenant = corsair.withTenant(session.user.id);

  console.time("gmail-list");

  const messages = await tenant.gmail.api.messages.list({
    maxResults: 10,
  });


  const emails = await Promise.all(
    (messages.messages ?? [])
      .filter((message) => message.id)
      .map(async (message) => {
        const email = await tenant.gmail.api.messages.get({
          id: message.id!,
          format: "metadata",
        });

        const headers = email.payload?.headers ?? [];

        return {
          id: message.id!,

          subject: decode(
            headers.find((h) => h.name === "Subject")?.value ?? "No Subject",
          ),

          from: decode(
            headers.find((h) => h.name === "From")?.value ?? "Unknown Sender",
          ),

          snippet: decode(email.snippet ?? ""),
        };
      }),
  );


  return Response.json(emails);
}
