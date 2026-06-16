"use client";

import { useEffect, useState } from "react";
import { CalendarDays, RefreshCw } from "lucide-react";

import MeetingCard from "./MeetingCard";
import CalendarStats from "./CalendarStats";

export default function MeetingList() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadMeetings() {
    try {
      const res = await fetch("/api/calendar", {
        cache: "no-store",
      });

      const data = await res.json();

      setMeetings(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function refreshCalendar() {
    setRefreshing(true);
    await loadMeetings();
  }

  useEffect(() => {
    loadMeetings();
  }, []);

  const today = new Date().toDateString();

  const todayMeetings = meetings.filter(
    (meeting) => new Date(meeting.start).toDateString() === today,
  );

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
        <p className="text-zinc-400">Loading your calendar...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <CalendarStats total={meetings.length} today={todayMeetings.length} />

        <button
          onClick={refreshCalendar}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-xl border border-violet-500/20 px-4 py-2 text-sm text-violet-300 transition hover:bg-violet-500/10 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {meetings.length === 0 ? (
        <div className="flex h-[420px] items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/50">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10">
              <CalendarDays className="h-10 w-10 text-violet-400" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Nothing on your calendar
            </h2>

            <p className="mt-3 text-zinc-500">
              Enjoy your day.
              <br />
              Your next synced meeting will appear here automatically.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </>
  );
}
