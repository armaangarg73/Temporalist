"use client";

import { Mail, Calendar, Clock } from "lucide-react";

export default function ConnectedServices() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h2 className="mb-2 text-xl font-semibold text-white">
        Google Workspace
      </h2>

      <p className="mb-6 text-sm text-zinc-400">
        Connect Gmail and Google Calendar to unlock AI-powered executive
        features.
      </p>

      <div className="space-y-4">
        <Service
          icon={<Mail className="h-5 w-5" />}
          name="Gmail"
          connectUrl="/api/connect?plugin=gmail"
        />

        <Service
          icon={<Calendar className="h-5 w-5" />}
          name="Google Calendar"
          connectUrl="/api/connect?plugin=googlecalendar"
        />

        <Service icon={<Clock className="h-5 w-5" />} name="Slack" />

        <Service icon={<Clock className="h-5 w-5" />} name="Notion" />
      </div>
    </div>
  );
}

function Service({
  icon,
  name,
  connectUrl,
}: {
  icon: React.ReactNode;
  name: string;
  connectUrl?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 p-4">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-zinc-800 p-3">{icon}</div>

        <span className="text-white">{name}</span>
      </div>

      {connectUrl ? (
        <a
          href={connectUrl}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
        >
          Connect
        </a>
      ) : (
        <span className="text-zinc-500">Coming Soon</span>
      )}
    </div>
  );
}
