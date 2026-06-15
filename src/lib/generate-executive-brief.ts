import OpenAI from "openai";
import { getExecutiveBriefData } from "./executive-brief";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateExecutiveBrief() {
  const data = await getExecutiveBriefData();

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: `
You are an executive assistant.

Analyze the emails and calendar events.

Return ONLY raw JSON.

{
  "urgentItems": ["string"],
  "recommendedActions": ["string"]
}
  Rules:
- Return at least 1 urgent item if a deadline,
  application, offer expiration,
  or time-sensitive opportunity exists.
- Return exactly 3 recommended actions.
- Do not return markdown.

Emails:
${JSON.stringify(data.emails)}

Calendar:
${JSON.stringify(data.events.items)}
`,
  });

  await prisma.activity.create({
    data: {
      type: "brief_generated",
      title: "Executive Brief Generated",
      description: `AI analyzed ${data.emails.length} emails and ${data.events.items?.length ?? 0} calendar events`,
    },
  });

  const cleaned = response.output_text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const aiData = JSON.parse(cleaned);

  const urgentItems = (aiData.urgentItems ?? []).map((item: any) =>
    typeof item === "string" ? item : item.deadline || JSON.stringify(item),
  );

  const recommendedActions = (aiData.recommendedActions ?? []).map(String);

  const result = {
    emails: data.emails,
    meetings: data.events.items ?? [],
    urgentItems,
    recommendedActions,
  };

  await prisma.executiveBrief.create({
    data: {
      data: result,
    },
  });

  return result;
}
