"use client";

import { AlertTriangle, CalendarDays, Mail } from "lucide-react";

import useAgent from "@/hooks/useAgent";

export default function AgentStats() {
  const { data, loading } = useAgent();

  if (loading) return null;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <StatCard
        icon={<AlertTriangle className="h-6 w-6 text-red-400" />}
        title="Urgent Items"
        value={data?.urgentItems?.length ?? 0}
      />

      <StatCard
        icon={<CalendarDays className="h-6 w-6 text-blue-400" />}
        title="Meetings"
        value={data?.meetings?.length ?? 0}
      />

      <StatCard
        icon={<Mail className="h-6 w-6 text-violet-400" />}
        title="Emails"
        value={data?.emails?.length ?? 0}
      />
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="mb-5">{icon}</div>

      <p className="text-sm text-zinc-500">{title}</p>

      <p className="mt-2 text-4xl font-bold text-white">{value}</p>
    </div>
  );
}
