"use client";

import { LogOut } from "lucide-react";

export default function DangerZone() {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
      <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>

      <p className="mt-2 text-zinc-400">Disconnect your Google account.</p>

      <button className="mt-6 flex items-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-red-400 transition hover:bg-red-500/10">
        <LogOut className="h-5 w-5" />
        Disconnect Google
      </button>
    </div>
  );
}
