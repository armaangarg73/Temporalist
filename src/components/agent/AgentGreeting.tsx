"use client";

export default function AgentGreeting() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h2 className="text-3xl font-bold text-white">{greeting}, Armaan 👋</h2>

      <p className="mt-3 text-zinc-400">
        Here&apos;s everything that needs your attention today.
      </p>
    </div>
  );
}
