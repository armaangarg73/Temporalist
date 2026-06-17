import { AppShell } from "@/components/layout/app-shell";

import AgentHeader from "@/components/agent/AgentHeader";
import AgentGreeting from "@/components/agent/AgentGreeting";
import AgentStats from "@/components/agent/AgentStats";
import AgentRecommendations from "@/components/agent/AgentRecommendations";
import NextMeetingCard from "@/components/agent/NextMeetingCard";
import InboxSummary from "@/components/agent/InboxSummary";
import QuickActions from "@/components/agent/QuickActions";
import { requireAuth } from "@/lib/require-auth";

export default async function AgentPage() {
  await requireAuth();
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-8">
        <AgentHeader />

        <AgentGreeting />

        <AgentStats />

        <div className="grid gap-6 lg:grid-cols-2">
          <AgentRecommendations />

          <NextMeetingCard />
        </div>

        <InboxSummary />

        <QuickActions />
      </div>
    </AppShell>
  );
}
