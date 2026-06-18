"use client";

import { useEffect, useRef, useState } from "react";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Temporal Agent.\n\nI can manage your Gmail and Google Calendar.\n\nTry asking:\n• What meetings do I have today?\n• Send an email to...\n• Schedule a meeting tomorrow at 3 PM.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const prompt = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: prompt,
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response ?? "Sorry, I couldn't process that request.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while contacting the AI agent.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[760px] flex-col rounded-3xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-xl">
      <div className="border-b border-zinc-800 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">Temporal Agent</h2>

        <p className="mt-1 text-sm text-zinc-500">
          Natural language control for Gmail and Google Calendar
        </p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-zinc-800 p-5">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}
