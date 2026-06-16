"use client";

import { motion } from "framer-motion";
import { Mail, Brain, Sparkles, CalendarDays, Rocket } from "lucide-react";

const steps = [
  {
    icon: Mail,
    title: "Connect Gmail",
    description: "Securely connect your inbox and calendar in one click.",
  },
  {
    icon: Brain,
    title: "AI Understands",
    description: "Temporalist analyzes every important email and meeting.",
  },
  {
    icon: Sparkles,
    title: "Generate Insights",
    description:
      "Summaries, replies, tasks and executive briefs are created automatically.",
  },
  {
    icon: CalendarDays,
    title: "Organize Your Day",
    description: "Meetings, deadlines and priorities stay perfectly organized.",
  },
  {
    icon: Rocket,
    title: "Take Action",
    description: "Open your dashboard already knowing exactly what to do next.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="how" className="py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-violet-400">
            HOW IT WORKS
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Productivity in Five Simple Steps
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Connect your workspace once. Temporalist keeps everything organized
            automatically.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/60 via-zinc-700 to-transparent lg:block" />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className={`flex items-center gap-10 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur">
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                        <Icon className="h-8 w-8 text-violet-400" />
                      </div>

                      <h3 className="text-2xl font-bold text-white">
                        {step.title}
                      </h3>

                      <p className="mt-4 leading-8 text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full border border-violet-500 bg-zinc-950 text-white">
                    {index + 1}
                  </div>

                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
