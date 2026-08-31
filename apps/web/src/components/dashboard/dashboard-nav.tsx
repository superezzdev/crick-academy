"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Trophy,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Swords
} from "lucide-react";
import { Button } from "@crick-academy/ui";
import { RoleSwitcher } from "@/components/role-switcher";

export function DashboardNav() {
  const pathname = usePathname();

  const isOverview = pathname === "/dashboard";
  const isStudents = pathname.startsWith("/dashboard/students");
  const isTournaments = pathname.startsWith("/dashboard/tournaments");

  return (
    <div className="border-b border-border/80 bg-card/60 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        {/* Top Row: Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-pitch-green transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/dashboard" className="hover:text-pitch-green transition-colors">
                Admin Console
              </Link>

              {isStudents && (
                <>
                  <ChevronRight className="h-3 w-3" />
                  {pathname === "/dashboard/students" ? (
                    <span className="text-foreground font-semibold">Squad Roster</span>
                  ) : (
                    <>
                      <Link
                        href="/dashboard/students"
                        className="hover:text-pitch-green transition-colors"
                      >
                        Squad Roster
                      </Link>
                      <ChevronRight className="h-3 w-3" />
                      <span className="text-foreground font-semibold">Player Profile</span>
                    </>
                  )}
                </>
              )}

              {isTournaments && (
                <>
                  <ChevronRight className="h-3 w-3" />
                  {pathname === "/dashboard/tournaments" ? (
                    <span className="text-foreground font-semibold">Tournaments & Leagues</span>
                  ) : (
                    <>
                      <Link
                        href="/dashboard/tournaments"
                        className="hover:text-pitch-green transition-colors"
                      >
                        Tournaments & Leagues
                      </Link>
                      <ChevronRight className="h-3 w-3" />
                      <span className="text-foreground font-semibold">Tournament Hub</span>
                    </>
                  )}
                </>
              )}
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-pitch-green dark:text-chalk">
              {pathname === "/dashboard"
                ? "ACADEMY COMMAND CENTER"
                : pathname === "/dashboard/students"
                ? "ACADEMY SQUAD DIRECTORY"
                : pathname.startsWith("/dashboard/students/")
                ? "PLAYER PROFILE & STATS"
                : pathname === "/dashboard/tournaments"
                ? "TOURNAMENT ARENA & FIXTURES"
                : "TOURNAMENT HUB & LEADERBOARDS"}
            </h2>
          </div>

          {/* Quick Action Button & Role Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <RoleSwitcher />
            <Link href="/dashboard/tournaments">
              <Button variant="pitch" size="sm" className="gap-1.5 text-xs shadow-sm">
                <Trophy className="h-3.5 w-3.5 text-stump-gold" />
                Tournament Arena
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-4 border-t border-border/40 pt-3 overflow-x-auto">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 ${
              isOverview
                ? "bg-pitch-green text-chalk shadow-sm"
                : "text-muted-foreground hover:bg-chalk-100/80 hover:text-foreground dark:hover:bg-pitch-green-950/50"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Scoreboard & Overview</span>
          </Link>

          <Link
            href="/dashboard/students"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 ${
              isStudents
                ? "bg-pitch-green text-chalk shadow-sm"
                : "text-muted-foreground hover:bg-chalk-100/80 hover:text-foreground dark:hover:bg-pitch-green-950/50"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Students Roster & Stats</span>
          </Link>

          <Link
            href="/dashboard/tournaments"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 ${
              isTournaments
                ? "bg-pitch-green text-chalk shadow-sm"
                : "text-muted-foreground hover:bg-chalk-100/80 hover:text-foreground dark:hover:bg-pitch-green-950/50"
            }`}
          >
            <Trophy className="h-4 w-4 text-stump-gold" />
            <span>Tournaments & Leaderboards</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

