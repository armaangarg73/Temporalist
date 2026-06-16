"use client";

import {
  Mail,
  CalendarDays,
  Bot,
  Database,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const companies = [
  {
    name: "OpenAI",
    icon: Bot,
  },
  {
    name: "Gmail",
    icon: Mail,
  },
  {
    name: "Google Calendar",
    icon: CalendarDays,
  },
  {
    name: "Next.js",
    icon: Cpu,
  },
  {
    name: "Prisma",
    icon: Database,
  },
  {
    name: "Secure OAuth",
    icon: ShieldCheck,
  },
];

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Powered By
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white">
            Built on trusted technologies
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Temporalist integrates seamlessly with the tools professionals
            already use every day.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <div className="absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#09090B] to-transparent" />

          <div className="absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#09090B] to-transparent" />

          <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-8">
            {[...companies, ...companies].map((company, index) => {
              const Icon = company.icon;

              return (
                <div
                  key={index}
                  className="flex min-w-[220px] items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-8 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-zinc-900"
                >
                  <div className="rounded-xl bg-violet-500/10 p-3">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>

                  <span className="font-medium text-zinc-300">
                    {company.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
