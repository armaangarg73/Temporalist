"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Meeting = {
  id: string;
  summary: string;
  start: string;
};

type Props = {
  meetings: Meeting[];
  onCreate: () => void;
  currentWeek: Date;
  setCurrentWeek: React.Dispatch<React.SetStateAction<Date>>;
};

export default function CalendarSidebar({
  meetings,
  onCreate,
  currentWeek,
  setCurrentWeek,
}: Props) {
  const today = new Date().toDateString();

  const todayMeetings = meetings.filter(
    (meeting) => new Date(meeting.start).toDateString() === today,
  );

  return (
    <div className="w-80 shrink-0 space-y-5">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <button
          onClick={onCreate}
          className="w-full rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-500"
        >
          + Create Event
        </button>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">Mini Calendar</h3>

        <DayPicker
          mode="single"
          selected={currentWeek}
          onSelect={(date) => {
            if (date) setCurrentWeek(date);
          }}
        />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Today&apos;s Meetings
        </h3>

        <div className="space-y-3">
          {todayMeetings.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-3">
              <p className="text-sm text-zinc-400">No meetings today</p>
            </div>
          ) : (
            todayMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-3"
              >
                <p className="truncate text-sm font-semibold text-white">
                  {meeting.summary}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {new Date(meeting.start).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
