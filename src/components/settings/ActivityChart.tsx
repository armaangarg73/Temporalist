"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

interface Props {
  data: any;
}

export default function ActivityChart({ data }: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Activity (Last 7 Days)
      </h2>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.chart}>
            <XAxis dataKey="day" />

            <Tooltip />

            <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
