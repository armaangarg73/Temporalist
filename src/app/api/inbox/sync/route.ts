import { auth } from "@/auth";
import { syncInbox } from "@/lib/syncInbox";

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

  await syncInbox(userId);

   return Response.json({
     success: true,
   });
}
