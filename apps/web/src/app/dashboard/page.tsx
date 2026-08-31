import React from "react";
import { Metadata } from "next";
import { ScoreboardHero } from "@/components/dashboard/scoreboard-hero";
import { FeeStatusTable } from "@/components/dashboard/fee-status-table";
import { UpcomingSessionsCard } from "@/components/dashboard/upcoming-sessions-card";
import {
  getDashboardScoreboardStats,
  getFeeStatusList,
  getUpcomingSessions
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Owner Dashboard | CrickAcademy",
  description:
    "Live stadium scoreboard, fee status collections ledger, upcoming net practice session bookings, and squad management."
};

export default function DashboardPage() {
  const stats = getDashboardScoreboardStats();
  const fees = getFeeStatusList();
  const sessions = getUpcomingSessions();

  return (
    <div className="space-y-8">
      {/* 1. Hero Scoreboard (Stadium Digital LED Theme with Framer Motion Count-up) */}
      <ScoreboardHero
        totalStudents={stats.totalStudents}
        feesCollectedThisMonth={stats.feesCollectedThisMonth}
        overdueCount={stats.overdueCount}
        upcomingSessionsCount={stats.upcomingSessionsCount}
      />

      {/* 2. Two Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Fee Status Table (7 cols on large screens) */}
        <div className="lg:col-span-7">
          <FeeStatusTable initialFees={fees} />
        </div>

        {/* Right Column: Upcoming Net Sessions Card (5 cols on large screens) */}
        <div className="lg:col-span-5">
          <UpcomingSessionsCard sessions={sessions} />
        </div>
      </div>
    </div>
  );
}
