"use client";

import { useEffect, useState } from "react";
import { startOfWeek } from "date-fns";

import CalendarToolbar from "./CalendarToolbar";
import CalendarSidebar from "./CalendarSidebar";
import CalendarWeekView from "./CalendarWeekView";
import CreateEventModal from "./CreateEventModel";
import DeleteEventModal from "./DeleteEventModel";

export default function MeetingList() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
  );
  const [deleteMeeting, setDeleteMeeting] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function loadMeetings() {
    try {
      const res = await fetch("/api/calendar", {
        cache: "no-store",
      });

      const data = await res.json();

      setMeetings(data);
    } finally {
      setLoading(false);
    }
  }

  async function removeMeeting(id: string) {
    const res = await fetch(`/api/calendar/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return;

    setMeetings((prev) => prev.filter((m) => m.id !== id));

    setDeleteOpen(false);
    setDeleteMeeting(null);
  }

  useEffect(() => {
    loadMeetings();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
        <p className="text-zinc-400">Loading your calendar...</p>
      </div>
    );
  }

  return (
    <>
      <CalendarToolbar
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
        onCreate={() => setOpenModal(true)}
      />

      <div className="mt-6 flex gap-6">
        <CalendarSidebar
          meetings={meetings}
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          onCreate={() => setOpenModal(true)}
        />

        <CalendarWeekView
          meetings={meetings}
          currentWeek={currentWeek}
          onDelete={(meeting) => {
            setDeleteMeeting(meeting);
            setDeleteOpen(true);
          }}
        />
      </div>

      <CreateEventModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadMeetings}
      />

      <DeleteEventModal
        open={deleteOpen}
        meeting={deleteMeeting}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteMeeting(null);
        }}
        onDelete={() => removeMeeting(deleteMeeting.id)}
      />
    </>
  );
}
