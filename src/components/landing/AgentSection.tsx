"use client";

import { motion } from "framer-motion";
import { Bot, Mail, CalendarDays, CheckCircle2, Sparkles } from "lucide-react";

const capabilities = [
  {
    icon: Mail,
    title: "Inbox Intelligence",
    description:
      "Summarizes emails, detects urgency and drafts professional replies.",
  },
  {
    icon: CalendarDays,
    title: "Calendar Awareness",
    description: "Keeps track of meetings and prepares you before every event.",
  },
  {
    icon: Sparkles,
    title: "Executive Brief",
    description:
      "Generates a complete overview of everything important for your day.",
  },
  {
    icon: CheckCircle2,
    title: "Action Planning",
    description:
      "Extracts tasks and recommends the next best action automatically.",
  },
];

export default function AgentSection() {
  return (
    <section className="relative overflow-hidden py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-violet-400">
            AI AGENT
          </p>

          <h2 className="mt-5 text-5xl font-bold text-white md:text-6xl">
            Meet Your Executive AI Agent
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            More than an assistant. Temporalist understands your inbox, calendar
            and daily priorities to help you focus on what matters most.
          </p>
        </div>

        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}

          <div className="space-y-8">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.5,
                  }}
                  className="flex gap-5 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur"
                >
                  <div className="rounded-2xl bg-violet-500/10 p-4">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8 shadow-2xl shadow-black/40"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-full bg-violet-500/10 p-3">
                <Bot className="h-7 w-7 text-violet-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">Executive Agent</h3>

                <p className="text-sm text-zinc-500">Online • Ready</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="ml-auto max-w-sm rounded-2xl bg-violet-600 px-5 py-4 text-white">
                What&apos;s important today?
              </div>

              <div className="max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="mb-4 font-medium text-white">
                  Here&apos;s your executive briefing:
                </p>

                <ul className="space-y-3 text-sm text-zinc-400">
                  <li>📧 12 unread emails</li>

                  <li>🚨 Internship deadline tomorrow</li>

                  <li>📅 Product meeting at 3:00 PM</li>

                  <li>✅ 5 tasks extracted automatically</li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-xl bg-violet-600 px-4 py-2 text-sm text-white transition hover:bg-violet-500">
                    View Inbox
                  </button>

                  <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800">
                    Open Calendar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
