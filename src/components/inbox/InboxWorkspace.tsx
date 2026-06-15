"use client";

import { useEffect, useState } from "react";
import { InboxEmail } from "@/types/inbox";
import EmailList from "./EmailList";
import EmailViewer from "./EmailViewer";

export default function InboxWorkspace() {
  const [emails, setEmails] = useState<InboxEmail[]>([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function loadEmails() {
      const res = await fetch("/api/inbox");
      const data = await res.json();

      setEmails(data);

      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
    }

    loadEmails();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Inbox</h1>

        <p className="mt-2 text-zinc-500">AI-powered email workspace</p>
      </div>

      <div className="flex h-[75vh] gap-6">
        <EmailList
          emails={emails}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <EmailViewer id={selectedId} />
      </div>
    </div>
  );
}
