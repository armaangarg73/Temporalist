import { CalendarDays } from "lucide-react";

export default function CalendarHeader() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/10 p-3">
              <CalendarDays className="h-6 w-6 text-violet-400" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">Calendar</h1>

              <p className="mt-1 text-zinc-500">
                Stay on top of your meetings and schedule
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
          <span className="text-sm font-medium text-emerald-400">
            ● Google Calendar Connected
          </span>
        </div>
      </div>
    </>
  );
}
