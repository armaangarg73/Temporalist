# 🚀 Temporalist – AI Executive Productivity Assistant

Temporalist is an AI-powered executive productivity platform that intelligently manages your Gmail and Google Calendar through natural language.

Instead of switching between multiple apps, users can simply talk to an AI assistant to schedule meetings, send emails, search conversations, summarize inboxes, and generate AI-powered executive briefs.

Built for the **Corsair AI Hackathon**, Temporalist combines AI agents with Gmail and Google Calendar to create a personal executive assistant.

---

# ✨ Features

## 🤖 AI Executive Agent

Talk naturally with the AI.

Examples:

- Schedule a meeting tomorrow at 7 PM
- Send an email to john@gmail.com
- Reply to the latest email from Sarah
- Search emails about internships
- Summarize my inbox
- Draft an email to my professor

The AI automatically chooses the correct Gmail or Google Calendar tool to execute the request.

---

## 📅 Smart Calendar

- View upcoming meetings
- AI-powered calendar event creation
- Delete meetings instantly
- Natural language scheduling
- Automatic timezone handling
- One-hour default duration when no end time is specified

---

## 📧 Gmail Integration

- Read latest emails
- Search Gmail using Gmail syntax
- Send emails
- Reply to existing email threads
- Create drafts
- AI inbox summarization

---

## 🧠 Executive Brief

Generate an AI-powered executive summary of your day.

The Executive Brief includes:

- Email summaries
- Upcoming meetings
- Urgent items
- AI recommendations

Perfect for quickly understanding what requires attention.

---

## 📊 Dashboard

Beautiful dashboard showing:

- Upcoming meetings
- AI recommendations
- Activity history
- Executive brief
- Email insights

---

## 📈 Profile Analytics

Personal productivity analytics including:

- Total emails
- Meetings
- Executive briefs generated
- Activities performed
- Productivity score
- Activity graph (Last 7 Days)

---

## 📜 Activity History

Every important action is tracked:

- Executive Brief generated
- Calendar updates
- Email actions
- AI activity

---

## 🔄 Background Synchronization

Synchronize Gmail with a single click.

Background sync updates:

- Inbox
- Executive Brief
- Dashboard

---

# 🏗 Architecture

```
                 ┌──────────────┐
                 │    User      │
                 └──────┬───────┘
                        │
                        ▼
               Next.js 16 Frontend
                        │
                        ▼
               API Route Handlers
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
   OpenAI Agent                 Prisma Database
         │                             │
         ▼                             │
  Corsair MCP Provider                 │
         │                             │
         ▼                             │
 ┌──────────────┐             ┌────────────────┐
 │ Gmail Plugin │             │ Calendar Plugin│
 └──────────────┘             └────────────────┘
         │                             │
         ▼                             ▼
      Gmail API                 Google Calendar API
```

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Query
- Shadcn UI

---

## Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL
- Neon Database

---

## AI

- OpenAI Agents SDK
- GPT-4o Mini
- Chrono Node
- Corsair MCP

---

## Integrations

- Gmail API
- Google Calendar API
- Google OAuth

---

# ⚡ AI Capabilities

The AI Agent can:

✅ Create calendar events

✅ Delete calendar events

✅ Send emails

✅ Reply to emails

✅ Create drafts

✅ Search Gmail

✅ Read inbox

✅ Summarize inbox

✅ Generate executive insights

---

# 📂 Project Structure

```
app/
 ├── agent/
 ├── dashboard/
 ├── inbox/
 ├── calendar/
 ├── settings/
 ├── activity/
 └── api/

components/
 ├── dashboard/
 ├── inbox/
 ├── calendar/
 ├── settings/
 └── shared/

lib/
 ├── executive-brief.ts
 ├── generate-executive-brief.ts
 ├── syncInbox.ts
 └── prisma.ts

server/
 └── corsair.ts

prisma/
 └── schema.prisma
```

---

# 🔐 Authentication

Authentication is powered by:

- NextAuth
- Google OAuth

Each user gets isolated Gmail and Calendar access using Corsair multi-tenancy.

---

# 🧠 Executive Brief Workflow

```
User clicks Generate Brief
            │
            ▼
Sync Gmail
            │
            ▼
Fetch Calendar Events
            │
            ▼
OpenAI analyzes data
            │
            ▼
Generate

• Email summaries
• Urgent items
• AI recommendations
            │
            ▼
Store in Database
            │
            ▼
Display on Dashboard
```

---

# 📧 AI Email Workflow

```
User

↓

"Send an email to John"

↓

OpenAI Agent

↓

send_email tool

↓

Gmail API

↓

Email Delivered
```

---

# 📅 Calendar Workflow

```
User

↓

"Schedule meeting tomorrow at 7 PM"

↓

Chrono NLP

↓

OpenAI Agent

↓

Calendar Tool

↓

Google Calendar API

↓

Meeting Created
```

---

# 🚀 Local Setup

Clone the repository

```bash
git clone https://github.com/yourusername/temporalist.git

cd temporalist
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=

AUTH_SECRET=

AUTH_URL=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

OPENAI_API_KEY=

CORSAIR_KEK=
```

Run Prisma

```bash
npx prisma migrate dev

npx prisma generate
```

Start development server

```bash
npm run dev
```

---

# 📸 Screenshots

## Dashboard

_Add screenshot_

---

## AI Agent

_Add screenshot_

---

## Calendar

_Add screenshot_

---

## Inbox

_Add screenshot_

---

## Executive Brief

_Add screenshot_

---

# 🌟 Future Roadmap

- Microsoft Outlook support
- Microsoft Calendar support
- Slack integration
- Notion integration
- GitHub integration
- Webhook-based real-time synchronization
- Mobile application
- Push notifications
- Voice assistant
- Team workspaces
- AI meeting preparation
- AI follow-up email generation
- Retrieval-Augmented Generation (RAG) over emails and documents

---

# 🏆 Hackathon

Built for the **Corsair AI Hackathon**.

Temporalist demonstrates how AI agents can orchestrate real-world productivity workflows by seamlessly integrating Gmail and Google Calendar through natural language interactions.

---

# 👨‍💻 Author

**Armaan Garg**

If you found this project interesting, feel free to ⭐ the repository.