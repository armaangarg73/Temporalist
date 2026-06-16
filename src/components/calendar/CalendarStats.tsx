"use client";

type Props = {
  total: number;
  today: number;
};

export default function CalendarStats({ total, today }: Props) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="text-sm text-zinc-500">Upcoming Meetings</p>

        <h2 className="mt-2 text-3xl font-bold text-white">{total}</h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="text-sm text-zinc-500">Today</p>

        <h2 className="mt-2 text-3xl font-bold text-violet-400">{today}</h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="text-sm text-zinc-500">Status</p>

        <h2 className="mt-2 text-xl font-semibold text-emerald-400">Synced</h2>
      </div>
    </div>
  );
}
