import { auth } from "@/auth";
import { corsair } from "@/server/corsair";
import { z } from "zod";
import { Agent, run, tool } from "@openai/agents";
import { OpenAIAgentsProvider } from "@corsair-dev/mcp";
import * as chrono from "chrono-node";

function toBase64Url(str: string) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();

  const tenant = corsair.withTenant(session.user.id);

  const today = new Date();

  const parsedDate = chrono.parseDate(message, today, {
    forwardDate: true,
  });

  const createCalendarEvent = tool({
    name: "create_calendar_event",

    description: "Create a Google Calendar event.",

    parameters: z.object({
      title: z.string(),
      start: z.string(),
      end: z.string(),
      location: z.string().optional(),
      description: z.string().optional(),
    }),

    async execute(input) {
      const start = parsedDate ?? new Date(input.start);

      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      await tenant.googlecalendar.api.events.create({
        calendarId: "primary",

        event: {
          summary: input.title,

          description: input.description,

          location: input.location,

          start: {
            dateTime: start.toISOString(),
            timeZone: "Asia/Kolkata",
          },

          end: {
            dateTime: end.toISOString(),
            timeZone: "Asia/Kolkata",
          },
        },
      });

      return {
        success: true,
        title: input.title,
        start: start.toISOString(),
        end: end.toISOString(),
      };
    },
  });

  const sendEmail = tool({
    name: "send_email",

    description: "Send an email using Gmail.",

    parameters: z.object({
      to: z.string().email(),
      subject: z.string(),
      body: z.string(),
    }),

    async execute(input) {
      const mime = [
        `To: ${input.to}`,
        `Subject: ${input.subject}`,
        "Content-Type: text/plain; charset=UTF-8",
        "",
        input.body,
      ].join("\n");

      const raw = toBase64Url(mime);

      await tenant.gmail.api.messages.send({
        userId: "me",
        raw,
      });

      return {
        success: true,
        to: input.to,
        subject: input.subject,
      };
    },
  });

  const listRecentEmails = tool({
    name: "list_recent_emails",

    description: "Read the user's latest Gmail emails.",

    parameters: z.object({
      count: z.number().default(10),
    }),

    async execute({ count }) {
      const list = await tenant.gmail.api.messages.list({
        userId: "me",
        maxResults: count,
      });

      if (!list.messages?.length) {
        return [];
      }

      const emails = await Promise.all(
        list.messages.map(async (msg) => {
          const email = await tenant.gmail.api.messages.get({
            userId: "me",
            id: msg.id!,
          });

          const headers = email.payload?.headers || [];

          const getHeader = (name: string) =>
            headers.find(
              (h: any) => h.name?.toLowerCase() === name.toLowerCase(),
            )?.value || "";

          return {
            id: email.id,
            from: getHeader("From"),
            subject: getHeader("Subject"),
            date: getHeader("Date"),
            snippet: email.snippet,
          };
        }),
      );

      return emails;
    },
  });

  const searchEmails = tool({
    name: "search_emails",

    description: "Search Gmail using Gmail search syntax.",

    parameters: z.object({
      query: z.string(),
      count: z.number().default(10),
    }),

    async execute({ query, count }) {
      const list = await tenant.gmail.api.messages.list({
        userId: "me",
        q: query,
        maxResults: count,
      });

      if (!list.messages?.length) {
        return [];
      }

      const emails = await Promise.all(
        list.messages.map(async (msg) => {
          const email = await tenant.gmail.api.messages.get({
            userId: "me",
            id: msg.id!,
          });

          const headers = email.payload?.headers || [];

          const getHeader = (name: string) =>
            headers.find(
              (h: any) => h.name?.toLowerCase() === name.toLowerCase(),
            )?.value || "";

          return {
            id: email.id,
            from: getHeader("From"),
            subject: getHeader("Subject"),
            date: getHeader("Date"),
            snippet: email.snippet,
          };
        }),
      );

      return emails;
    },
  });

  const replyToEmail = tool({
    name: "reply_to_email",

    description: "Reply to an existing Gmail email thread.",

    parameters: z.object({
      messageId: z.string(),
      body: z.string(),
    }),

    async execute({ messageId, body }) {
      const original = await tenant.gmail.api.messages.get({
        userId: "me",
        id: messageId,
      });

      const headers = original.payload?.headers || [];

      const getHeader = (name: string) =>
        headers.find((h: any) => h.name?.toLowerCase() === name.toLowerCase())
          ?.value || "";

      const to = getHeader("From");
      const subject = getHeader("Subject");

      const mime = [
        `To: ${to}`,
        `Subject: Re: ${subject.replace(/^Re:\s*/i, "")}`,
        `In-Reply-To: ${original.payload?.headers?.find((h: any) => h.name === "Message-ID")?.value ?? ""}`,
        `References: ${original.payload?.headers?.find((h: any) => h.name === "Message-ID")?.value ?? ""}`,
        "Content-Type: text/plain; charset=UTF-8",
        "",
        body,
      ].join("\n");

      await tenant.gmail.api.messages.send({
        userId: "me",
        raw: toBase64Url(mime),
        threadId: original.threadId!,
      });

      return {
        success: true,
      };
    },
  });

  const draftEmail = tool({
    name: "draft_email",

    description: "Create a Gmail draft.",

    parameters: z.object({
      to: z.string().email(),
      subject: z.string(),
      body: z.string(),
    }),

    async execute({ to, subject, body }) {
      const mime = [
        `To: ${to}`,
        `Subject: ${subject}`,
        "Content-Type: text/plain; charset=UTF-8",
        "",
        body,
      ].join("\n");

      const raw = toBase64Url(mime);

      await tenant.gmail.api.drafts.create({
        userId: "me",
        draft: {
          message: {
            raw,
          },
        },
      });

      return {
        success: true,
        to,
        subject,
      };
    },
  });

  const summarizeInbox = tool({
    name: "summarize_inbox",

    description: "Summarize the latest emails in the user's inbox.",

    parameters: z.object({
      count: z.number().default(10),
    }),

    async execute({ count }) {
      const list = await tenant.gmail.api.messages.list({
        userId: "me",
        maxResults: count,
      });

      if (!list.messages?.length) {
        return [];
      }

      const emails = await Promise.all(
        list.messages.map(async (msg) => {
          const email = await tenant.gmail.api.messages.get({
            userId: "me",
            id: msg.id!,
          });

          const headers = email.payload?.headers || [];

          const getHeader = (name: string) =>
            headers.find(
              (h: any) => h.name?.toLowerCase() === name.toLowerCase(),
            )?.value || "";

          return {
            from: getHeader("From"),
            subject: getHeader("Subject"),
            snippet: email.snippet,
          };
        }),
      );

      return emails;
    },
  });

  const provider = new OpenAIAgentsProvider();

  const tools = provider.build({
    corsair: tenant,
    tool,
  });


  const agent = new Agent({
    name: "Temporal Agent",

    model: "gpt-4o-mini",

    modelSettings: {
      temperature: 0,
      topP: 0.1,
    },

    instructions: `
You are Temporal Agent.

You are an AI executive assistant.

You have access to Gmail and Google Calendar.

Always use tools.

Calendar:
- create calendar events
- delete calendar events

Gmail:
- send_email
- draft_email
- reply_to_email
- list_recent_emails
- search_emails
- summarize_inbox

Never make up information.

Never claim an action succeeded unless the tool succeeds.

If the user asks to search emails,
always use search_emails.

If the user asks to read the inbox,
always use list_recent_emails.

If the user asks for a summary,
always use summarize_inbox.

If replying to an email and multiple emails match,
ask which one they mean.

Keep responses concise.

Never explain which tools you used.
`,

    tools: [
      ...tools,
      createCalendarEvent,
      sendEmail,
      listRecentEmails,
      searchEmails,
      replyToEmail,
      draftEmail,
      summarizeInbox,
    ],
  });


 try {
   const result = await run(
     agent,
     `Current date: ${today.toDateString()}
Current time: ${today.toLocaleTimeString("en-IN", {
       timeZone: "Asia/Kolkata",
     })}
Timezone: Asia/Kolkata

User: ${message}`,
   );

   return Response.json({
     response: result.finalOutput,
   });
 } catch (error) {
   console.error(error);

   return Response.json({
     response: "Sorry, I couldn't complete that request.",
   });
 }

}
