"use client";

import { Sparkles } from "lucide-react";

import useAgent from "@/hooks/useAgent";

export default function AgentRecommendations() {
  const { data, loading } = useAgent();

  if (loading) return null;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <div className="mb-6 flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-violet-400" />

        <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
      </div>

      <div className="space-y-4">
        {data?.recommendedActions?.map((item: string, index: number) => (
          <div key={index} className="rounded-xl border border-zinc-800 p-4">
            <p className="text-zinc-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
