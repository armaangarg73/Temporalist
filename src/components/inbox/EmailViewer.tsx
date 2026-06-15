"use client";

import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Copy, Check } from "lucide-react";
import { useRef } from "react";

export default function EmailViewer({ id }: { id: string }) {
  const [email, setEmail] = useState<any>(null);

  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const [reply, setReply] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailCache = useRef<Record<string, any>>({});

  useEffect(() => {
    
    if (!id) return;

    async function loadEmail() {
        if (emailCache.current[id]) {
          setEmail(emailCache.current[id]);
          return;
        }
      const res = await fetch(`/api/inbox/${id}`);
      const data = await res.json();

       emailCache.current[id] = data;

      setEmail(data);
      setSummary("");
    }

    async function loadInsight() {
      const res = await fetch(`/api/inbox/${id}/insight`);

      const data = await res.json();

      setSummary(data.summary ?? "");
      setReply(data.reply ?? "");
      setTasks(data.tasks ?? []);
    }

    loadEmail();
     loadInsight();
  }, [id]);

  async function handleSummarize() {
    if (!id) return;

    setSummarizing(true);

    try {
      const res = await fetch(`/api/inbox/${id}/summarize`);
      const data = await res.json();

      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setSummarizing(false);
    }
  }

  async function handleReply() {
    if (!id) return;

    setReplyLoading(true);

    try {
      const res = await fetch(`/api/inbox/${id}/reply`);

      const data = await res.json();

      setReply(data.reply);
    } catch (error) {
      console.error(error);
    } finally {
      setReplyLoading(false);
    }
  }

  async function extractTasks() {
    if (!id) return;

    setLoadingTasks(true);

    const res = await fetch(`/api/inbox/${id}/tasks`);

    const data = await res.json();

    setTasks(data.tasks ?? []);

    setLoadingTasks(false);
  }

  async function copyReply() {
    await navigator.clipboard.writeText(reply);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  if (!email) {
    return (
      <div className="flex-1 rounded-3xl border border-zinc-800 bg-zinc-900/60" />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <div className="mb-6 flex gap-3">
        <button
          onClick={handleSummarize}
          disabled={summarizing}
          className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 transition hover:bg-violet-500/20 disabled:opacity-50"
        >
          {summarizing ? (
            <>
              <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 inline h-4 w-4" />
              Summarize
            </>
          )}
        </button>

        <button
          onClick={handleReply}
          disabled={replyLoading}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
        >
          {replyLoading ? "Generating..." : "Draft Reply"}
        </button>

        <button
          onClick={extractTasks}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
        >
          {loadingTasks ? "Extracting..." : "Extract Tasks"}
        </button>
      </div>

      <h2 className="text-2xl font-bold text-white">{email.subject}</h2>

      <p className="mt-2 text-zinc-500">{email.from}</p>

      <div className="mt-8 whitespace-pre-wrap text-zinc-300">{email.body}</div>

      {summary && (
        <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-6">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />

            <h3 className="font-semibold text-violet-300">AI Summary</h3>
          </div>

          <div className="whitespace-pre-wrap text-zinc-200">{summary}</div>
        </div>
      )}

      {reply && (
        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-emerald-300">AI Draft Reply</h3>

            <button
              onClick={copyReply}
              className="flex items-center gap-2 rounded-lg border border-emerald-500/20 px-3 py-2 text-sm text-emerald-300"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Reply
                </>
              )}
            </button>
          </div>

          <div className="whitespace-pre-wrap text-zinc-200">{reply}</div>
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
          <h3 className="mb-4 font-semibold text-white">Extracted Tasks</h3>

          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-zinc-800 p-3"
              >
                <p className="text-zinc-200">{task.title}</p>

                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    task.priority === "high"
                      ? "bg-red-500/20 text-red-300"
                      : task.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
