import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import ExecutiveBrief from "@/components/dashboard/ExecutiveBrief";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import { requireAuth } from "@/lib/require-auth";

export default async function DashboardPage() {
  await requireAuth();

  return (
    <AppShell>
      <DashboardHeader />

      <ExecutiveBrief />

      <ActivityTimeline />
    </AppShell>
  );
}
