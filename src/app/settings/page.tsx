import { AppShell } from "@/components/layout/app-shell";

import ProfileCard from "@/components/settings/ProfileCard";
import ConnectedServices from "@/components/settings/ConnectedServices";
import AIPreferences from "@/components/settings/AIPreferences";
import DangerZone from "@/components/settings/DangerZone";
import {requireAuth} from "@/lib/require-auth";
import ProfileDashboard from "@/components/settings/ProfileDashboard";

export default async function SettingsPage() {
  await requireAuth();
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-4xl font-bold text-white">Profile</h1>

        <p className="mb-10 text-zinc-500">Your AI productivity dashboard.</p>

        <div className="space-y-6">
          <ProfileCard />
          
          <ProfileDashboard />

          <ConnectedServices />

          <AIPreferences />

          <DangerZone />
        </div>
      </div>
    </AppShell>
  );
}
