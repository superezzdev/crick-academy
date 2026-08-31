"use client";

import React from "react";
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
import { Trophy, Swords, Calendar, Award } from "lucide-react";

interface MatchItem {
  id: string;
  tournamentName: string;
  opponent: string;
  date: string;
  venue: string;
  result: "WON" | "LOST" | "PENDING";
  topPerformer: string;
  highlights: string;
}

const mockMatches: MatchItem[] = [
  {
    id: "match-1",
    tournamentName: "State Champions Trophy U-19",
    opponent: "Royal Cricket Club",
    date: "Aug 29, 2026",
    venue: "Main Oval Turf Ground",
    result: "WON",
    topPerformer: "Aarav Sharma (84* runs, 3 wkts)",
    highlights: "Won by 42 runs"
  },
  {
    id: "match-2",
    tournamentName: "State Champions Trophy U-19",
    opponent: "Apex Cricket Academy",
    date: "Sep 03, 2026",
    venue: "Green Park Stadium",
    result: "PENDING",
    topPerformer: "Match Upcoming",
    highlights: "Semifinal clash"
  },
  {
    id: "match-3",
    tournamentName: "Monsoon League 2026",
    opponent: "St. John's Youth XI",
    date: "Aug 22, 2026",
    venue: "City Sports Complex",
    result: "WON",
    topPerformer: "Devendra Rao (5/18 bowling)",
    highlights: "Won by 6 wickets"
  }
];

export function TournamentsPreview() {
  return (
    <Card className="h-full border-border/80 shadow-sm" id="tournaments">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>TOURNAMENTS & FIXTURES</CardTitle>
          <CardDescription>
            Live tournament standings, fixtures, and star performers
          </CardDescription>
        </div>
        <Link href="/dashboard/tournaments">
          <Button variant="pitch" size="sm" className="gap-1.5 text-xs">
            <Trophy className="h-3.5 w-3.5 text-stump-gold" />
            Tournament Arena
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockMatches.map((match) => (
          <div
            key={match.id}
            className="p-4 rounded-lg border border-border/60 bg-chalk-50/60 hover:bg-chalk-100/90 transition-all dark:bg-pitch-green-950/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stump-gold-700 uppercase tracking-wider">
                {match.tournamentName}
              </span>
              {match.result === "WON" ? (
                <Badge variant="paid">VICTORY</Badge>
              ) : (
                <Badge variant="gold">UPCOMING</Badge>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Swords className="h-4 w-4 text-leather-red" />
                <span className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                  CrickAcademy vs {match.opponent}
                </span>
              </div>
              <span className="text-xs font-semibold text-pitch-green dark:text-stump-gold">
                {match.highlights}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>
                  {match.date} • {match.venue}
                </span>
              </div>
              <div className="flex items-center gap-1 font-medium text-ink/80 dark:text-chalk/80">
                <Award className="h-3.5 w-3.5 text-stump-gold-600" />
                <span>{match.topPerformer}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
