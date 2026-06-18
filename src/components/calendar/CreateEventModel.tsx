"use client";

import { useState } from "react";
import { X, CalendarPlus } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function CreateEventModal({ open, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState("");

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  if (!open) return null;

  async function createEvent() {
    if (!summary || !startDate || !startTime || !endDate || !endTime) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const start = new Date(`${startDate}T${startTime}`).toISOString();

      const end = new Date(`${endDate}T${endTime}`).toISOString();

      const res = await fetch("/api/calendar/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          description,
          location,
          start,
          end,
          attendees: attendees
            .split(",")
            .map((email) => email.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      onSuccess?.();
      onClose();

      setSummary("");
      setDescription("");
      setLocation("");
      setAttendees("");

      setStartDate("");
      setStartTime("");

      setEndDate("");
      setEndTime("");
    } catch (err) {
      console.error(err);
      alert("Failed to create event.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-600/20 p-3">
              <CalendarPlus className="h-6 w-6 text-violet-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Create Event</h2>

              <p className="text-sm text-zinc-500">
                Schedule a new Google Calendar meeting
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>
        </div>

        <div className="grid gap-5">
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Meeting title"
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
          />

          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
          />

          <input
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            placeholder="Guests (comma separated emails)"
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-6 py-3 text-white hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={createEvent}
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
