"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Sparkles,
  CalendarDays,
  CheckSquare,
  Bot,
  Brain,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "AI Email Summary",
    description:
      "Understand long email threads in seconds with concise AI-powered summaries.",
    icon: Sparkles,
    large: true,
  },
  {
    title: "Smart Reply",
    description:
      "Generate professional responses instantly while keeping your tone natural.",
    icon: Mail,
  },
  {
    title: "Executive Brief",
    description:
      "Start every morning with an overview of meetings, emails and priorities.",
    icon: Brain,
  },
  {
    title: "Task Extraction",
    description:
      "Automatically identify follow-ups, deadlines and action items.",
    icon: CheckSquare,
  },
  {
    title: "Calendar Sync",
    description:
      "Stay on top of meetings with a beautiful AI-powered calendar.",
    icon: CalendarDays,
  },
  {
    title: "Executive Agent",
    description:
      "A personal AI assistant that understands your entire workspace.",
    icon: Bot,
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-violet-400">
            FEATURES
          </p>

          <h2 className="mt-5 text-5xl font-bold tracking-tight text-white">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Temporalist combines AI, email, calendar and productivity into one
            elegant workspace built for modern professionals.
          </p>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                }}
                className={`
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-zinc-800
                bg-gradient-to-b
                from-zinc-900
                to-zinc-950
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-violet-500/40
                hover:shadow-[0_0_60px_rgba(124,58,237,0.18)]
                ${
                  feature.large
                    ? "lg:col-span-2 lg:row-span-2 min-h-[420px]"
                    : "min-h-[200px]"
                }
              `}
              >
                <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

                <div className="relative">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                    <Icon className="h-8 w-8 text-violet-400" />
                  </div>

                  <h3
                    className={`font-bold text-white ${
                      feature.large ? "text-4xl" : "text-2xl"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`mt-5 leading-8 text-zinc-400 ${
                      feature.large ? "max-w-xl text-lg" : ""
                    }`}
                  >
                    {feature.description}
                  </p>

                  <button className="mt-10 flex items-center gap-2 font-medium text-violet-400 transition-all group-hover:gap-4">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
