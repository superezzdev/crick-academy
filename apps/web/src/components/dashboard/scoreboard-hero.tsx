"use client";

import React, { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { Users, CreditCard, AlertTriangle, CalendarDays, Radio } from "lucide-react";

interface ScoreboardHeroProps {
  totalStudents?: number;
  feesCollectedThisMonth?: number;
  overdueCount?: number;
  upcomingSessionsCount?: number;
}

export function ScoreboardHero({
  totalStudents = 18,
  feesCollectedThisMonth = 13500,
  overdueCount = 11,
  upcomingSessionsCount = 2
}: ScoreboardHeroProps) {
  // State for the animated counter values (started at 0)
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [feesCount, setFeesCount] = useState<number>(0);
  const [overdueVal, setOverdueVal] = useState<number>(0);
  const [sessionsVal, setSessionsVal] = useState<number>(0);

  useEffect(() => {
    // Single orchestrated Framer Motion animation from 0 to 1
    const controls = animate(0, 1, {
      duration: 1.8,
      ease: [0.25, 1, 0.5, 1], // Smooth exponential deceleration curve
      onUpdate: (latest) => {
        setStudentsCount(Math.round(latest * totalStudents));
        setFeesCount(Math.round(latest * feesCollectedThisMonth));
        setOverdueVal(Math.round(latest * overdueCount));
        setSessionsVal(Math.round(latest * upcomingSessionsCount));
      }
    });

    return () => controls.stop();
  }, [totalStudents, feesCollectedThisMonth, overdueCount, upcomingSessionsCount]);

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-stump-gold/40 bg-gradient-to-br from-pitch-green-900 via-pitch-green-950 to-[#02110c] p-5 sm:p-7 shadow-2xl text-chalk">
      {/* Stadium LED Scoreboard Matrix Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(rgba(232, 196, 104, 0.35) 1px, transparent 1px)",
          backgroundSize: "6px 6px"
        }}
      />

      {/* Subtle Pitch Grass Grid Accent Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,196,104,0.12),transparent_70%)]" />

      {/* Scoreboard Top Live Banner */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stump-gold/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-7 items-center gap-1.5 rounded-full bg-stump-gold/15 px-3 py-1 text-[11px] font-bold tracking-widest text-stump-gold uppercase ring-1 ring-stump-gold/30">
            <Radio className="h-3 w-3 text-stump-gold" />
            <span>STADIUM LIVE SCOREBOARD</span>
          </div>
          <span className="hidden sm:inline-block text-xs text-chalk/60 font-mono">
            GROUND OPERATIONS • AUG 2026
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-stump-gold/80">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            SYSTEM OPERATIONAL
          </span>
          <span className="text-chalk/40">|</span>
          <span className="text-chalk/70">WANKHEDE TURF GROUND</span>
        </div>
      </div>

      {/* 4 Stadium Digital Scoreboard Metrics */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
        {/* Metric 1: Total Students */}
        <div className="group relative overflow-hidden rounded-xl border border-stump-gold/25 bg-black/40 p-4 sm:p-5 backdrop-blur-sm transition-colors hover:border-stump-gold/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-chalk/70 uppercase">
              TOTAL STUDENTS
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stump-gold/10 text-stump-gold">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-normal text-stump-gold drop-shadow-[0_0_12px_rgba(232,196,104,0.4)]">
              {studentsCount}
            </span>
            <span className="text-xs font-medium text-chalk/60">ENROLLED</span>
          </div>
          <p className="mt-2 text-[11px] text-chalk/50 font-mono">
            Across 3 active training batches
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stump-gold/80 to-transparent opacity-70" />
        </div>

        {/* Metric 2: Fees Collected This Month */}
        <div className="group relative overflow-hidden rounded-xl border border-stump-gold/25 bg-black/40 p-4 sm:p-5 backdrop-blur-sm transition-colors hover:border-stump-gold/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-chalk/70 uppercase">
              FEES COLLECTED (AUG)
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-stump-gold/80">₹</span>
            <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-normal text-stump-gold drop-shadow-[0_0_12px_rgba(232,196,104,0.4)]">
              {feesCount.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-emerald-400/90 font-mono">
            ₹57,000 3-Month total collected
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-70" />
        </div>

        {/* Metric 3: Overdue Payments */}
        <div className="group relative overflow-hidden rounded-xl border border-leather-red/35 bg-black/40 p-4 sm:p-5 backdrop-blur-sm transition-colors hover:border-leather-red/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-leather-red-300 uppercase">
              OVERDUE PAYMENTS
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-leather-red/20 text-leather-red-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-normal text-leather-red-400 drop-shadow-[0_0_12px_rgba(193,18,31,0.4)]">
              {overdueVal}
            </span>
            <span className="text-xs font-medium text-leather-red-300/80">DUES PENDING</span>
          </div>
          <p className="mt-2 text-[11px] text-leather-red-300/80 font-mono">
            WhatsApp reminder queue ready
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-leather-red to-transparent opacity-80" />
        </div>

        {/* Metric 4: Upcoming Net Sessions */}
        <div className="group relative overflow-hidden rounded-xl border border-stump-gold/25 bg-black/40 p-4 sm:p-5 backdrop-blur-sm transition-colors hover:border-stump-gold/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-chalk/70 uppercase">
              UPCOMING NET SESSIONS
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stump-gold/10 text-stump-gold">
              <CalendarDays className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-normal text-stump-gold drop-shadow-[0_0_12px_rgba(232,196,104,0.4)]">
              {sessionsVal}
            </span>
            <span className="text-xs font-medium text-chalk/60">SCHEDULED</span>
          </div>
          <p className="mt-2 text-[11px] text-chalk/50 font-mono">
            13 / 24 slots pre-booked
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stump-gold/80 to-transparent opacity-70" />
        </div>
      </div>
    </div>
  );
}
