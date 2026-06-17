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

    if (existingInsight?.reply) {
      return Response.json({
        reply: existingInsight.reply,
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

Read the email and draft a professional reply.

Rules:
- Be concise
- Be polite
- Be actionable
- Return ONLY the reply

Email:
${JSON.stringify(email)}
`,
    });

    const reply = response.output_text;

    await prisma.emailInsight.upsert({
      where: {
        userId_emailId: {
          userId,
          emailId: id,
        },
      },
      update: {
        reply,
      },
      create: {
        userId,
        emailId: id,
        reply,
      },
    });

    await prisma.activity.create({
      data: {
        userId,
        type: "reply_generated",
        title: "AI Reply Generated",
        description: email.snippet ?? "",
      },
    });

    return Response.json({
      reply,
      cached: false,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to generate reply",
      },
      {
        status: 500,
      },
    );
  }
}
