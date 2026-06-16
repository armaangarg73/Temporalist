import { AppShell } from "@/components/layout/app-shell";

import ProfileCard from "@/components/settings/ProfileCard";
import ConnectedServices from "@/components/settings/ConnectedServices";
import AIPreferences from "@/components/settings/AIPreferences";
import DangerZone from "@/components/settings/DangerZone";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-4xl font-bold text-white">Settings</h1>

        <p className="mb-10 text-zinc-500">
          Manage your account, integrations and AI preferences.
        </p>

        <div className="space-y-6">
          <ProfileCard />

          <ConnectedServices />

          <AIPreferences />

          <DangerZone />
        </div>
      </div>
    </AppShell>
  );
}
