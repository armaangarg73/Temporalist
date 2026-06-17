import { auth } from "@/auth";
import { corsair } from "@/server/corsair";
import { decode } from "he";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: Props) {
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

  const { id } = await params;

  const tenant = corsair.withTenant(session.user.id);

  const email = await tenant.gmail.api.messages.get({
    id,
    format: "metadata",
  });

  const headers = email.payload?.headers ?? [];

 const subject = decode(
   headers.find((h) => h.name === "Subject")?.value ?? "No Subject",
 );

 const from = decode(
   headers.find((h) => h.name === "From")?.value ?? "Unknown Sender",
 );

  return Response.json({
    id,
    subject,
    from,
    body: decode(email.snippet ?? ""),
    raw: email,
  });
}
