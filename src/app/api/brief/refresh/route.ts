import { generateExecutiveBrief } from "@/lib/generate-executive-brief";

export async function POST() {
  try {
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
