"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Calendar,
  Sparkles,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

type Activity = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  createdAt: string;
};

type ActivityTimelineProps = {
  fullPage?: boolean;
};

export default function ActivityTimeline({
  fullPage = false,
}: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function loadActivities() {
      const endpoint = fullPage ? "/api/activity" : "/api/activity?limit=5";

      const res = await fetch(endpoint);
      const data = await res.json();

      setActivities(data);
    }

    loadActivities();
  }, [fullPage]);

  function getIcon(type: string) {
    switch (type) {
      case "brief_generated":
        return <Sparkles className="h-5 w-5 text-violet-400" />;

      case "gmail_connected":
        return <Mail className="h-5 w-5 text-red-400" />;

      case "calendar_synced":
        return <Calendar className="h-5 w-5 text-blue-400" />;

      case "reply_generated":
        return <MessageSquare className="h-5 w-5 text-cyan-400" />;

      default:
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
    }
  }

  function timeAgo(date: string) {
    const now = new Date().getTime();
    const then = new Date(date).getTime();

    const diff = Math.floor((now - then) / 1000);

    if (diff < 60) return "Just now";

    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;

    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

    return `${Math.floor(diff / 86400)} day ago`;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl">

      <div className="flex items-center justify-between border-b border-zinc-800 p-8">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-violet-500/10 p-3">
            <Sparkles className="h-6 w-6 text-violet-400" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Activity Timeline
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Recent activity across your integrations
            </p>
          </div>
        </div>

        {!fullPage && (
          <Link
            href="/activity"
            className="rounded-xl border border-zinc-800 px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
          >
            View all activity
          </Link>
        )}
      </div>


      <div className="px-8">
        {activities.length === 0 ? (
          <div className="py-20 text-center text-zinc-500">No activity yet</div>
        ) : (
          activities.map((activity, index) => (
            <div
              key={activity.id}
              className="group relative flex gap-5 border-b border-zinc-800 py-6 transition hover:bg-zinc-900/40 last:border-b-0"
            >

              <div className="relative flex w-12 justify-center">
                {index !== activities.length - 1 && (
                  <div className="absolute top-10 bottom-0 w-px bg-zinc-800" />
                )}

                <div className="relative z-10 rounded-xl bg-zinc-800 p-3">
                  {getIcon(activity.type)}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white">{activity.title}</h3>

                {activity.description && (
                  <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                    {activity.description}
                  </p>
                )}
              </div>

              <div className="flex min-w-[130px] items-center justify-end gap-3">
                <span className="text-sm text-zinc-500">
                  {timeAgo(activity.createdAt)}
                </span>

                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          ))
        )}
      </div>

      {!fullPage && (
        <div className="border-t border-zinc-800 p-6">
          <Link
            href="/activity"
            className="font-medium text-violet-400 transition hover:text-violet-300"
          >
            View full timeline →
          </Link>
        </div>
      )}
    </div>
  );
}
