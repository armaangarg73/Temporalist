"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const tabs = [
  {
    title: "Dashboard",
    image: "/dashboard-preview.png",
    heading: "Executive Dashboard",
    description:
      "Start every morning with an AI-generated executive briefing, recent activity, and a complete overview of your workspace.",
  },
  {
    title: "Inbox",
    image: "/inbox-preview.png",
    heading: "AI-Powered Inbox",
    description:
      "Summarize emails instantly, draft professional replies, and extract actionable tasks with one click.",
  },
  {
    title: "Agent",
    image: "/agent-preview.png",
    heading: "Executive AI Agent",
    description:
      "Your personal AI assistant that understands your emails, meetings, and priorities to help you stay ahead.",
  },
  {
    title: "Calendar",
    image: "/calendar-preview.png",
    heading: "Smart Calendar",
    description:
      "Never miss an important meeting. Organize your day with an elegant calendar built for productivity.",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section id="product" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-violet-400">
            Product
          </p>

          <h2 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">
            See Temporalist in Action
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Everything you need to manage your inbox, meetings and daily
            workflow from one intelligent workspace.
          </p>
        </div>

        {/* Tabs */}

        <div className="mt-16 flex justify-center">
          <div className="relative flex rounded-2xl border border-zinc-800 bg-zinc-900/70 p-2 backdrop-blur">
            {tabs.map((tab, index) => (
              <button
                key={tab.title}
                onClick={() => setActive(index)}
                className="relative z-10 rounded-xl px-6 py-3 text-sm font-medium transition-colors duration-300"
              >
                {active === index && (
                  <motion.div
                    layoutId="active-tab"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                    className="absolute inset-0 rounded-xl bg-violet-600 shadow-lg shadow-violet-500/30"
                  />
                )}

                <span
                  className={`relative ${
                    active === index
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Image */}

        <div className="mt-16">
          <div className="overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={tabs[active].image}
                initial={{
                  opacity: 0,
                  scale: 0.98,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  y: -20,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                <Image
                  src={tabs[active].image}
                  alt={tabs[active].title}
                  width={1800}
                  height={1000}
                  priority
                  className="w-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Description */}

        <AnimatePresence mode="wait">
          <motion.div
            key={tabs[active].heading}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.35,
            }}
            className="mx-auto mt-14 max-w-3xl text-center"
          >
            <h3 className="text-3xl font-bold text-white md:text-4xl">
              {tabs[active].heading}
            </h3>

            <p className="mt-5 text-lg leading-8 text-zinc-400">
              {tabs[active].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
