"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, Sparkles, CheckCircle } from "lucide-react";

type Activity = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  createdAt: string;
};

export default function ActivityTimeline() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function loadActivities() {
      const res = await fetch("/api/activity");
      const data = await res.json();

      setActivities(data);
    }

    loadActivities();
  }, []);

  function getIcon(type: string) {
    switch (type) {
      case "brief_generated":
        return <Sparkles className="h-5 w-5 text-violet-400" />;

      case "gmail_connected":
        return <Mail className="h-5 w-5 text-red-400" />;

      case "calendar_synced":
        return <Calendar className="h-5 w-5 text-blue-400" />;

      default:
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
    }
  }

  return (
    <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Activity Timeline
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Recent activity across your integrations
          </p>
        </div>

        <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800">
          View all activity
        </button>
      </div>

      <div className="space-y-2">
        {activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-center text-zinc-500">
            No activity yet
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-b border-zinc-800 py-5 last:border-b-0"
            >
              <div className="rounded-xl bg-zinc-800 p-3">
                {getIcon(activity.type)}
              </div>

              <div className="flex-1">
                <p className="font-medium text-white">{activity.title}</p>

                {activity.description && (
                  <p className="mt-1 text-sm text-zinc-500">
                    {activity.description}
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="whitespace-nowrap text-xs text-zinc-500">
                  {new Date(activity.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
