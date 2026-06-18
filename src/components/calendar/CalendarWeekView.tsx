"use client";

import { addDays, format } from "date-fns";
import EventBlock from "./EventBlock";

type Meeting = {
  id: string;
  summary: string;
  start: string;
  end: string;
  location?: string;
  attendees?: any[];
};

type Props = {
  meetings: Meeting[];
  currentWeek: Date;
  onDelete: (meeting: Meeting) => void;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 13 }, (_, i) => i + 8);

export default function CalendarWeekView({
  meetings,
  currentWeek,
  onDelete,
}: Props) {
  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
      <div className="grid grid-cols-8 border-b border-zinc-800">
        <div className="border-r border-zinc-800 p-4" />

        {days.map((day, index) => {
          const date = addDays(currentWeek, index);

          return (
            <div key={day} className="border-r border-zinc-800 p-4 text-center">
              <p className="text-sm text-zinc-500">{day}</p>

              <p className="mt-1 text-lg font-semibold text-white">
                {format(date, "d")}
              </p>
            </div>
          );
        })}
      </div>

      <div className="overflow-y-auto">
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8">
            <div className="border-r border-b border-zinc-800 p-2 text-xs text-zinc-500">
              {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
            </div>

            {days.map((_, index) => {
              const cellDate = addDays(currentWeek, index);

              const dayMeetings = meetings.filter((meeting) => {
                if (!meeting.start) return false;

                const meetingDate = new Date(meeting.start);

                return (
                  meetingDate.toDateString() === cellDate.toDateString() &&
                  meetingDate.getHours() === hour
                );
              });

              return (
                <div
                  key={index}
                  className="relative h-24 border-r border-b border-zinc-800 p-1 transition hover:bg-zinc-800/30"
                >
                  <div className="space-y-1">
                    {dayMeetings.map((meeting) => (
                      <EventBlock
                        key={meeting.id}
                        meeting={meeting}
                        onDelete={() => onDelete(meeting)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
