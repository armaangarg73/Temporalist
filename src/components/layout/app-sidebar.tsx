"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Inbox, Calendar, Bot, Settings } from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/",
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
    <aside className="w-72 border-r border-zinc-900 bg-zinc-950/70 backdrop-blur-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Temporalist</h1>

        <p className="text-sm text-zinc-500">Command your inbox</p>
      </div>

      <nav className="space-y-1 px-3">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              pathname === link.href
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <link.icon size={18} />
            {link.name}
          </Link>
        ))}
      </nav>
      
    </aside>
  );
}
