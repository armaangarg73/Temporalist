"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is my Google data secure?",
    a: "Yes. We only access the permissions you approve and never store unnecessary personal information.",
  },
  {
    q: "Can Temporalist send emails automatically?",
    a: "You always stay in control. AI drafts replies for you to review before sending.",
  },
  {
    q: "Does it support Google Calendar?",
    a: "Yes. Meetings are synced and displayed alongside your AI-generated executive brief.",
  },
  {
    q: "Can I disconnect my Google account?",
    a: "Absolutely. You can disconnect integrations anytime from Settings.",
  },
  {
    q: "What AI powers Temporalist?",
    a: "Temporalist uses OpenAI models to generate summaries, replies and recommendations.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-violet-400">
            FAQ
          </p>

          <h2 className="mt-5 text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5"
              >
                <span className="text-left font-medium text-white">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`transition ${open === index ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="px-6 pb-6 text-zinc-400">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
