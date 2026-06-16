"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import useAgent from "@/hooks/useAgent";

export default function NextMeetingCard() {
  const { data, loading } = useAgent();

  if (loading) return null;

  const meeting = data?.nextMeeting;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <div className="mb-6 flex items-center gap-3">
        <CalendarDays className="h-6 w-6 text-blue-400" />

        <h2 className="text-xl font-semibold text-white">Next Meeting</h2>
      </div>

      {!meeting ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 p-8 text-center">
          <p className="text-zinc-500">No upcoming meetings 🎉</p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-white">
            {meeting.summary}
          </h3>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 text-zinc-400">
              <Clock className="h-4 w-4" />
              {new Date(
                meeting.start.dateTime ?? meeting.start.date,
              ).toLocaleString()}
            </div>

            {meeting.location && (
              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin className="h-4 w-4" />
                {meeting.location}
              </div>
            )}
          </div>

          <Link
            href="/calendar"
            className="mt-8 inline-flex rounded-xl border border-violet-500/20 px-5 py-3 text-violet-300 transition hover:bg-violet-500/10"
          >
            Open Calendar
          </Link>
        </>
      )}
    </div>
  );
}
