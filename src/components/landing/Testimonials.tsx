"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Carter",
    role: "Startup Founder",
    quote:
      "Temporalist completely changed how I manage my inbox. The executive brief alone saves me nearly an hour every morning.",
  },
  {
    name: "Sarah Kim",
    role: "Software Engineer",
    quote:
      "The AI summaries and smart replies feel like having a real executive assistant sitting beside me.",
  },
  {
    name: "Michael Ross",
    role: "Product Manager",
    quote:
      "Everything from emails to meetings is organized automatically. It's the productivity tool I didn't know I needed.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-violet-400">
            TESTIMONIALS
          </p>

          <h2 className="mt-5 text-5xl font-bold text-white">
            Loved by modern professionals
          </h2>

          <p className="mt-6 text-lg text-zinc-400">
            Designed to help founders, students and professionals focus on
            meaningful work.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 backdrop-blur transition hover:-translate-y-2 hover:border-violet-500/40"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-8 text-zinc-300">
                &quot;{item.quote}&quot;
              </p>

              <div className="mt-8">
                <h4 className="font-semibold text-white">{item.name}</h4>

                <p className="text-sm text-zinc-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
