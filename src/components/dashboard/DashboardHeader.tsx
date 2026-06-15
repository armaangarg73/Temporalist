import { RefreshCw } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Hello 👋
        </h1>

        <p className="mt-2 text-lg text-zinc-400">
          Here&apos;s what&apos;s important today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
          <span>📧</span>

          <span className="text-sm font-medium text-white">Gmail</span>

          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs text-emerald-400">Connected</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
          <span>📅</span>

          <span className="text-sm font-medium text-white">Calendar</span>

          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs text-emerald-400">Connected</span>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20">
          <RefreshCw className="h-4 w-4" />
          Refresh Brief
        </button>
      </div>
    </div>
  );
}
