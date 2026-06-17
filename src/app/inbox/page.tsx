import { AppShell } from "@/components/layout/app-shell";
import InboxWorkspace from "@/components/inbox/InboxWorkspace";
import { requireAuth } from "@/lib/require-auth";

export default async function InboxPage() {
  await requireAuth();
  return (
    <AppShell>
      <InboxWorkspace />
    </AppShell>
  );
}
