"use client";

import { CalendarClock, MapPin, Trash2 } from "lucide-react";

type Meeting = {
  id: string;
  summary: string;
  start: string;
  end: string;
  location?: string;
};

type Props = {
  meeting: Meeting;
  onDelete: () => void;
};

export default function EventBlock({ meeting, onDelete }: Props) {
  const start = new Date(meeting.start);
  const end = new Date(meeting.end);

  const startTime = start.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const endTime = end.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="group relative cursor-pointer rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-600 to-violet-700 p-3 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute right-2 top-2 rounded-md bg-red-500/90 p-1 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-600"
      >
        <Trash2 className="h-4 w-4 text-white" />
      </button>

      <h3 className="truncate pr-8 text-sm font-semibold text-white">
        {meeting.summary || "Untitled Meeting"}
      </h3>

      <div className="mt-2 flex items-center gap-2 text-[11px] text-violet-100">
        <CalendarClock className="h-3 w-3" />
        {startTime} - {endTime}
      </div>

      <div className="mt-1 flex items-center gap-2 text-[11px] text-violet-200">
        <MapPin className="h-3 w-3" />
        <span className="truncate">{meeting.location || "No location"}</span>
      </div>
    </div>
  );
}
