"use client";

import { Mail, CalendarDays, Activity, FileText } from "lucide-react";

interface Props {
  data: any;
}

export default function StatsCards({ data }: Props) {
  const stats = data?.stats;

  const cards = [
    {
      title: "Emails",
      value: stats?.emails ?? 0,
      icon: Mail,
    },
    {
      title: "Meetings",
      value: stats?.meetings ?? 0,
      icon: CalendarDays,
    },
    {
      title: "Activities",
      value: stats?.activities ?? 0,
      icon: Activity,
    },
    {
      title: "Executive Briefs",
      value: stats?.briefs ?? 0,
      icon: FileText,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <Icon className="h-7 w-7 text-violet-400" />

              <span className="text-3xl font-bold text-white">
                {card.value}
              </span>
            </div>

            <p className="text-zinc-400">{card.title}</p>
          </div>
        );
      })}
    </div>
  );
}
