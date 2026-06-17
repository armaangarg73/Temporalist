import { AppShell } from "@/components/layout/app-shell";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import { requireAuth } from "@/lib/require-auth";

export default async function ActivityPage() {
  await requireAuth();
  return (
    <AppShell>
      <ActivityTimeline fullPage />
    </AppShell>
  );
}
