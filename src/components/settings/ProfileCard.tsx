"use client";

import { User, Mail } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h2 className="mb-6 text-xl font-semibold text-white">Profile</h2>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-violet-500/10 p-3">
            <User className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <p className="text-sm text-zinc-500">Name</p>

            <p className="text-white font-medium">Armaan Garg</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-violet-500/10 p-3">
            <Mail className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <p className="text-sm text-zinc-500">Connected Account</p>

            <p className="text-white font-medium">Google Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
