"use client";

import { Bot, User } from "lucide-react";
import clsx from "clsx";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div
      className={clsx(
        "flex w-full gap-4",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}

      <div
        className={clsx(
          "max-w-[75%] rounded-2xl border px-5 py-4 shadow-lg",
          isUser
            ? "border-violet-500/30 bg-violet-600 text-white"
            : "border-zinc-800 bg-zinc-900/70 text-zinc-100",
        )}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-70">
          {isUser ? "You" : "Temporal Agent"}
        </p>

        <p className="whitespace-pre-wrap leading-7">{content}</p>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}
