import OpenAI from "openai";
import { getExecutiveBriefData } from "./executive-brief";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateExecutiveBrief() {
  const data = await getExecutiveBriefData();

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: `
   You are an executive assistant.

Based on the emails and calendar events provided:

1. Summarize important emails.
2. Summarize upcoming meetings.
3. Highlight urgent items.
4. Give 3 recommended actions.

Emails:
${JSON.stringify(data.emails)}

Calendar:
${JSON.stringify(data.events.items)}

Return a concise executive briefing.
    `,
  });

  return response.output_text;
}
