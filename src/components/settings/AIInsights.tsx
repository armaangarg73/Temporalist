"use client";

import { Brain } from "lucide-react";

interface Props {
  data: any;
}

export default function AIInsights({ data }: Props) {
  const insights = data?.insights;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Brain className="h-6 w-6 text-violet-400" />

        <h2 className="text-xl font-semibold text-white">AI Insights</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-zinc-400">Productivity Score</span>

          <span className="font-bold text-white">
            {insights?.productivityScore ?? 0}/100
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Busiest Day</span>

          <span className="font-bold text-white">
            {insights?.busiestDay ?? "-"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Latest Activity</span>

          <span className="font-bold text-white">
            {insights?.latestActivity ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
