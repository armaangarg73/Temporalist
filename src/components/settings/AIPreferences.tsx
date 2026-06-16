"use client";

import { useState } from "react";

export default function AIPreferences() {
  const [brief, setBrief] = useState(true);
  const [inbox, setInbox] = useState(true);
  const [calendar, setCalendar] = useState(true);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h2 className="mb-6 text-xl font-semibold text-white">AI Preferences</h2>

      <Preference title="Executive Brief" value={brief} onChange={setBrief} />

      <Preference title="Inbox Sync" value={inbox} onChange={setInbox} />

      <Preference
        title="Calendar Sync"
        value={calendar}
        onChange={setCalendar}
      />
    </div>
  );
}

function Preference({ title, value, onChange }: any) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <span className="text-white">{title}</span>

      <button
        onClick={() => onChange(!value)}
        className={`h-7 w-14 rounded-full transition ${
          value ? "bg-violet-500" : "bg-zinc-700"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white transition ${
            value ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
