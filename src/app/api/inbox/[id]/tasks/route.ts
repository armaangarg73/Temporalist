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

    if (existingInsight?.tasks) {
      return Response.json({
        tasks: existingInsight.tasks,
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
You are a professional executive assistant.

Extract actionable tasks from this email.

Return ONLY JSON:

{
  "tasks": [
    {
      "title": "task",
      "priority": "high"
    }
  ]
}

Priority can be:
high
medium
low

Email:
${JSON.stringify(email)}
`,
    });

    const cleaned = response.output_text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    const tasks = Array.isArray(data) ? data : (data.tasks ?? []);

    await prisma.emailInsight.upsert({
      where: {
        userId_emailId: {
          userId,
          emailId: id,
        },
      },
      update: {
        tasks,
      },
      create: {
        userId,
        emailId: id,
        tasks,
      },
    });

    await prisma.activity.create({
      data: {
        userId,
        type: "tasks_extracted",
        title: "Tasks Extracted",
        description: email.snippet ?? "",
      },
    });

    return Response.json({
      tasks,
      cached: false,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to generate tasks",
      },
      {
        status: 500,
      },
    );
  }
}
