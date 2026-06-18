"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { addWeeks, subWeeks, format } from "date-fns";

type Props = {
  onCreate: () => void;
  currentWeek: Date;
  setCurrentWeek: React.Dispatch<React.SetStateAction<Date>>;
};

export default function CalendarToolbar({
  onCreate,
  currentWeek,
  setCurrentWeek,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          className="rounded-lg border border-zinc-800 p-2 transition hover:bg-zinc-800"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>

        <button
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          className="rounded-lg border border-zinc-800 p-2 transition hover:bg-zinc-800"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>


        <h2 className="ml-4 text-xl font-semibold text-white">
          {format(currentWeek, "MMMM yyyy")}
        </h2>
      </div>

      <button
        onClick={onCreate}
        className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white transition hover:bg-violet-500"
      >
        <Plus className="h-4 w-4" />
        Create Event
      </button>
    </div>
  );
}
