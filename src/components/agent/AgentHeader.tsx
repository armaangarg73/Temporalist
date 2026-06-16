import { Bot } from "lucide-react";

export default function AgentHeader() {
  return (
    <div className="flex items-center gap-5">
      <div className="rounded-2xl bg-violet-500/10 p-4">
        <Bot className="h-8 w-8 text-violet-400" />
      </div>

      <div>
        <h1 className="text-4xl font-bold text-white">AI Executive Agent</h1>

        <p className="mt-1 text-zinc-500">Your personal AI chief of staff</p>
      </div>
    </div>
  );
}
