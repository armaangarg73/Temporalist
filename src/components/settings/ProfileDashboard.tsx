"use client";

import useProfile from "@/hooks/useProfile";

import StatsCards from "./StatsCard";
import ActivityChart from "./ActivityChart";
import AIInsights from "./AIInsights";
import RecentActivity from "./RecentActivity";

export default function ProfileDashboard() {
  const { data, loading } = useProfile();

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 text-zinc-400">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <StatsCards data={data} />

      <ActivityChart data={data} />

      <AIInsights data={data} />

      <RecentActivity data={data} />
    </>
  );
}
