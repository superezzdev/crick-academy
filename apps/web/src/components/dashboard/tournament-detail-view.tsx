"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button
} from "@crick-academy/ui";
import {
  ArrowLeft,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Swords,
  Award,
  Crown,
  Medal,
  Clock,
  CheckCircle2,
  Share2,
  Download,
  Flame,
  Layers,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import type { TournamentDetailed } from "@crick-academy/types";
import type { TournamentLeaderboardData } from "@/lib/data";
import { TournamentFixtures } from "./tournament-fixtures";
import { TournamentTeams } from "./tournament-teams";
import { TournamentLeaderboard } from "./tournament-leaderboard";

interface TournamentDetailViewProps {
  tournament: TournamentDetailed;
  leaderboard: TournamentLeaderboardData;
}

export function TournamentDetailView({
  tournament,
  leaderboard
}: TournamentDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"FIXTURES" | "TEAMS" | "LEADERBOARD">("FIXTURES");

  const formatDateRange = (startDate: Date | string, endDate: Date | string) => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const startMonth = s.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const endMonth = e.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
    return `${startMonth} – ${endMonth}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ONGOING":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            LIVE ONGOING LEAGUE
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            COMPLETED CHAMPIONSHIP
          </span>
        );
      case "UPCOMING":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-chalk-200/80 dark:bg-pitch-green-950/60 px-3 py-1 text-xs font-bold text-ink/80 dark:text-chalk/80">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            UPCOMING EVENT
          </span>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Top Back & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/dashboard/tournaments">
          <Button variant="ghost" size="sm" className="gap-2 text-xs font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Tournaments Arena
          </Button>
        </Link>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Tournament Link Copied", {
                description: `Share link for ${tournament.name} copied to clipboard.`
              });
            }}
            className="gap-1.5 text-xs"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share Tournament
          </Button>

          <Button
            variant="pitch"
            size="sm"
            onClick={() => {
              toast.success("Scorecard Export Triggered", {
                description: `Exporting official PDF match statistics ledger for ${tournament.name}.`
              });
            }}
            className="gap-1.5 text-xs shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-stump-gold" />
            Export Scorecard
          </Button>
        </div>
      </div>

      {/* 2. Hero Tournament Banner */}
      <div className="rounded-2xl border border-pitch-green-800/30 bg-gradient-to-br from-pitch-green-900 via-pitch-green-800 to-pitch-green-950 p-6 sm:p-8 text-chalk shadow-lg relative overflow-hidden">
        {/* Background Trophy Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 opacity-10 pointer-events-none select-none text-stump-gold">
          <Trophy className="h-72 w-72" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-stump-gold/20 px-2.5 py-0.5 text-xs font-bold text-stump-gold border border-stump-gold/30 font-mono uppercase">
                  <Trophy className="h-3.5 w-3.5" />
                  {tournament.format || "Academy Championship"}
                </div>
                {getStatusBadge(tournament.status)}
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-chalk">
                {tournament.name}
              </h1>

              <p className="text-chalk/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
                {tournament.description}
              </p>
            </div>

            {/* Champion Box for Completed Tournaments */}
            {tournament.championTeam && (
              <div className="rounded-xl border border-stump-gold/50 bg-stump-gold/20 p-4 backdrop-blur-md shrink-0 text-center sm:text-right">
                <div className="inline-flex items-center gap-1 text-[11px] font-mono font-black uppercase text-stump-gold tracking-wider">
                  <Crown className="h-3.5 w-3.5 fill-stump-gold" />
                  CHAMPIONSHIP WINNER
                </div>
                <div className="mt-1 font-heading text-2xl font-black text-chalk">
                  {tournament.championTeam}
                </div>
                {tournament.runnerUpTeam && (
                  <div className="text-[11px] text-chalk/70 mt-0.5">
                    Runner-up: {tournament.runnerUpTeam}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-chalk/15 pt-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4 text-stump-gold shrink-0" />
              <div>
                <div className="text-[10px] text-chalk/60 font-mono uppercase">Dates</div>
                <div className="font-semibold text-chalk">
                  {formatDateRange(tournament.startDate, tournament.endDate)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-stump-gold shrink-0" />
              <div>
                <div className="text-[10px] text-chalk/60 font-mono uppercase">Ground</div>
                <div className="font-semibold text-chalk truncate">
                  {tournament.location || "Main Oval"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="h-4 w-4 text-stump-gold shrink-0" />
              <div>
                <div className="text-[10px] text-chalk/60 font-mono uppercase">Squads</div>
                <div className="font-semibold text-chalk">
                  {tournament.totalTeams} Teams Competing
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Swords className="h-4 w-4 text-stump-gold shrink-0" />
              <div>
                <div className="text-[10px] text-chalk/60 font-mono uppercase">Matches</div>
                <div className="font-semibold text-chalk">
                  {tournament.completedMatchesCount} / {tournament.totalMatchesCount} Completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tab Navigation Controls */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab("FIXTURES")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all shrink-0 ${
            activeTab === "FIXTURES"
              ? "bg-pitch-green text-chalk shadow-sm"
              : "text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:hover:bg-pitch-green-950"
          }`}
        >
          <Swords className="h-4 w-4" />
          <span>Fixtures & Results</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] ${
              activeTab === "FIXTURES"
                ? "bg-stump-gold text-ink font-black"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {tournament.matches.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("TEAMS")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all shrink-0 ${
            activeTab === "TEAMS"
              ? "bg-pitch-green text-chalk shadow-sm"
              : "text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:hover:bg-pitch-green-950"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Team Compositions</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] ${
              activeTab === "TEAMS"
                ? "bg-stump-gold text-ink font-black"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {tournament.teams.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("LEADERBOARD")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all shrink-0 ${
            activeTab === "LEADERBOARD"
              ? "bg-pitch-green text-chalk shadow-sm"
              : "text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:hover:bg-pitch-green-950"
          }`}
        >
          <Trophy className="h-4 w-4 text-stump-gold" />
          <span>Leaderboard & Awards</span>
          {leaderboard.batting.length > 0 && (
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                activeTab === "LEADERBOARD"
                  ? "bg-stump-gold text-ink font-black"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Live
            </span>
          )}
        </button>
      </div>

      {/* 4. Active Tab Content */}
      {activeTab === "FIXTURES" && (
        <TournamentFixtures fixtures={tournament.matches} />
      )}

      {activeTab === "TEAMS" && (
        <TournamentTeams teams={tournament.teams} />
      )}

      {activeTab === "LEADERBOARD" && (
        <TournamentLeaderboard
          leaderboard={leaderboard}
          tournamentName={tournament.name}
        />
      )}
    </div>
  );
}
