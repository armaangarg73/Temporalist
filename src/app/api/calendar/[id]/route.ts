import { auth } from "@/auth";
import { corsair } from "@/server/corsair";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const tenant = corsair.withTenant(session.user.id);

  await tenant.googlecalendar.api.events.delete({
    calendarId: "primary",
    id: id,
  });

  return Response.json({
    success: true,
  });
}
