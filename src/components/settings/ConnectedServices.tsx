"use client";

import { Mail, Calendar, CheckCircle, Clock } from "lucide-react";

export default function ConnectedServices() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Connected Services
      </h2>

      <div className="space-y-4">
        <Service icon={<Mail className="h-5 w-5" />} name="Gmail" connected />

        <Service
          icon={<Calendar className="h-5 w-5" />}
          name="Google Calendar"
          connected
        />

        <Service icon={<Clock className="h-5 w-5" />} name="Slack" />

        <Service icon={<Clock className="h-5 w-5" />} name="Notion" />
      </div>
    </div>
  );
}

function Service({ icon, name, connected = false }: any) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 p-4">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-zinc-800 p-3">{icon}</div>

        <span className="text-white">{name}</span>
      </div>

      {connected ? (
        <span className="flex items-center gap-2 text-emerald-400">
          <CheckCircle className="h-4 w-4" />
          Connected
        </span>
      ) : (
        <span className="text-zinc-500">Coming Soon</span>
      )}
    </div>
  );
}
