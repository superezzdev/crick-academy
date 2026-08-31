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
  Trophy,
  Crown,
  Target,
  Shield,
  Award,
  Sparkles,
  Flame,
  Zap,
  TrendingUp,
  Medal,
  ExternalLink
} from "lucide-react";
import type {
  TournamentLeaderboardData,
  LeaderboardItemRuns,
  LeaderboardItemWickets,
  LeaderboardItemCatches
} from "@/lib/data";

interface TournamentLeaderboardProps {
  leaderboard: TournamentLeaderboardData;
  tournamentName: string;
}

export function TournamentLeaderboard({
  leaderboard,
  tournamentName
}: TournamentLeaderboardProps) {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "BATTING" | "BOWLING" | "FIELDING">("ALL");

  const { topRunScorer, topWicketTaker, bestCatcher, batting, bowling, fielding } = leaderboard;

  const hasData = batting.length > 0 || bowling.length > 0 || fielding.length > 0;

  if (!hasData) {
    return (
      <Card className="border-dashed border-2 border-border/80 py-16 text-center">
        <CardContent className="space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-stump-gold/20 text-stump-gold">
            <Trophy className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-xl font-bold">Tournament Leaderboard Pending</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Matches for this tournament have not commenced yet. Live leaderboards will be dynamically computed as soon as fixtures are completed and player performance stats are recorded.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRankBadge = (rank: number, isLeader: boolean) => {
    if (isLeader || rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-stump-gold px-2.5 py-0.5 text-xs font-black text-ink shadow-sm ring-2 ring-stump-gold/40">
          <Crown className="h-3.5 w-3.5 fill-ink" />
          #1 GOLD
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-300 dark:bg-slate-700 px-2 py-0.5 text-xs font-bold text-slate-900 dark:text-slate-100">
          <Medal className="h-3 w-3" />
          #2 SILVER
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-800/20 dark:bg-amber-900/40 border border-amber-700/40 px-2 py-0.5 text-xs font-bold text-amber-800 dark:text-amber-300">
          <Medal className="h-3 w-3" />
          #3 BRONZE
        </span>
      );
    }
    return (
      <span className="font-mono text-xs font-bold text-muted-foreground pl-2">
        #{rank}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* 1. Star Performers Podium (#1 Highlights with Stump-Gold Accents) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Run-Scorer (Orange Cap / Gold Crown) */}
        {topRunScorer && (
          <Card className="relative overflow-hidden border-2 border-stump-gold/60 bg-gradient-to-b from-stump-gold/15 via-card to-card shadow-md">
            {/* Top Gold Ribbon Accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-stump-gold-400 via-stump-gold to-stump-gold-600" />
            
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-stump-gold/25 border border-stump-gold/50 px-2.5 py-0.5 text-xs font-extrabold text-stump-gold-900 dark:text-stump-gold-200 uppercase tracking-wider">
                  <Crown className="h-3.5 w-3.5 fill-stump-gold-600 text-stump-gold-700 dark:fill-stump-gold" />
                  ORANGE CAP • #1 BATTER
                </div>
                <Badge variant="gold" className="font-mono text-[10px]">
                  {topRunScorer.strikeRate} S/R
                </Badge>
              </div>

              <div className="flex items-center gap-3.5 mt-3">
                <Avatar
                  fallback={topRunScorer.student.name}
                  alt={topRunScorer.student.name}
                  src={topRunScorer.student.photoUrl || undefined}
                  size="lg"
                  className="ring-2 ring-stump-gold ring-offset-2 ring-offset-background"
                />
                <div>
                  <Link
                    href={`/dashboard/students/${topRunScorer.student.id}`}
                    className="group inline-flex items-center gap-1 font-heading text-xl font-bold text-pitch-green dark:text-chalk hover:text-stump-gold transition-colors"
                  >
                    <span>{topRunScorer.student.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{topRunScorer.teamName}</span>
                    <span>•</span>
                    <span>{topRunScorer.student.batch}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pt-1">
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-stump-gold/10 p-3 border border-stump-gold/30 text-center">
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Runs</div>
                  <div className="font-heading text-2xl font-black text-pitch-green dark:text-stump-gold">
                    {topRunScorer.runs}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">High Score</div>
                  <div className="font-heading text-2xl font-black text-foreground">
                    {topRunScorer.highestScore}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Innings</div>
                  <div className="font-heading text-2xl font-black text-foreground">
                    {topRunScorer.innings}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>Boundaries: <strong className="text-foreground">{topRunScorer.fours}×4s, {topRunScorer.sixes}×6s</strong></span>
                <span className="font-mono text-stump-gold-800 dark:text-stump-gold-300 font-bold">Top Tournament Scorer</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Wicket-Taker (Purple Cap / Gold Accent) */}
        {topWicketTaker && (
          <Card className="relative overflow-hidden border-2 border-stump-gold/60 bg-gradient-to-b from-pitch-green-800/10 via-card to-card shadow-md">
            {/* Top Purple/Pitch Ribbon Accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pitch-green-700 via-pitch-green-600 to-stump-gold" />

            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-pitch-green-100 dark:bg-pitch-green-950/80 border border-pitch-green-600/40 px-2.5 py-0.5 text-xs font-extrabold text-pitch-green dark:text-stump-gold uppercase tracking-wider">
                  <Target className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                  PURPLE CAP • #1 BOWLER
                </div>
                <Badge variant="pitch" className="font-mono text-[10px]">
                  {topWicketTaker.economy} Econ
                </Badge>
              </div>

              <div className="flex items-center gap-3.5 mt-3">
                <Avatar
                  fallback={topWicketTaker.student.name}
                  alt={topWicketTaker.student.name}
                  src={topWicketTaker.student.photoUrl || undefined}
                  size="lg"
                  className="ring-2 ring-stump-gold ring-offset-2 ring-offset-background"
                />
                <div>
                  <Link
                    href={`/dashboard/students/${topWicketTaker.student.id}`}
                    className="group inline-flex items-center gap-1 font-heading text-xl font-bold text-pitch-green dark:text-chalk hover:text-stump-gold transition-colors"
                  >
                    <span>{topWicketTaker.student.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{topWicketTaker.teamName}</span>
                    <span>•</span>
                    <span>{topWicketTaker.student.batch}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pt-1">
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-pitch-green-50/60 dark:bg-pitch-green-950/40 p-3 border border-pitch-green-600/20 text-center">
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Wickets</div>
                  <div className="font-heading text-2xl font-black text-pitch-green dark:text-stump-gold">
                    {topWicketTaker.wickets}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Best Spell</div>
                  <div className="font-heading text-2xl font-black text-foreground">
                    {topWicketTaker.bestFigures}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Overs</div>
                  <div className="font-heading text-2xl font-black text-foreground">
                    {topWicketTaker.overs}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>Runs Given: <strong className="text-foreground">{topWicketTaker.runsConceded}</strong></span>
                <span className="font-mono text-pitch-green dark:text-stump-gold font-bold">Leading Wicket Taker</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Best Catcher / Fielder */}
        {bestCatcher && (
          <Card className="relative overflow-hidden border-2 border-stump-gold/60 bg-gradient-to-b from-stump-gold/10 via-card to-card shadow-md">
            {/* Top Gold Ribbon Accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-stump-gold-400 via-stump-gold to-amber-500" />

            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-stump-gold/20 border border-stump-gold/40 px-2.5 py-0.5 text-xs font-extrabold text-stump-gold-900 dark:text-stump-gold-200 uppercase tracking-wider">
                  <Award className="h-3.5 w-3.5 text-stump-gold-700 dark:text-stump-gold" />
                  GOLDEN GLOVE • BEST FIELDER
                </div>
                <Badge variant="gold" className="font-mono text-[10px]">
                  {bestCatcher.catches} Dismissals
                </Badge>
              </div>

              <div className="flex items-center gap-3.5 mt-3">
                <Avatar
                  fallback={bestCatcher.student.name}
                  alt={bestCatcher.student.name}
                  src={bestCatcher.student.photoUrl || undefined}
                  size="lg"
                  className="ring-2 ring-stump-gold ring-offset-2 ring-offset-background"
                />
                <div>
                  <Link
                    href={`/dashboard/students/${bestCatcher.student.id}`}
                    className="group inline-flex items-center gap-1 font-heading text-xl font-bold text-pitch-green dark:text-chalk hover:text-stump-gold transition-colors"
                  >
                    <span>{bestCatcher.student.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{bestCatcher.teamName}</span>
                    <span>•</span>
                    <span>{bestCatcher.student.batch}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pt-1">
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-stump-gold/10 p-3 border border-stump-gold/30 text-center">
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Catches</div>
                  <div className="font-heading text-2xl font-black text-pitch-green dark:text-stump-gold">
                    {bestCatcher.catches}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Matches</div>
                  <div className="font-heading text-2xl font-black text-foreground">
                    {bestCatcher.matches}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">Style</div>
                  <div className="font-heading text-sm font-bold text-foreground truncate mt-1">
                    {bestCatcher.student.battingStyle.includes("LEFT") ? "LH Bat" : "RH Bat"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>Fielding Impact: <strong className="text-foreground">Spectacular</strong></span>
                <span className="font-mono text-stump-gold-800 dark:text-stump-gold font-bold">Safe Hands Trophy</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 2. Category Switcher for Detailed Tables */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-1.5 bg-card/80 p-1 rounded-xl border border-border/80 shadow-sm">
          {[
            { id: "ALL", label: "All Leaderboards" },
            { id: "BATTING", label: "Batting (Runs)" },
            { id: "BOWLING", label: "Bowling (Wickets)" },
            { id: "FIELDING", label: "Fielding (Catches)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeCategory === tab.id
                  ? "bg-pitch-green text-chalk shadow-sm"
                  : "text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:hover:bg-pitch-green-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-muted-foreground font-mono">
          Computed live across all {tournamentName} match performances
        </div>
      </div>

      {/* 3. Detailed Ranked Tables */}
      <div className="space-y-8">
        {/* Batting Leaderboard Table */}
        {(activeCategory === "ALL" || activeCategory === "BATTING") && (
          <Card className="border-border/80 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/60 bg-chalk-50/50 dark:bg-pitch-green-950/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
                    <Crown className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">BATTING LEADERBOARD (MOST RUNS)</CardTitle>
                    <CardDescription className="text-xs">
                      Ranked by total runs scored across tournament fixtures
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="gold" className="font-mono text-xs">
                  {batting.length} Batters
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="w-24 text-center font-mono">RANK</TableHead>
                    <TableHead>PLAYER & TEAM</TableHead>
                    <TableHead className="text-center font-mono">MAT</TableHead>
                    <TableHead className="text-center font-mono">INNS</TableHead>
                    <TableHead className="text-right font-mono font-bold text-pitch-green dark:text-stump-gold">RUNS</TableHead>
                    <TableHead className="text-center font-mono">HIGH</TableHead>
                    <TableHead className="text-center font-mono">4s / 6s</TableHead>
                    <TableHead className="text-right font-mono">STRIKE RATE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batting.map((player) => {
                    const isFirst = player.rank === 1;
                    return (
                      <TableRow
                        key={player.student.id}
                        className={
                          isFirst
                            ? "bg-stump-gold/15 hover:bg-stump-gold/20 border-b-2 border-stump-gold/40 font-medium"
                            : "hover:bg-muted/30"
                        }
                      >
                        <TableCell className="text-center">
                          {getRankBadge(player.rank, player.isLeader)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar
                              fallback={player.student.name}
                              alt={player.student.name}
                              src={player.student.photoUrl || undefined}
                              size="sm"
                              className={isFirst ? "ring-2 ring-stump-gold" : ""}
                            />
                            <div>
                              <Link
                                href={`/dashboard/students/${player.student.id}`}
                                className={`font-semibold hover:underline flex items-center gap-1 ${
                                  isFirst ? "text-pitch-green dark:text-stump-gold font-bold" : "text-foreground"
                                }`}
                              >
                                <span>{player.student.name}</span>
                                {isFirst && <Crown className="h-3 w-3 fill-stump-gold text-stump-gold-700" />}
                              </Link>
                              <div className="text-[11px] text-muted-foreground">
                                {player.teamName} • {player.student.batch}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-mono text-xs">{player.matches}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{player.innings}</TableCell>
                        <TableCell className="text-right font-mono font-black text-base text-pitch-green dark:text-stump-gold">
                          {player.runs}
                        </TableCell>
                        <TableCell className="text-center font-mono font-bold text-xs">{player.highestScore}</TableCell>
                        <TableCell className="text-center font-mono text-xs text-muted-foreground">
                          {player.fours} / {player.sixes}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-xs">{player.strikeRate}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Bowling Leaderboard Table */}
        {(activeCategory === "ALL" || activeCategory === "BOWLING") && (
          <Card className="border-border/80 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/60 bg-chalk-50/50 dark:bg-pitch-green-950/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-pitch-green-100 dark:bg-pitch-green-900 text-pitch-green dark:text-stump-gold">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">BOWLING LEADERBOARD (MOST WICKETS)</CardTitle>
                    <CardDescription className="text-xs">
                      Ranked by total wickets taken and lowest economy rate
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="pitch" className="font-mono text-xs">
                  {bowling.length} Bowlers
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="w-24 text-center font-mono">RANK</TableHead>
                    <TableHead>PLAYER & TEAM</TableHead>
                    <TableHead className="text-center font-mono">MAT</TableHead>
                    <TableHead className="text-center font-mono">OVERS</TableHead>
                    <TableHead className="text-right font-mono font-bold text-pitch-green dark:text-stump-gold">WKTS</TableHead>
                    <TableHead className="text-center font-mono">BEST (BBI)</TableHead>
                    <TableHead className="text-center font-mono">RUNS CONC.</TableHead>
                    <TableHead className="text-right font-mono">ECONOMY</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bowling.map((player) => {
                    const isFirst = player.rank === 1;
                    return (
                      <TableRow
                        key={player.student.id}
                        className={
                          isFirst
                            ? "bg-stump-gold/15 hover:bg-stump-gold/20 border-b-2 border-stump-gold/40 font-medium"
                            : "hover:bg-muted/30"
                        }
                      >
                        <TableCell className="text-center">
                          {getRankBadge(player.rank, player.isLeader)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar
                              fallback={player.student.name}
                              alt={player.student.name}
                              src={player.student.photoUrl || undefined}
                              size="sm"
                              className={isFirst ? "ring-2 ring-stump-gold" : ""}
                            />
                            <div>
                              <Link
                                href={`/dashboard/students/${player.student.id}`}
                                className={`font-semibold hover:underline flex items-center gap-1 ${
                                  isFirst ? "text-pitch-green dark:text-stump-gold font-bold" : "text-foreground"
                                }`}
                              >
                                <span>{player.student.name}</span>
                                {isFirst && <Crown className="h-3 w-3 fill-stump-gold text-stump-gold-700" />}
                              </Link>
                              <div className="text-[11px] text-muted-foreground">
                                {player.teamName} • {player.student.bowlingStyle.replace(/_/g, " ")}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-mono text-xs">{player.matches}</TableCell>
                        <TableCell className="text-center font-mono text-xs">{player.overs}</TableCell>
                        <TableCell className="text-right font-mono font-black text-base text-pitch-green dark:text-stump-gold">
                          {player.wickets}
                        </TableCell>
                        <TableCell className="text-center font-mono font-bold text-xs">{player.bestFigures}</TableCell>
                        <TableCell className="text-center font-mono text-xs text-muted-foreground">
                          {player.runsConceded}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-xs">{player.economy}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Fielding Leaderboard Table */}
        {(activeCategory === "ALL" || activeCategory === "FIELDING") && (
          <Card className="border-border/80 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/60 bg-chalk-50/50 dark:bg-pitch-green-950/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">FIELDING LEADERBOARD (MOST CATCHES)</CardTitle>
                    <CardDescription className="text-xs">
                      Ranked by catches and fielding dismissals inside the ring and outfield
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="gold" className="font-mono text-xs">
                  {fielding.length} Fielders
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="w-24 text-center font-mono">RANK</TableHead>
                    <TableHead>PLAYER & TEAM</TableHead>
                    <TableHead className="text-center font-mono">MAT</TableHead>
                    <TableHead className="text-right font-mono font-bold text-pitch-green dark:text-stump-gold">CATCHES</TableHead>
                    <TableHead className="text-center font-mono">BATCH</TableHead>
                    <TableHead className="text-right font-mono">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fielding.map((player) => {
                    const isFirst = player.rank === 1;
                    return (
                      <TableRow
                        key={player.student.id}
                        className={
                          isFirst
                            ? "bg-stump-gold/15 hover:bg-stump-gold/20 border-b-2 border-stump-gold/40 font-medium"
                            : "hover:bg-muted/30"
                        }
                      >
                        <TableCell className="text-center">
                          {getRankBadge(player.rank, player.isLeader)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar
                              fallback={player.student.name}
                              alt={player.student.name}
                              src={player.student.photoUrl || undefined}
                              size="sm"
                              className={isFirst ? "ring-2 ring-stump-gold" : ""}
                            />
                            <div>
                              <Link
                                href={`/dashboard/students/${player.student.id}`}
                                className={`font-semibold hover:underline flex items-center gap-1 ${
                                  isFirst ? "text-pitch-green dark:text-stump-gold font-bold" : "text-foreground"
                                }`}
                              >
                                <span>{player.student.name}</span>
                                {isFirst && <Crown className="h-3 w-3 fill-stump-gold text-stump-gold-700" />}
                              </Link>
                              <div className="text-[11px] text-muted-foreground">
                                {player.teamName}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-mono text-xs">{player.matches}</TableCell>
                        <TableCell className="text-right font-mono font-black text-base text-pitch-green dark:text-stump-gold">
                          {player.catches}
                        </TableCell>
                        <TableCell className="text-center font-mono text-xs text-muted-foreground">
                          {player.student.batch}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/dashboard/students/${player.student.id}`}>
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                              <span>Profile</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
