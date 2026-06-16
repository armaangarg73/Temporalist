"use client";

import { CalendarClock, MapPin, Users } from "lucide-react";

export default function MeetingCard({ meeting }: any) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-300 hover:border-violet-500/40 hover:bg-zinc-900 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{meeting.summary}</h3>

        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
          Upcoming
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex items-center gap-3 text-zinc-400">
          <CalendarClock className="h-4 w-4" />

          {new Date(meeting.start).toLocaleString()}
        </div>

        <div className="flex items-center gap-3 text-zinc-400">
          <MapPin className="h-4 w-4" />

          {meeting.location}
        </div>

        <div className="flex items-center gap-3 text-zinc-400">
          <Users className="h-4 w-4" />
          {meeting.attendees.length} attendees
        </div>
      </div>
    </div>
  );
}
