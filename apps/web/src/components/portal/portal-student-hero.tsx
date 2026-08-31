"use client";

import React from "react";
import {
  Shield,
  Phone,
  Calendar,
  Award,
  Sparkles,
  Zap,
  Target,
  MessageCircle,
  Download,
  Share2,
  ChevronRight
} from "lucide-react";
import { Avatar, Badge, Button } from "@crick-academy/ui";
import { toast } from "sonner";
import type { StudentPortalData } from "@/lib/portal-data";

interface PortalStudentHeroProps {
  data: StudentPortalData;
  onNavigateToFees?: () => void;
  onNavigateToTeam?: () => void;
}

export function PortalStudentHero({
  data,
  onNavigateToFees,
  onNavigateToTeam
}: PortalStudentHeroProps) {
  const { student, careerSummary, tournamentContribution, pendingFeesTotal } = data;

  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const handleDownloadCard = () => {
    toast.success(`Player ID Pass Generated!`, {
      description: `Official digital academy badge saved for ${student.name} (#CA-${student.id.slice(-4).toUpperCase()}).`,
      icon: <Award className="h-4 w-4 text-stump-gold" />
    });
  };

  const handleContactCoach = () => {
    toast.info("Opening Coach Hotline", {
      description: `Connecting with Coach Vikram Rathour regarding ${student.name}'s training drills.`,
      icon: <MessageCircle className="h-4 w-4 text-emerald-600" />
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-pitch-green/40 bg-gradient-to-br from-pitch-green-900 via-pitch-green-950 to-[#041a13] p-6 sm:p-8 text-chalk shadow-2xl">
      {/* Decorative Cricket Background Elements */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-stump-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-leather-red/10 blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-10 select-none text-9xl font-heading font-black text-chalk">
        🏏
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top Hero Row: Avatar, Welcome Greeting & Role Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <Avatar
                fallback={student.name}
                size="lg"
                className="h-22 w-22 sm:h-24 sm:w-24 text-3xl font-extrabold ring-4 ring-stump-gold shadow-2xl bg-gradient-to-tr from-stump-gold to-chalk text-pitch-green-950"
              />
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-pitch-green border-2 border-chalk text-xs shadow-md">
                ⭐
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-md bg-stump-gold/25 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-stump-gold">
                  {student.batch}
                </span>
                <span className="rounded-md bg-chalk/15 px-2 py-0.5 text-[11px] font-mono text-chalk/80">
                  ID: #CA-{student.id.slice(-4).toUpperCase()}
                </span>
                <Badge
                  variant="pitch"
                  className="bg-emerald-950 border border-emerald-400/40 text-emerald-300 text-[10px] px-2 py-0.5"
                >
                  ● Active Enrolled Member
                </Badge>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-chalk uppercase">
                {student.name}
              </h2>

              <p className="text-xs sm:text-sm text-chalk/85 max-w-xl leading-relaxed">
                Welcome to your player locker room! You are playing for{" "}
                <button
                  onClick={onNavigateToTeam}
                  className="font-bold text-stump-gold hover:underline inline-flex items-center gap-0.5"
                >
                  {tournamentContribution.teamName} ({tournamentContribution.roleInTeam})
                </button>
                . Review your match scorecards, fee ledger, and upcoming turf sessions below.
              </p>
            </div>
          </div>

          {/* Action Buttons: Download Pass & Coach Chat */}
          <div className="flex flex-wrap sm:flex-col lg:flex-row items-stretch sm:items-end gap-2.5 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCard}
              className="gap-2 bg-chalk/10 border-chalk/30 text-chalk hover:bg-chalk/20 text-xs shadow-sm"
            >
              <Download className="h-3.5 w-3.5 text-stump-gold" />
              Digital ID Card
            </Button>
            <Button
              variant="pitch"
              size="sm"
              onClick={handleContactCoach}
              className="gap-2 bg-gradient-to-r from-stump-gold-600 to-stump-gold-500 text-pitch-green-950 font-bold hover:brightness-110 text-xs shadow-md"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat With Coach
            </Button>
          </div>
        </div>

        {/* Player Technical Profile Specs Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-2xl border border-chalk/15 bg-black/30 p-3 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-chalk/60 block">
              Batting Discipline
            </span>
            <p className="font-heading text-base font-bold text-stump-gold mt-0.5">
              {student.battingStyle.replace("_", " ")}
            </p>
          </div>

          <div className="rounded-2xl border border-chalk/15 bg-black/30 p-3 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-chalk/60 block">
              Bowling Style
            </span>
            <p className="font-heading text-base font-bold text-chalk mt-0.5 truncate">
              {student.bowlingStyle.replace(/_/g, " ")}
            </p>
          </div>

          <div className="rounded-2xl border border-chalk/15 bg-black/30 p-3 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-chalk/60 block">
              Age & Birthday
            </span>
            <p className="font-heading text-base font-bold text-chalk mt-0.5">
              {student.age} Yrs • {formatDate(student.dateOfBirth)}
            </p>
          </div>

          <div className="rounded-2xl border border-chalk/15 bg-black/30 p-3 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-chalk/60 block">
              Fee Ledger Status
            </span>
            <div className="mt-0.5">
              {(student.pendingFeesCount ?? 0) > 0 ? (
                <button
                  onClick={onNavigateToFees}
                  className="font-heading text-xs font-bold text-leather-red-300 hover:underline flex items-center gap-1"
                >
                  ⚠️ ₹{pendingFeesTotal.toLocaleString("en-IN")} Due (Pay Now)
                </button>
              ) : (
                <span className="font-heading text-xs font-bold text-emerald-400">
                  ✓ All Dues Cleared
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Career Stats Scorecard Strip */}
        <div className="rounded-2xl border border-stump-gold/30 bg-gradient-to-r from-black/50 via-pitch-green-950/60 to-black/50 p-4 sm:p-5 backdrop-blur-lg">
          <div className="flex items-center justify-between pb-3 border-b border-chalk/15">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-stump-gold" />
              <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-chalk">
                Career Performance Overview
              </span>
            </div>
            <span className="text-[11px] text-chalk/70 font-mono">
              Academy Tournaments & Practice Matches
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 text-center">
            <div>
              <p className="text-[10px] uppercase font-bold text-chalk/60">Career Runs</p>
              <p className="font-heading text-2xl sm:text-3xl font-black text-stump-gold mt-0.5">
                {careerSummary.totalRuns}
              </p>
              <p className="text-[10px] text-chalk/70">
                HS: {careerSummary.highestScore} • {careerSummary.fifties} 50s
              </p>
            </div>

            <div className="sm:border-l border-chalk/15 sm:pl-4">
              <p className="text-[10px] uppercase font-bold text-chalk/60">Strike Rate</p>
              <p className="font-heading text-2xl sm:text-3xl font-black text-emerald-400 mt-0.5">
                {careerSummary.strikeRate}
              </p>
              <p className="text-[10px] text-chalk/70">
                {careerSummary.ballsFaced} Balls Faced
              </p>
            </div>

            <div className="sm:border-l border-chalk/15 sm:pl-4">
              <p className="text-[10px] uppercase font-bold text-chalk/60">Total Wickets</p>
              <p className="font-heading text-2xl sm:text-3xl font-black text-leather-red-300 mt-0.5">
                {careerSummary.totalWickets}
              </p>
              <p className="text-[10px] text-chalk/70">
                Best: {careerSummary.bestBowling}
              </p>
            </div>

            <div className="lg:border-l border-chalk/15 lg:pl-4">
              <p className="text-[10px] uppercase font-bold text-chalk/60">Bowling Econ</p>
              <p className="font-heading text-2xl sm:text-3xl font-black text-stump-gold mt-0.5">
                {careerSummary.economy}
              </p>
              <p className="text-[10px] text-chalk/70">
                {careerSummary.oversBowled} Overs Bowled
              </p>
            </div>

            <div className="sm:border-l border-chalk/15 sm:pl-4">
              <p className="text-[10px] uppercase font-bold text-chalk/60">Catches / Dismissals</p>
              <p className="font-heading text-2xl sm:text-3xl font-black text-sky-400 mt-0.5">
                {careerSummary.totalCatches}
              </p>
              <p className="text-[10px] text-chalk/70">Fielding Impact</p>
            </div>

            <div className="sm:border-l border-chalk/15 sm:pl-4">
              <p className="text-[10px] uppercase font-bold text-chalk/60">Match Win Rate</p>
              <p className="font-heading text-2xl sm:text-3xl font-black text-emerald-300 mt-0.5">
                {careerSummary.winRate}%
              </p>
              <p className="text-[10px] text-chalk/70">
                {careerSummary.matchesPlayed} Matches Played
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
