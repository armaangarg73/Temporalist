"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  Bot,
  Settings,
  LogOut,
  Sparkles,
  CircleUserRound,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: Inbox,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Agent",
    href: "/agent",
    icon: Bot,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-900 bg-zinc-950/70 backdrop-blur-xl">
      {/* Logo */}
      <div className="border-b border-zinc-900 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/10 p-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">Temporalist</h1>
            <p className="text-xs text-zinc-500">Command your inbox</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              pathname === link.href
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <link.icon size={18} />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
      <div className="border-t border-zinc-900 p-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
