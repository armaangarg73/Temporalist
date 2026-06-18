import { auth } from "@/auth";
import { syncInbox } from "@/lib/syncInbox";
import { generateExecutiveBrief } from "@/lib/generate-executive-brief";
import { syncCalendar } from "@/lib/syncCalender";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await syncInbox(session.user.id);
    await syncCalendar(session.user.id);

    await generateExecutiveBrief();

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
