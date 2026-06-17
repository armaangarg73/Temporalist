import { generateExecutiveBrief } from "@/lib/generate-executive-brief";
import { auth } from "@/auth";

export async function POST() {
  try {
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

    const brief = await generateExecutiveBrief();

    return Response.json(brief);
  } catch (error) {
    console.error("Refresh brief failed:", error);

    return Response.json(
      {
        error: "Failed to refresh executive brief",
      },
      {
        status: 500,
      },
    );
  }
}
