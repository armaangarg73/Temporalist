import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, Bot, Sparkles, ArrowRight, Brain } from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-10 backdrop-blur-xl">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <Sparkles className="h-3 w-3" />
              AI Executive Assistant
            </div>

            <h1 className="mt-6 text-6xl font-bold tracking-tight text-white md:text-7xl">
              The Operating System
              <br />
              for Email & Calendar
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-300">
              Replace clicks with commands. Manage Gmail and Google Calendar
              through AI-powered workflows.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-300">
                Gmail
              </span>

              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                Google Calendar
              </span>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                AI Workflows
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-500">
                Connect Gmail
              </Button>

              <Button size="lg" className="bg-blue-600 hover:bg-blue-500">
                Connect Calendar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="group border-zinc-800 bg-zinc-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_0_40px_rgba(239,68,68,.12)]">
            <CardContent className="p-7">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-red-500/10 p-4">
                  <Mail className="h-7 w-7 text-red-400" />
                </div>

                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                  Offline
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">Gmail</h3>

              <p className="mt-3 text-zinc-400">
                AI summaries, smart search, priority inbox and automated email
                workflows.
              </p>

              <Button className="mt-6 w-full bg-violet-600 hover:bg-violet-500">
                Connect Gmail
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-zinc-800 bg-zinc-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,.12)]">
            <CardContent className="p-7">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-blue-500/10 p-4">
                  <Calendar className="h-7 w-7 text-blue-400" />
                </div>

                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                  Offline
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                Google Calendar
              </h3>

              <p className="mt-3 text-zinc-400">
                Schedule meetings, coordinate events and automate planning from
                a single workspace.
              </p>

              <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-500">
                Connect Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden border-zinc-800 bg-zinc-900/60 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-500/10 p-3">
                <Brain className="h-6 w-6 text-violet-400" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  AI Command Center
                </h3>

                <p className="text-sm text-zinc-500">
                  Natural language workflows powered by Temporalist.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black/30 p-6">
              <p className="text-sm uppercase tracking-wider text-zinc-500">
                Example Command
              </p>

              <p className="mt-4 text-lg leading-relaxed text-zinc-300">
                Send a calendar invite to friend@corsair.dev next Thursday at
                9:00 AM and email them saying I look forward to meeting.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
                <p className="font-medium text-white">Summarize Inbox</p>
                <p className="mt-1 text-sm text-zinc-500">
                  AI-generated email summaries
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
                <p className="font-medium text-white">Schedule Meeting</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Create events using natural language
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
                <p className="font-medium text-white">Draft Email</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Generate replies instantly
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/60 backdrop-blur-xl">
          <CardContent className="p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                Activity Timeline
              </h2>

              <span className="text-sm text-zinc-500">
                Waiting for integrations
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-dashed border-zinc-800 p-4 text-zinc-500">
                Gmail connected
              </div>

              <div className="rounded-2xl border border-dashed border-zinc-800 p-4 text-zinc-500">
                Calendar synced
              </div>

              <div className="rounded-2xl border border-dashed border-zinc-800 p-4 text-zinc-500">
                Meeting invite created
              </div>

              <div className="rounded-2xl border border-dashed border-zinc-800 p-4 text-zinc-500">
                AI workflow executed
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-violet-400">
              Waiting for your first workflow
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
