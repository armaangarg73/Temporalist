import { corsair } from "@/server/corsair";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { decode } from "he";

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

  const emails = await tenant.gmail.api.messages.list({
    maxResults: 20,
  });

  await Promise.all(
    (emails.messages ?? [])
      .filter((message) => message.id)
      .map(async (message) => {
        const email = await tenant.gmail.api.messages.get({
          id: message.id!,
          format: "full",
        });

        const headers = email.payload?.headers ?? [];

        const subject = decode(
          headers.find((h) => h.name === "Subject")?.value ?? "No subject",
        );

        const from = decode(
          headers.find((h) => h.name === "From")?.value ?? "Unknown",
        );

        const snippet = decode(email.snippet ?? "");

        await prisma.email.upsert({
          where: {
            id: message.id!,
          },
          update: {
            userId,
            subject,
            from,
            snippet,
            body: JSON.stringify(email),
          },
          create: {
            id: message.id!,
            userId,
            subject,
            from,
            snippet,
            body: JSON.stringify(email),
          },
        });
      }),
  );

  return Response.json({
    success: true,
  });
}
