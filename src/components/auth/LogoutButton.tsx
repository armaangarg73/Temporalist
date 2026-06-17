"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}
