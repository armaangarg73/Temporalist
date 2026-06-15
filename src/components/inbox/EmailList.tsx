"use client";

import { InboxEmail } from "@/types/inbox";

type Props = {
  emails: InboxEmail[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function EmailList({ emails, selectedId, onSelect }: Props) {
  return (
    <div className="w-[400px] overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900/60">
      {emails.map((email) => (
        <button
          key={email.id}
          onClick={() => onSelect(email.id)}
          className={`w-full border-b border-zinc-800 p-4 text-left transition-all ${
            selectedId === email.id
              ? "bg-violet-500/10"
              : "hover:bg-zinc-800/50"
          }`}
        >
          <p className="line-clamp-1 text-xs text-violet-400">{email.from}</p>

          <p className="mt-1 line-clamp-1 font-medium text-white">
            {email.subject}
          </p>

          <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
            {email.snippet}
          </p>
        </button>
      ))}
    </div>
  );
}
