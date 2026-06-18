"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
        <span className="text-lg text-white">🤖</span>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-5 py-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Temporal Agent
        </p>

        <div className="flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
        </div>
      </div>
    </div>
  );
}
