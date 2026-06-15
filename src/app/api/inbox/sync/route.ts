import { corsair } from "@/server/corsair";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const emails = await corsair.gmail.api.messages.list({
    maxResults: 20,
  });

  await Promise.all(
    (emails.messages ?? [])
      .filter((message) => message.id)
      .map(async (message) => {
        const email = await corsair.gmail.api.messages.get({
          id: message.id!,
          format: "full",
        });

        const headers = email.payload?.headers ?? [];

        await prisma.email.upsert({
          where: {
            id: message.id,
          },
          update: {
            subject:
              headers.find((h) => h.name === "Subject")?.value ?? "No subject",

            from: headers.find((h) => h.name === "From")?.value ?? "Unknown",

            snippet: email.snippet ?? "",

            body: JSON.stringify(email),
          },
          create: {
            id: message.id!,

            subject:
              headers.find((h) => h.name === "Subject")?.value ?? "No subject",

            from: headers.find((h) => h.name === "From")?.value ?? "Unknown",

            snippet: email.snippet ?? "",

            body: JSON.stringify(email),
          },
        });
      }),
  );

  return Response.json({
    success: true,
  });
}
