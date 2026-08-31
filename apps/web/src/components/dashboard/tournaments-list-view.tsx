"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Input
} from "@crick-academy/ui";
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Swords,
  Search,
  ArrowRight,
  Sparkles,
  Flame,
  Clock,
  CheckCircle2,
  Medal,
  Activity,
  Layers
} from "lucide-react";
import type { TournamentDetailed } from "@crick-academy/types";
import { getTournamentStatsOverview } from "@/lib/data";

interface TournamentsListViewProps {
  initialTournaments: TournamentDetailed[];
}

export function TournamentsListView({ initialTournaments }: TournamentsListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const overviewStats = useMemo(() => getTournamentStatsOverview(), []);

  const filteredTournaments = useMemo(() => {
    return initialTournaments.filter((tournament) => {
      const matchesFilter =
        statusFilter === "ALL" || tournament.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        tournament.name.toLowerCase().includes(q) ||
        (tournament.location && tournament.location.toLowerCase().includes(q)) ||
        (tournament.format && tournament.format.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [initialTournaments, statusFilter, searchQuery]);

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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            LIVE ONGOING
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            COMPLETED
          </span>
        );
      case "UPCOMING":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-chalk-200/80 dark:bg-pitch-green-950/60 px-2.5 py-0.5 text-xs font-bold text-ink/80 dark:text-chalk/80">
            <Clock className="h-3 w-3 text-muted-foreground" />
            UPCOMING
          </span>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Metric Overview Banner */}
      <div className="rounded-2xl border border-pitch-green-800/20 bg-gradient-to-br from-pitch-green-900 via-pitch-green-800 to-pitch-green-950 p-6 sm:p-8 text-chalk shadow-lg relative overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-10 pointer-events-none select-none text-stump-gold">
          <Trophy className="h-80 w-80" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-md bg-stump-gold/20 px-2.5 py-1 text-xs font-semibold text-stump-gold border border-stump-gold/30">
                <Sparkles className="h-3.5 w-3.5" />
                ACADEMY COMPETITIVE ARENA
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-chalk">
                TOURNAMENT MANAGEMENT & LEAGUES
              </h1>
              <p className="text-chalk/80 text-sm max-w-2xl">
                Track tournament fixtures, team compositions, match scorecards, and live player leaderboards with Stump-Gold recognition for top run-scorers and wicket-takers.
              </p>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="rounded-xl border border-chalk/15 bg-black/20 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-chalk/70 font-mono">
                <span>Total Tournaments</span>
                <Layers className="h-3.5 w-3.5 text-stump-gold" />
              </div>
              <div className="mt-1.5 font-heading text-2xl font-bold text-chalk">
                {overviewStats.totalTournaments}
              </div>
              <div className="text-[11px] text-chalk/60 mt-0.5">Active academy events</div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-amber-300 font-mono">
                <span>Ongoing League</span>
                <Flame className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <div className="mt-1.5 font-heading text-2xl font-bold text-amber-300">
                {overviewStats.ongoing}
              </div>
              <div className="text-[11px] text-amber-200/70 mt-0.5">Live matches in progress</div>
            </div>

            <div className="rounded-xl border border-chalk/15 bg-black/20 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-chalk/70 font-mono">
                <span>Upcoming</span>
                <Clock className="h-3.5 w-3.5 text-stump-gold" />
              </div>
              <div className="mt-1.5 font-heading text-2xl font-bold text-chalk">
                {overviewStats.upcoming}
              </div>
              <div className="text-[11px] text-chalk/60 mt-0.5">Next on calendar</div>
            </div>

            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-mono">
                <span>Completed</span>
                <Medal className="h-3.5 w-3.5 text-stump-gold" />
              </div>
              <div className="mt-1.5 font-heading text-2xl font-bold text-emerald-300">
                {overviewStats.completed}
              </div>
              <div className="text-[11px] text-emerald-200/70 mt-0.5">
                {overviewStats.completedMatches} fixtures played
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-card/80 p-1.5 rounded-xl border border-border/80 shadow-sm backdrop-blur-sm">
          {[
            { id: "ALL", label: "All Tournaments", count: initialTournaments.length },
            { id: "ONGOING", label: "Ongoing", count: overviewStats.ongoing },
            { id: "UPCOMING", label: "Upcoming", count: overviewStats.upcoming },
            { id: "COMPLETED", label: "Completed", count: overviewStats.completed }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                statusFilter === tab.id
                  ? "bg-pitch-green text-chalk shadow-sm"
                  : "text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:hover:bg-pitch-green-950"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  statusFilter === tab.id
                    ? "bg-stump-gold text-ink font-extrabold"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tournament, venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs h-9 bg-card/80"
          />
        </div>
      </div>

      {/* 3. Tournament Cards Grid */}
      {filteredTournaments.length === 0 ? (
        <Card className="border-dashed border-2 border-border/80 py-16 text-center">
          <CardContent className="space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-xl font-bold">No Tournaments Found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No tournaments match your current filter or search query. Try clearing your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStatusFilter("ALL");
                setSearchQuery("");
              }}
              className="text-xs"
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <Card
              key={tournament.id}
              className={`flex flex-col justify-between border-border/80 transition-all hover:border-pitch-green/60 hover:shadow-md ${
                tournament.status === "ONGOING"
                  ? "border-amber-500/40 dark:border-amber-500/30"
                  : tournament.status === "COMPLETED"
                  ? "border-pitch-green-700/30"
                  : ""
              }`}
            >
              <CardHeader className="pb-3 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-pitch-green dark:text-stump-gold">
                    <Trophy className="h-3.5 w-3.5 text-stump-gold" />
                    <span>{tournament.format || "Academy Cup"}</span>
                  </div>
                  {getStatusBadge(tournament.status)}
                </div>

                <div>
                  <CardTitle className="text-xl font-heading font-bold text-pitch-green dark:text-chalk group-hover:text-stump-gold transition-colors">
                    {tournament.name}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1 line-clamp-2">
                    {tournament.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pb-4">
                {/* Meta details: Date & Venue */}
                <div className="space-y-2 rounded-xl bg-chalk-50/80 dark:bg-pitch-green-950/40 p-3 border border-border/50 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 shrink-0 text-pitch-green dark:text-stump-gold" />
                    <span className="font-medium text-foreground">
                      {formatDateRange(tournament.startDate, tournament.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-pitch-green dark:text-stump-gold" />
                    <span className="truncate">{tournament.location || "Academy Grounds"}</span>
                  </div>
                </div>

                {/* Tournament Structure Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-border/40 bg-card p-2.5">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                      <Users className="h-3 w-3 text-pitch-green" />
                      <span>Teams</span>
                    </div>
                    <div className="mt-1 font-heading text-lg font-bold">
                      {tournament.totalTeams} Squads
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/40 bg-card p-2.5">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                      <Swords className="h-3 w-3 text-leather-red" />
                      <span>Fixtures</span>
                    </div>
                    <div className="mt-1 font-heading text-lg font-bold">
                      {tournament.completedMatchesCount} / {tournament.totalMatchesCount} Played
                    </div>
                  </div>
                </div>

                {/* Champion highlight for completed tournaments */}
                {tournament.championTeam && (
                  <div className="flex items-center justify-between rounded-lg border border-stump-gold/40 bg-stump-gold/15 px-3 py-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-stump-gold-700 dark:text-stump-gold" />
                      <span className="font-mono text-[11px] uppercase font-bold text-stump-gold-800 dark:text-stump-gold-200">
                        Champion
                      </span>
                    </div>
                    <span className="font-heading font-extrabold text-pitch-green dark:text-chalk">
                      {tournament.championTeam}
                    </span>
                  </div>
                )}
              </CardContent>

              {/* Action Button */}
              <div className="border-t border-border/60 p-4 pt-3">
                <Link href={`/dashboard/tournaments/${tournament.id}`} className="w-full block">
                  <Button
                    variant={tournament.status === "ONGOING" ? "pitch" : "outline"}
                    className="w-full justify-between text-xs font-bold group"
                  >
                    <span>View Tournament Hub</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-stump-gold" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
