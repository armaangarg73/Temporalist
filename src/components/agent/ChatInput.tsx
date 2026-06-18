"use client";

import { SendHorizonal } from "lucide-react";
import { KeyboardEvent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
};

export default function ChatInput({ value, onChange, onSend, loading }: Props) {
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!loading && value.trim()) {
        onSend();
      }
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        placeholder="Ask Temporal Agent anything..."
        disabled={loading}
        className="w-full resize-none bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
      />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          Press Enter to send • Shift + Enter for new line
        </p>

        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizonal className="h-4 w-4" />
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
