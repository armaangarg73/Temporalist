import OpenAI from "openai";
import { auth } from "@/auth";
import { corsair } from "@/server/corsair";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const { id } = await params;

    const existingInsight = await prisma.emailInsight.findUnique({
      where: {
        userId_emailId: {
          userId,
          emailId: id,
        },
      },
    });

    if (existingInsight?.summary) {
      return Response.json({
        summary: existingInsight.summary,
        cached: true,
      });
    }

   const tenant = corsair.withTenant(userId);

   const email = await tenant.gmail.api.messages.get({
     id,
     format: "full",
   });

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `
You are an executive assistant.

Summarize this email in 3-5 concise bullet points.

Focus on:
- Important information
- Deadlines
- Action items
- Opportunities

Email:
${JSON.stringify(email)}
`,
    });

    const summary = response.output_text;

    await prisma.emailInsight.upsert({
      where: {
        userId_emailId: {
          userId,
          emailId: id,
        },
      },
      update: {
        summary,
      },
      create: {
        userId,
        emailId: id,
        summary,
      },
    });

    await prisma.activity.create({
      data: {
        userId,
        type: "email_summarized",
        title: "Email Summarized",
        description: email.snippet ?? "",
      },
    });

    return Response.json({
      summary,
      cached: false,
    });
  } catch (error) {
    console.error("Summarize email error:", error);

    return Response.json(
      {
        error: "Failed to summarize email",
      },
      {
        status: 500,
      },
    );
  }
}
