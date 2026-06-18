"use client";

import { Loader2, Trash2, X } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  meeting: {
    id: string;
    summary: string;
  } | null;
  onClose: () => void;
  onDelete: () => Promise<void> | void;
};

export default function DeleteEventModal({
  open,
  meeting,
  onClose,
  onDelete,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!open || !meeting) return null;

  async function handleDelete() {
    try {
      setLoading(true);
      await onDelete();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <Trash2 className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="text-center text-2xl font-bold text-white">
          Delete Meeting?
        </h2>

        <p className="mt-3 text-center text-zinc-400">
          Are you sure you want to delete
        </p>

        <p className="mt-2 text-center text-lg font-semibold text-white">
          {meeting.summary}
        </p>

        <p className="mt-4 text-center text-sm text-zinc-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-zinc-700 py-3 font-medium text-white transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
