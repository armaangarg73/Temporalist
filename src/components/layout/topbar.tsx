export function Topbar() {
  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">Command Center</h2>

        <p className="text-sm text-zinc-400">
          Manage email, calendar and AI workflows
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
        <span>Search commands</span>

        <kbd className="rounded-md border border-zinc-700 px-2 py-1 text-xs">
          Ctrl K
        </kbd>
      </div>
    </div>
  );
}
