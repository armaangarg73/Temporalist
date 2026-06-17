import { AppShell } from "@/components/layout/app-shell";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MeetingList from "@/components/calendar/MeetingList";
import { requireAuth } from "@/lib/require-auth";

export default async function CalendarPage() {
  await requireAuth();
  return (
    <AppShell>
      <CalendarHeader />

      <MeetingList />
    </AppShell>
  );
}
