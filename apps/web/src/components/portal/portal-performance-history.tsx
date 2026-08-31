"use client";

import React from "react";
import {
  Trophy,
  Award,
  Zap,
  Target,
  Flame,
  Shield,
  MessageCircle,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight
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
import type { StudentFullProfile } from "@/lib/data";
import type { StudentCareerSummary } from "@/lib/portal-data";

interface PortalPerformanceHistoryProps {
  student: StudentFullProfile;
  careerSummary: StudentCareerSummary;
}

export function PortalPerformanceHistory({
  student,
  careerSummary
}: PortalPerformanceHistoryProps) {
  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-8" id="performance-section">
      {/* 1. Career Totals Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Batting Card */}
        <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stump-gold/25 text-stump-gold-800 dark:text-stump-gold">
                🏏
              </div>
              <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                BATTING TOTALS
              </h3>
            </div>
            <Badge variant="gold" className="text-[10px]">
              {student.battingStyle.replace("_", " ")}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Runs</span>
              <p className="font-heading text-2xl font-black text-pitch-green dark:text-stump-gold">
                {careerSummary.totalRuns}
              </p>
            </div>
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Highest</span>
              <p className="font-heading text-2xl font-black text-pitch-green dark:text-chalk">
                {careerSummary.highestScore}
              </p>
            </div>
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">50s</span>
              <p className="font-heading text-2xl font-black text-pitch-green dark:text-chalk">
                {careerSummary.fifties}
              </p>
            </div>
          </div>

          <div className="flex justify-between text-xs pt-1 text-muted-foreground px-1">
            <span>Innings Batted: <strong>{careerSummary.innings}</strong></span>
            <span>Strike Rate: <strong>{careerSummary.strikeRate}</strong></span>
          </div>
        </div>

        {/* Bowling Card */}
        <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-leather-red/15 text-leather-red">
                🎯
              </div>
              <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                BOWLING TOTALS
              </h3>
            </div>
            <Badge variant="leather" className="text-[10px]">
              {student.bowlingStyle.replace(/_/g, " ")}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Wickets</span>
              <p className="font-heading text-2xl font-black text-leather-red">
                {careerSummary.totalWickets}
              </p>
            </div>
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Best</span>
              <p className="font-heading text-2xl font-black text-pitch-green dark:text-chalk">
                {careerSummary.bestBowling}
              </p>
            </div>
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Economy</span>
              <p className="font-heading text-2xl font-black text-pitch-green dark:text-chalk">
                {careerSummary.economy}
              </p>
            </div>
          </div>

          <div className="flex justify-between text-xs pt-1 text-muted-foreground px-1">
            <span>Overs Bowled: <strong>{careerSummary.oversBowled}</strong></span>
            <span>Runs Given: <strong>{careerSummary.runsConceded}</strong></span>
          </div>
        </div>

        {/* Impact & Honors Card */}
        <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
                🏆
              </div>
              <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                HONORS & IMPACT
              </h3>
            </div>
            <Badge variant="paid" className="text-[10px]">
              {careerSummary.winRate}% Win Rate
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">MOTM</span>
              <p className="font-heading text-2xl font-black text-stump-gold-800 dark:text-stump-gold">
                {careerSummary.motmAwards}
              </p>
            </div>
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Catches</span>
              <p className="font-heading text-2xl font-black text-sky-600 dark:text-sky-400">
                {careerSummary.totalCatches}
              </p>
            </div>
            <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Matches</span>
              <p className="font-heading text-2xl font-black text-pitch-green dark:text-chalk">
                {careerSummary.matchesPlayed}
              </p>
            </div>
          </div>

          <div className="flex justify-between text-xs pt-1 text-muted-foreground px-1">
            <span>Discipline: <strong>Level 1 Elite</strong></span>
            <span>Squad Role: <strong>Star Player</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Match-by-Match Timeline & Coach Assessment Notes */}
      <Card className="border-border/80 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
                  <Trophy className="h-4 w-4" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">
                  MATCH LOG & COACH FEEDBACK
                </CardTitle>
              </div>
              <CardDescription className="mt-1">
                Detailed match scorecards, player contributions, and personal coaching assessments
              </CardDescription>
            </div>

            <Badge variant="pitch" className="self-start sm:self-auto text-xs px-3 py-1">
              {student.performances.length} MATCHES RECORDED
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {student.performances.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground space-y-2">
              <p className="text-sm font-semibold">No tournament match logs found yet.</p>
              <p className="text-xs">Upcoming match records will be automatically updated here by the coaches.</p>
            </div>
          ) : (
            student.performances.map((perf, index) => {
              const isWon = perf.match.result === "WON";
              const isMotm = perf.match.playerOfTheMatchId === student.id;

              return (
                <div
                  key={perf.id}
                  className="rounded-2xl border-2 border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm hover:border-pitch-green/40 transition-all"
                >
                  {/* Top Match Title & Result */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-heading text-lg sm:text-xl font-black text-pitch-green dark:text-chalk">
                          vs {perf.match.opponent}
                        </h4>
                        {isMotm && (
                          <Badge variant="gold" className="text-[10px] gap-1 px-2 py-0.5 font-bold shadow-xs">
                            🏆 Player of the Match
                          </Badge>
                        )}
                        <Badge
                          variant={isWon ? "paid" : "leather"}
                          className="text-[10px] px-2.5 py-0.5 font-bold"
                        >
                          {perf.match.result}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1 font-semibold text-foreground">
                          <Calendar className="h-3.5 w-3.5 text-pitch-green" />
                          {formatDate(perf.match.date)}
                        </span>
                        <span>•</span>
                        <span>{perf.match.tournament.name}</span>
                        {perf.match.stage && (
                          <>
                            <span>•</span>
                            <span className="text-stump-gold-800 dark:text-stump-gold font-bold">
                              {perf.match.stage}
                            </span>
                          </>
                        )}
                        {perf.match.venue && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                              {perf.match.venue}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Match Score summary if available */}
                    {perf.match.summary && (
                      <div className="rounded-lg bg-chalk-100/90 px-3 py-1.5 text-right dark:bg-pitch-green-950/60 self-start sm:self-auto">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Match Outcome</p>
                        <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk">
                          {perf.match.summary}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Student Performance Numbers Strip */}
                  <div className="grid grid-cols-3 gap-3 rounded-xl bg-chalk-50/90 p-3 sm:p-4 text-center dark:bg-pitch-green-950/40 border border-border/50">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Batting Score
                      </span>
                      <p className="font-heading text-xl sm:text-2xl font-black text-pitch-green dark:text-chalk mt-0.5">
                        {perf.runs} <span className="text-xs font-normal text-muted-foreground">{perf.ballsFaced ? `(${perf.ballsFaced}b)` : "Runs"}</span>
                      </p>
                    </div>

                    <div className="border-x border-border/60 px-2">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Bowling Figures
                      </span>
                      <p className="font-heading text-xl sm:text-2xl font-black text-leather-red mt-0.5">
                        {perf.wickets} <span className="text-xs font-normal text-muted-foreground">{perf.oversBowled ? `(${perf.oversBowled} ov)` : "Wickets"}</span>
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        Fielding
                      </span>
                      <p className="font-heading text-xl sm:text-2xl font-black text-stump-gold-800 dark:text-stump-gold mt-0.5">
                        {perf.catches} <span className="text-xs font-normal text-muted-foreground">Catches</span>
                      </p>
                    </div>
                  </div>

                  {/* Coach's Personal Assessment Quote */}
                  {perf.notes && (
                    <div className="rounded-xl border border-pitch-green/20 bg-pitch-green-50/60 p-4 text-xs dark:bg-pitch-green-950/40">
                      <div className="flex items-center gap-1.5 pb-1">
                        <MessageCircle className="h-4 w-4 text-pitch-green dark:text-stump-gold" />
                        <span className="font-heading text-xs font-bold uppercase tracking-wide text-pitch-green dark:text-stump-gold">
                          Coach Vikram&apos;s Match Assessment
                        </span>
                      </div>
                      <p className="italic text-foreground/90 leading-relaxed text-xs pl-5 border-l-2 border-pitch-green/40 mt-1">
                        &ldquo;{perf.notes}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
