import { AppShell } from "@/components/layout/app-shell";
import ExecutiveBrief from "@/components/dashboard/ExecutiveBrief";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardHeader />

      <ExecutiveBrief />

      <ActivityTimeline />
    </AppShell>
  );
}
