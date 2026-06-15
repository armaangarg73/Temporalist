import { generateExecutiveBrief } from "@/lib/generate-executive-brief";

export async function GET() {
  const data = await generateExecutiveBrief();

  return Response.json(data);
}
