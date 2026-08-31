"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  CreditCard,
  Trophy,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  GraduationCap
} from "lucide-react";
import { Button, Badge, Avatar } from "@crick-academy/ui";
import { RoleSwitcher } from "@/components/role-switcher";
import type { StudentFullProfile } from "@/lib/data";

interface PortalNavProps {
  student: StudentFullProfile;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PortalNav({ student, activeTab, onTabChange }: PortalNavProps) {
  const tabs = [
    { id: "overview", label: "Locker Room Hub", icon: Layers },
    { id: "profile", label: "Player Profile", icon: User },
    { id: "fees", label: "Fee Ledger & Pay", icon: CreditCard, count: student.pendingFeesCount ?? 0 },
    { id: "performance", label: "Match Scorecards", icon: Trophy, count: student.performances.length },
    { id: "sessions", label: "Upcoming Nets", icon: Calendar },
    { id: "tournament", label: "Team & Tournaments", icon: Trophy }
  ];

  return (
    <div className="border-b border-border/80 bg-card/70 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 py-4 space-y-4">
        {/* Top Row: Breadcrumb & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-pitch-green transition-colors">
                Academy Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-pitch-green font-semibold dark:text-stump-gold">
                Student Portal
              </span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-semibold truncate max-w-[150px] sm:max-w-none">
                {student.name} ({student.batch})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-pitch-green dark:text-chalk">
                PLAYER LOCKER ROOM
              </h1>
              <Badge variant="gold" className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
                Student Portal
              </Badge>
            </div>
          </div>

          {/* Right Action Bar: Role Switcher & Back link */}
          <div className="flex flex-wrap items-center gap-3">
            <RoleSwitcher />

            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                <ArrowLeft className="h-3.5 w-3.5" />
                Owner Console
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-border/40 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-pitch-green text-chalk shadow-md ring-2 ring-stump-gold/40 scale-102"
                    : "bg-chalk-50/80 text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:bg-pitch-green-950/40 dark:hover:bg-pitch-green-900/60"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-stump-gold" : "text-muted-foreground"}`} />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && tab.count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isActive
                        ? "bg-stump-gold text-pitch-green"
                        : tab.id === "fees"
                        ? "bg-leather-red text-chalk"
                        : "bg-pitch-green/15 text-pitch-green dark:text-chalk"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
