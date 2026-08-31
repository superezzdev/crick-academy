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
  Button,
  Avatar
} from "@crick-academy/ui";
import {
  Users,
  Shield,
  Crown,
  ExternalLink,
  Zap,
  Target,
  Sparkles,
  Phone
} from "lucide-react";
import type { TournamentTeam, Student } from "@crick-academy/types";

interface TournamentTeamsProps {
  teams: TournamentTeam[];
}

export function TournamentTeams({ teams }: TournamentTeamsProps) {
  if (teams.length === 0) {
    return (
      <Card className="border-dashed border-2 border-border/80 py-16 text-center">
        <CardContent className="space-y-4 max-w-sm mx-auto">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-chalk-200/80 text-pitch-green dark:bg-pitch-green-950 dark:text-stump-gold">
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold">No Teams Registered</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Team squads have not been assigned for this tournament yet. Rosters are being prepared by the coaches.
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

  const formatRole = (battingStyle: string, bowlingStyle: string) => {
    const bat = battingStyle.includes("LEFT") ? "LH Bat" : "RH Bat";
    let bowl = "";
    if (bowlingStyle === "RIGHT_ARM_FAST") bowl = "Fast";
    else if (bowlingStyle === "RIGHT_ARM_MEDIUM") bowl = "Med";
    else if (bowlingStyle === "RIGHT_ARM_SPIN_OFF") bowl = "Off-Spin";
    else if (bowlingStyle === "RIGHT_ARM_SPIN_LEG") bowl = "Leg-Spin";
    else if (bowlingStyle === "LEFT_ARM_FAST") bowl = "LA Fast";
    else if (bowlingStyle === "LEFT_ARM_MEDIUM") bowl = "LA Med";
    else if (bowlingStyle === "LEFT_ARM_SPIN_ORTHODOX") bowl = "LA Orthodox";
    else if (bowlingStyle === "LEFT_ARM_SPIN_CHINAMAN") bowl = "Chinaman";

    if (bowl) return `${bat} • ${bowl}`;
    return `${bat} (Specialist)`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-4">
        <div>
          <h3 className="font-heading text-xl font-bold text-pitch-green dark:text-chalk">
            PARTICIPATING SQUADS & TEAM COMPOSITIONS
          </h3>
          <p className="text-xs text-muted-foreground">
            Grouped player rosters allocated across competitive academy squads
          </p>
        </div>
        <div className="text-xs font-mono text-muted-foreground">
          {teams.length} Squads Registered
        </div>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team) => {
          return (
            <Card
              key={team.id}
              className="border-border/80 shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:border-pitch-green/60"
            >
              {/* Team Top Accent Bar */}
              <div
                className="h-2 w-full"
                style={{ backgroundColor: team.color || "#0B3D2E" }}
              />

              <CardHeader className="pb-3 bg-chalk-50/50 dark:bg-pitch-green-950/20 border-b border-border/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-4 w-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: team.color }}
                    />
                    <div>
                      <CardTitle className="text-xl font-heading font-extrabold text-pitch-green dark:text-chalk">
                        {team.name}
                      </CardTitle>
                      <CardDescription className="text-xs font-mono">
                        Squad Shortcode: <span className="font-bold">{team.shortName}</span>
                      </CardDescription>
                    </div>
                  </div>

                  <Badge variant="pitch" className="font-mono text-xs">
                    {team.students?.length || team.playerIds.length} Athletes
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3 flex-1">
                {/* Captain Highlight Strip */}
                {team.captain && (
                  <div className="flex items-center justify-between rounded-lg border border-stump-gold/40 bg-stump-gold/15 px-3 py-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-stump-gold-700 dark:text-stump-gold fill-stump-gold-400" />
                      <span className="font-mono text-[11px] uppercase font-bold text-stump-gold-900 dark:text-stump-gold-200">
                        Captain
                      </span>
                    </div>
                    <Link
                      href={`/dashboard/students/${team.captain.id}`}
                      className="font-heading font-bold text-pitch-green dark:text-chalk hover:underline flex items-center gap-1"
                    >
                      <span>{team.captain.name}</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                )}

                {/* Grouped Player Roster List */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Active Squad Roster
                  </div>

                  <div className="divide-y divide-border/40 rounded-xl border border-border/60 bg-card overflow-hidden">
                    {team.students?.map((student, idx) => {
                      const isCaptain = student.id === team.captainId;
                      const isViceCaptain = student.id === team.viceCaptainId;

                      return (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 transition-colors hover:bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              fallback={student.name}
                              alt={student.name}
                              src={student.photoUrl || undefined}
                              size="sm"
                              className={isCaptain ? "ring-2 ring-stump-gold" : ""}
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Link
                                  href={`/dashboard/students/${student.id}`}
                                  className="font-semibold text-xs text-foreground hover:text-pitch-green dark:hover:text-stump-gold transition-colors"
                                >
                                  {student.name}
                                </Link>

                                {isCaptain && (
                                  <span className="inline-flex items-center gap-0.5 rounded bg-stump-gold/30 px-1 py-0.2 text-[9px] font-extrabold text-stump-gold-900 dark:text-stump-gold-200">
                                    (C)
                                  </span>
                                )}
                                {isViceCaptain && (
                                  <span className="inline-flex items-center gap-0.5 rounded bg-muted px-1 py-0.2 text-[9px] font-bold text-muted-foreground">
                                    (VC)
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                {formatRole(student.battingStyle, student.bowlingStyle)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                              {student.batch}
                            </span>
                            <Link href={`/dashboard/students/${student.id}`}>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
