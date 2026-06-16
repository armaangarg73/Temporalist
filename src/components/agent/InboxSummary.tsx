"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import useAgent from "@/hooks/useAgent";

export default function InboxSummary() {
  const { data, loading } = useAgent();

  if (loading) return null;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <div className="mb-6 flex items-center gap-3">
        <Mail className="h-6 w-6 text-violet-400" />

        <h2 className="text-xl font-semibold text-white">Inbox Summary</h2>
      </div>

      <div className="space-y-4">
        {data?.emails?.slice(0, 3).map((email: any, index: number) => (
          <div key={index} className="rounded-2xl border border-zinc-800 p-5">
            <p className="text-sm text-violet-400">{email.from}</p>

            <p className="mt-1 font-medium text-white">{email.subject}</p>

            <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
              {email.snippet}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/inbox"
        className="mt-6 inline-flex rounded-xl border border-violet-500/20 px-5 py-3 text-violet-300 transition hover:bg-violet-500/10"
      >
        Open Inbox
      </Link>
    </div>
  );
}
