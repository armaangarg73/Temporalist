import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { Topbar } from "./topbar";
import { CommandPalette } from "./command-palette";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#312e81,transparent_35%),radial-gradient(circle_at_bottom_right,#164e63,transparent_35%)]" />

      <AppSidebar />

      <main className="flex-1 overflow-auto p-8">
        <Topbar />
        {children}
      </main>
      <CommandPalette />
    </div>
  );
}
