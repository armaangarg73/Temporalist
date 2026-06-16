import { AppShell } from "@/components/layout/app-shell";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MeetingList from "@/components/calendar/MeetingList";

export default function CalendarPage() {
  return (
    <AppShell>
      <CalendarHeader />

      <MeetingList />
    </AppShell>
  );
}
