"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Award,
  Crown,
  Shield,
  Calendar,
  MapPin,
  ArrowRight,
  Flame,
  Star,
  Users,
  CheckCircle2,
  Swords
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button
} from "@crick-academy/ui";
import type { StudentTournamentContribution } from "@/lib/portal-data";

interface PortalTournamentContributionProps {
  contribution: StudentTournamentContribution;
  studentName: string;
}

export function PortalTournamentContribution({
  contribution,
  studentName
}: PortalTournamentContributionProps) {
  const {
    teamName,
    teamShortName,
    teamColor,
    roleInTeam,
    isCaptain,
    isViceCaptain,
    teammatesCount,
    matchesPlayedInTournament,
    teamMatchesWon,
    teamMatchesLost,
    standoutPerformances,
    currentStanding,
    upcomingFixture
  } = contribution;

  return (
    <div className="space-y-8" id="tournament-section">
      {/* 1. Team Assignment Hero Banner */}
      <div
        className="relative overflow-hidden rounded-3xl border-2 border-border/80 p-6 sm:p-8 text-chalk shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${teamColor} 0%, #051812 100%)`
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-black/40 border-2 border-chalk/30 font-heading text-3xl font-black text-stump-gold shadow-lg backdrop-blur-md">
              {teamShortName}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-chalk/80">
                  Official Academy Team
                </span>
                <Badge variant="gold" className="text-[10px] px-2 py-0.5 font-bold">
                  {roleInTeam}
                </Badge>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-chalk uppercase">
                {teamName}
              </h2>

              <p className="text-xs text-chalk/80 flex items-center gap-3">
                <span>Squad: <strong>{teammatesCount} Registered Players</strong></span>
                <span>•</span>
                <span>Tournament Form: <strong>{teamMatchesWon}W - {teamMatchesLost}L</strong></span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col items-stretch gap-2 shrink-0">
            <Link href="/dashboard/tournaments">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-chalk/10 border-chalk/30 text-chalk hover:bg-chalk/20 text-xs shadow-sm w-full"
              >
                <Trophy className="h-3.5 w-3.5 text-stump-gold" />
                Tournament Arena Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Standings & Next Fixture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: League Standing & Team Record (6 cols) */}
        <Card className="lg:col-span-6 border-border/80 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
                  <Crown className="h-4 w-4" />
                </div>
                <CardTitle className="text-xl">TEAM LEAGUE STANDING</CardTitle>
              </div>
              <Badge variant="paid" className="text-xs">
                Rank #{currentStanding.rank}
              </Badge>
            </div>
            <CardDescription>
              Monsoon Super League & Summer Cup points tally
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center rounded-xl bg-chalk-50 p-4 dark:bg-pitch-green-950/40 border border-border/60">
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  Matches Won
                </span>
                <p className="font-heading text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {teamMatchesWon}
                </p>
              </div>
              <div className="border-x border-border/60">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  League Points
                </span>
                <p className="font-heading text-2xl font-black text-pitch-green dark:text-stump-gold mt-0.5">
                  {currentStanding.points} PTS
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  Net Run Rate
                </span>
                <p className="font-heading text-2xl font-black text-pitch-green dark:text-chalk mt-0.5">
                  {currentStanding.netRunRate}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-pitch-green/20 bg-pitch-green-50/70 p-3.5 text-xs text-pitch-green-900 dark:bg-pitch-green-950/40 dark:text-chalk flex items-center justify-between">
              <span className="font-semibold">Qualification Status:</span>
              <Badge variant="gold" className="text-[10px] font-bold">
                {currentStanding.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Right: Next Upcoming Match Fixture (6 cols) */}
        <Card className="lg:col-span-6 border-border/80 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-leather-red/15 text-leather-red">
                  <Swords className="h-4 w-4" />
                </div>
                <CardTitle className="text-xl">NEXT TEAM FIXTURE</CardTitle>
              </div>
              <Badge variant="leather" className="text-xs">
                UPCOMING CLASH
              </Badge>
            </div>
            <CardDescription>
              Scheduled tournament game for {teamName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingFixture ? (
              <div className="rounded-2xl border-2 border-border/80 bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {upcomingFixture.stage}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-stump-gold-800 dark:text-stump-gold">
                    Toss in 48 Hours
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-border/60">
                  <div className="font-heading text-lg font-black text-pitch-green dark:text-chalk">
                    {teamName}
                  </div>
                  <span className="font-heading text-xs font-bold text-muted-foreground uppercase px-2">
                    VS
                  </span>
                  <div className="font-heading text-lg font-black text-leather-red">
                    {upcomingFixture.opponent}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
                  <div className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Calendar className="h-3.5 w-3.5 text-pitch-green" />
                    <span>{upcomingFixture.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-pitch-green" />
                    <span>{upcomingFixture.venue}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground text-xs">
                No active fixture scheduled this week. Check back for tournament quarter-finals.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 3. Standout Match Performances & Trophies */}
      <Card className="border-border/80 shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
                <Award className="h-4 w-4" />
              </div>
              <CardTitle className="text-xl">
                STANDOUT PERFORMANCES & AWARDS ({studentName})
              </CardTitle>
            </div>
            <Badge variant="gold" className="text-xs">
              Hall of Highlights
            </Badge>
          </div>
          <CardDescription>
            Key turning points, match-winning knocks, and bowling spells delivered in official matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          {standoutPerformances.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-xs">
              No standout milestones logged yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {standoutPerformances.map((standout, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border-2 p-5 space-y-3 transition-all ${
                    standout.isMotm
                      ? "border-stump-gold/60 bg-gradient-to-br from-stump-gold/15 via-chalk-50 to-chalk-100/90 dark:from-stump-gold/10 dark:to-pitch-green-950/40 shadow-md"
                      : "border-border/80 bg-card shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pitch-green text-chalk font-heading text-xs font-bold shadow-xs">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-heading text-base font-bold text-pitch-green dark:text-chalk">
                          vs {standout.opponent}
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          {standout.stage} • {standout.date}
                        </p>
                      </div>
                    </div>

                    {standout.isMotm && (
                      <Badge variant="gold" className="text-[10px] font-bold shadow-xs">
                        🏆 MOTM Award
                      </Badge>
                    )}
                  </div>

                  {/* Highlight Stat numbers */}
                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-card p-3 text-center text-xs border border-border/60">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground">Runs</span>
                      <p className="font-heading text-lg font-black text-pitch-green dark:text-stump-gold">
                        {standout.runs}
                      </p>
                    </div>
                    <div className="border-x border-border/60">
                      <span className="text-[9px] uppercase font-bold text-muted-foreground">Wickets</span>
                      <p className="font-heading text-lg font-black text-leather-red">
                        {standout.wickets}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground">Catches</span>
                      <p className="font-heading text-lg font-black text-sky-600 dark:text-sky-400">
                        {standout.catches}
                      </p>
                    </div>
                  </div>

                  {standout.notes && (
                    <p className="text-xs italic text-foreground/80 bg-chalk-50/80 p-2.5 rounded-lg border border-border/40 dark:bg-pitch-green-950/40">
                      &ldquo;{standout.notes}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
