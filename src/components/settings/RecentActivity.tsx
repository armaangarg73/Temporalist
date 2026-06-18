"use client";

import { Activity } from "lucide-react";

interface Props {
  data: any;
}

export default function RecentActivity({ data }: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Activity className="h-6 w-6 text-violet-400" />

        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {data?.recentActivities?.map((activity: any) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b border-zinc-800 pb-3"
          >
            <div>
              <p className="font-medium text-white">{activity.title}</p>

              <p className="text-sm text-zinc-400">{activity.description}</p>
            </div>

            <span className="text-xs text-zinc-500">
              {new Date(activity.createdAt).toLocaleDateString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
