"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";

type Email = {
  from: string;
  subject: string;
  snippet: string;
};

type Meeting = {
  summary?: string;
};

type AgentData = {
  emails: Email[];
  meetings: Meeting[];
  urgentItems: string[];
  recommendedActions: string[];
};

export default function ExecutiveBrief() {
  const [data, setData] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

 async function loadBrief() {
   const res = await fetch("/api/brief");
   const json = await res.json();

   setData(json);
 }

  async function refreshBrief() {
    setRefreshing(true);

    try {
      await fetch("/api/brief/refresh", {
        method: "POST",
      });

      await loadBrief();
    } finally {
      setRefreshing(false);
    }
  }

 useEffect(() => {
   void (async () => {
     const res = await fetch("/api/brief");
     const json = await res.json();

     setData(json);
     setLoading(false);
   })();
 }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
        <p className="text-zinc-400">Generating executive brief...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Executive Briefing</h2>

          <p className="text-sm text-zinc-400">
            AI summary of your inbox and calendar
          </p>
        </div>

        <button
          onClick={refreshBrief}
          disabled={refreshing}
          className="rounded-xl border border-violet-500/20 px-4 py-2 text-sm text-violet-300 transition hover:bg-violet-500/10 disabled:opacity-50"
        >
          {refreshing ? "Refreshing..." : "Refresh Brief"}
        </button>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
          <p className="text-sm text-zinc-500">Emails Analyzed</p>

          <p className="mt-2 text-3xl font-bold text-white">
            {data?.emails?.length ?? 0}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
          <p className="text-sm text-zinc-500">Meetings Found</p>

          <p className="mt-2 text-3xl font-bold text-white">
            {data?.meetings?.length ?? 0}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">
          <p className="text-sm text-zinc-500">Urgent Items</p>

          <p className="mt-2 text-3xl font-bold text-red-400">
            {data?.urgentItems?.length ?? 0}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <div className="mb-5 flex items-center gap-2">
            <Mail className="h-5 w-5 text-violet-400" />

            <h3 className="font-semibold text-white">Important Emails</h3>

            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
              {data?.emails?.length ?? 0}
            </span>
          </div>

          <div className="space-y-4">
            {data?.emails?.map((email, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4 transition-all hover:border-violet-500/30 hover:bg-zinc-900"
              >
                <p className="mb-1 text-xs text-violet-400">{email.from}</p>
                <p className="line-clamp-1 font-medium text-white">
                  {email.subject}
                </p>

                <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                  {email.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-violet-400" />

            <h3 className="font-semibold text-white">Upcoming Meetings</h3>

            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
              {data?.meetings?.length ?? 0}
            </span>
          </div>

          {data?.meetings?.length === 0 ? (
            <div className="flex h-56 items-center justify-center rounded-2xl border border-zinc-800">
              <div className="text-center">
                <Calendar className="mx-auto h-8 w-8 text-zinc-500" />

                <p className="mt-4 font-medium text-white">
                  No meetings scheduled
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Your calendar is free
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {data?.meetings.map((meeting, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-800 p-4"
                >
                  <p className="text-white">{meeting.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />

              <h3 className="font-semibold text-white">Urgent Items</h3>
            </div>

            {data?.urgentItems?.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4"
              >
                <p className="text-sm text-red-200">{item}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />

              <h3 className="font-semibold text-white">Recommended Actions</h3>
            </div>

            <div className="space-y-3">
              {data?.recommendedActions?.map((action, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500 text-xs text-emerald-400">
                    {index + 1}
                  </div>

                  <p className="text-sm text-zinc-300">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
