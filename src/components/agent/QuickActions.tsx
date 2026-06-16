"use client";

import Link from "next/link";
import { RefreshCw, CalendarDays, Mail, LayoutDashboard } from "lucide-react";

export default function QuickActions() {
  async function refreshBrief() {
    await fetch("/api/brief/refresh", {
      method: "POST",
    });
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h2 className="mb-6 text-xl font-semibold text-white">Quick Actions</h2>

      <div className="grid gap-4 md:grid-cols-4">
        <button
          onClick={refreshBrief}
          className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 p-5 transition hover:border-violet-500/30 hover:bg-zinc-900"
        >
          <RefreshCw className="h-5 w-5 text-violet-400" />
          Refresh Brief
        </button>

        <Link
          href="/inbox"
          className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 p-5 transition hover:border-violet-500/30 hover:bg-zinc-900"
        >
          <Mail className="h-5 w-5 text-violet-400" />
          Inbox
        </Link>

        <Link
          href="/calendar"
          className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 p-5 transition hover:border-violet-500/30 hover:bg-zinc-900"
        >
          <CalendarDays className="h-5 w-5 text-blue-400" />
          Calendar
        </Link>

        <Link
          href="/"
          className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 p-5 transition hover:border-violet-500/30 hover:bg-zinc-900"
        >
          <LayoutDashboard className="h-5 w-5 text-emerald-400" />
          Dashboard
        </Link>
      </div>
    </div>
  );
}
