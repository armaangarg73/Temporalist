"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-36">
      {/* Background Glow */}

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090B_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[40px] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-14 shadow-[0_0_80px_rgba(124,58,237,0.15)]"
        >
          {/* Floating Blur */}

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />

          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]" />

          <div className="relative text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
              <Sparkles className="h-8 w-8 text-violet-400" />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
              READY TO START?
            </p>

            <h2 className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl">
              Let AI Handle the Busy Work.
              <br />
              You Focus on What Matters.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
              Connect your Google account in seconds and let Temporalist
              organize your inbox, meetings and daily workflow with AI.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link
                href="/dashboard"
                className="group flex items-center gap-3 rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-violet-500 hover:shadow-[0_0_35px_rgba(124,58,237,0.5)]"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#product"
                className="rounded-2xl border border-zinc-700 px-8 py-4 text-lg font-medium text-zinc-300 transition hover:border-violet-500/40 hover:bg-zinc-900"
              >
                View Product
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
              <span>✓ Gmail Integration</span>

              <span>✓ Google Calendar</span>

              <span>✓ AI Executive Brief</span>

              <span>✓ Privacy First</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
