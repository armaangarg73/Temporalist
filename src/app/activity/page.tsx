import { AppShell } from "@/components/layout/app-shell";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

export default function ActivityPage() {
  return (
    <AppShell>
      <ActivityTimeline fullPage />
    </AppShell>
  );
}
