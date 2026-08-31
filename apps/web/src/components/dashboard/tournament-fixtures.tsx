"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Button,
  Avatar
} from "@crick-academy/ui";
import {
  Calendar,
  MapPin,
  Swords,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  Target,
  Crown
} from "lucide-react";
import type { TournamentFixture } from "@crick-academy/types";

interface TournamentFixturesProps {
  fixtures: TournamentFixture[];
}

export function TournamentFixtures({ fixtures }: TournamentFixturesProps) {
  const [expandedMatchIds, setExpandedMatchIds] = useState<Set<string>>(new Set([fixtures[0]?.id || ""]));

  const toggleExpand = (matchId: string) => {
    setExpandedMatchIds((prev) => {
      const next = new Set(prev);
      if (next.has(matchId)) {
        next.delete(matchId);
      } else {
        next.add(matchId);
      }
      return next;
    });
  };

  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatTime = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  if (fixtures.length === 0) {
    return (
      <Card className="border-dashed border-2 border-border/80 py-16 text-center">
        <CardContent className="space-y-4 max-w-sm mx-auto">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-chalk-200/80 text-pitch-green dark:bg-pitch-green-950 dark:text-stump-gold">
            <Swords className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold">No Fixtures Scheduled</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tournament fixtures are currently being drawn by academy coaches. Check back soon for schedule updates.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/dashboard/tournaments">
              <Button variant="pitch" size="sm" className="text-xs font-bold shadow-sm">
                Explore Tournaments Hub
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {fixtures.map((match, idx) => {
        const isExpanded = expandedMatchIds.has(match.id);
        const isCompleted = match.result !== "PENDING";
        const hasPerformances = (match.performances && match.performances.length > 0);

        return (
          <Card
            key={match.id}
            className="border border-border/80 bg-card hover:border-pitch-green/60 transition-all"
          >
            {/* 1. Fixture Header */}
            <CardHeader className="pb-3 border-b border-border/50 bg-chalk-50/40 dark:bg-pitch-green-950/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="pitch" className="font-mono text-[10px] uppercase">
                    {match.stage || `Fixture #${idx + 1}`}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Match ID: {match.id}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                    <span>{formatDate(match.date)} • {formatTime(match.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                    <span className="truncate">{match.venue || "Academy Oval"}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* 2. Teams & Scores Showcase */}
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Home Team */}
                <div className="flex-1 space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: match.homeTeam?.color || "#0B3D2E" }}
                    />
                    <span className="font-heading text-xl sm:text-2xl font-bold text-pitch-green dark:text-chalk">
                      {match.homeTeamName || "Team Alpha"}
                    </span>
                  </div>
                  {match.homeScore ? (
                    <div className="font-mono text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                      {match.homeScore}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground font-mono">
                      Lineup Announced
                    </div>
                  )}
                </div>

                {/* VS / Result Center Indicator */}
                <div className="flex flex-col items-center justify-center shrink-0 px-4">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-chalk-200 dark:bg-pitch-green-900 border border-border text-xs font-heading font-black text-muted-foreground">
                    VS
                  </div>
                  {isCompleted ? (
                    <Badge variant="paid" className="mt-2 text-[10px] gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      COMPLETED
                    </Badge>
                  ) : (
                    <Badge variant="gold" className="mt-2 text-[10px] gap-1">
                      <Clock className="h-3 w-3" />
                      SCHEDULED
                    </Badge>
                  )}
                </div>

                {/* Away Team */}
                <div className="flex-1 space-y-1 text-left md:text-right">
                  <div className="flex items-center md:justify-end gap-2">
                    <span className="font-heading text-xl sm:text-2xl font-bold text-pitch-green dark:text-chalk">
                      {match.awayTeamName || match.opponent || "Team Beta"}
                    </span>
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: match.awayTeam?.color || "#C1121F" }}
                    />
                  </div>
                  {match.awayScore ? (
                    <div className="font-mono text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                      {match.awayScore}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground font-mono">
                      Lineup Announced
                    </div>
                  )}
                </div>
              </div>

              {/* Match Result Banner */}
              {match.summary && (
                <div className="rounded-xl border border-pitch-green/20 bg-pitch-green/5 dark:bg-pitch-green-950/40 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-stump-gold" />
                    <span className="font-bold text-pitch-green dark:text-chalk">
                      Result: {match.summary}
                    </span>
                  </div>

                  {/* Player of the Match */}
                  {match.playerOfTheMatch && (
                    <div className="inline-flex items-center gap-2 rounded-lg bg-stump-gold/20 border border-stump-gold/40 px-2.5 py-1 text-[11px] font-semibold text-stump-gold-900 dark:text-stump-gold-200">
                      <Award className="h-3.5 w-3.5 text-stump-gold-700 dark:text-stump-gold" />
                      <span>POTM: <strong>{match.playerOfTheMatch.name}</strong></span>
                    </div>
                  )}
                </div>
              )}

              {/* Expandable Scorecard Button & Drawer */}
              {hasPerformances && (
                <div className="space-y-4 pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(match.id)}
                      className="gap-2 text-xs font-semibold text-pitch-green dark:text-stump-gold hover:bg-chalk-100 dark:hover:bg-pitch-green-950"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span>Hide Match Scorecard & Student Stats</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>View Match Scorecard & Student Stats ({match.performances?.length} Records)</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Expanded Breakdown Table */}
                  {isExpanded && (
                    <div className="rounded-xl border border-border/80 overflow-hidden bg-card shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50 text-[11px]">
                            <TableHead>STUDENT ATHLETE</TableHead>
                            <TableHead className="text-center font-mono">RUNS</TableHead>
                            <TableHead className="text-center font-mono">WKTS</TableHead>
                            <TableHead className="text-center font-mono">CATCHES</TableHead>
                            <TableHead>MATCH NOTES & HIGHLIGHTS</TableHead>
                            <TableHead className="text-right">PROFILE</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {match.performances?.map((perf) => {
                            const isPotm = perf.studentId === match.playerOfTheMatchId;
                            return (
                              <TableRow
                                key={perf.id}
                                className={isPotm ? "bg-stump-gold/10 font-medium" : "hover:bg-muted/20"}
                              >
                                <TableCell>
                                  <div className="flex items-center gap-2.5">
                                    <Avatar
                                      fallback={perf.student?.name || "Player"}
                                      alt={perf.student?.name || "Player"}
                                      src={perf.student?.photoUrl || undefined}
                                      size="sm"
                                      className={isPotm ? "ring-1 ring-stump-gold" : ""}
                                    />
                                    <div>
                                      <Link
                                        href={`/dashboard/students/${perf.studentId}`}
                                        className="font-bold text-xs hover:underline text-foreground flex items-center gap-1"
                                      >
                                        <span>{perf.student?.name}</span>
                                        {isPotm && (
                                          <Crown className="h-3 w-3 fill-stump-gold text-stump-gold-700" />
                                        )}
                                      </Link>
                                      <div className="text-[10px] text-muted-foreground">
                                        {perf.student?.batch}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs text-pitch-green dark:text-stump-gold">
                                  {perf.runs}
                                </TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs text-leather-red">
                                  {perf.wickets}
                                </TableCell>
                                <TableCell className="text-center font-mono font-bold text-xs">
                                  {perf.catches}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                                  {perf.notes || "—"}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link href={`/dashboard/students/${perf.studentId}`}>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground hover:text-pitch-green" />
                                    </Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
