"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Crown,
  GraduationCap,
  Users,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  LogIn,
  CheckCircle2,
  CalendarCheck,
  CreditCard,
  Trophy,
  Activity,
  UserCheck,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";
import { toast } from "sonner";

export interface RoleCardConfig {
  id: "admin" | "coach" | "student" | "parent";
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  themeColor: string;
  accentBorder: string;
  destination: string;
  mockEmail: string;
  mockRole: string;
  description: string;
  keyFeatures: string[];
  sampleStats: { label: string; value: string }[];
  actionLabel: string;
}

export const ROLE_CONFIGS: RoleCardConfig[] = [
  {
    id: "admin",
    title: "Academy Owner / Admin",
    subtitle: "Operations & Financial Control Hub",
    badge: "Full Command",
    badgeColor: "bg-pitch-green text-chalk border-stump-gold/40",
    icon: Crown,
    themeColor: "from-pitch-green/20 via-pitch-green/10 to-transparent",
    accentBorder: "group-hover:border-stump-gold group-hover:shadow-stump-gold/20",
    destination: "/dashboard",
    mockEmail: "admin@crickacademy.com",
    mockRole: "Academy Director (Level 3 Admin)",
    description:
      "Central command console for full academy KPIs, student squad rosters, automated fee collections, staff schedules, and tournament brackets.",
    keyFeatures: [
      "Stadium LED live scoreboard & KPI analytics",
      "Automated fee ledger & overdue WhatsApp alerts",
      "Batch capacity management & attendance audits",
      "Tournament fixtures, teams & points table engine"
    ],
    sampleStats: [
      { label: "Active Athletes", value: "128" },
      { label: "Aug Collection", value: "₹ 1.84L" },
      { label: "Win Rate", value: "78%" }
    ],
    actionLabel: "Launch Owner Console"
  },
  {
    id: "coach",
    title: "Coach & Training Staff",
    subtitle: "Pitch Drills & Athlete Development",
    badge: "Field Operations",
    badgeColor: "bg-leather-red/20 text-leather-red border-leather-red/30",
    icon: Activity,
    themeColor: "from-leather-red/15 via-leather-red/5 to-transparent",
    accentBorder: "group-hover:border-leather-red group-hover:shadow-leather-red/20",
    destination: "/coach",
    mockEmail: "coach.kapil@crickacademy.com",
    mockRole: "Head Fast Bowling Coach (BCCI L-2)",
    description:
      "Pitch-side digital toolkit for net sessions, attendance marking, bowling speed & batting technique evaluations, and match squad selections.",
    keyFeatures: [
      "1-Tap digital pitch attendance & session logs",
      "Batting wagon wheel & bowling speed (km/h) rating",
      "Daily drill planner & high-intensity net slots",
      "Match XI squad selection & fitness tracking"
    ],
    sampleStats: [
      { label: "Nets Scheduled", value: "4 Today" },
      { label: "Athletes Evaluated", value: "18" },
      { label: "Avg Attendance", value: "94.8%" }
    ],
    actionLabel: "Launch Coach Portal"
  },
  {
    id: "student",
    title: "Student & Athlete",
    subtitle: "Personal Locker Room & Stats Hub",
    badge: "Athlete Locker",
    badgeColor: "bg-stump-gold/30 text-stump-gold-800 border-stump-gold/50 dark:text-stump-gold",
    icon: GraduationCap,
    themeColor: "from-stump-gold/20 via-stump-gold/5 to-transparent",
    accentBorder: "group-hover:border-stump-gold group-hover:shadow-stump-gold/30",
    destination: "/portal?studentId=stud_aarav_sharma",
    mockEmail: "aarav.sharma@athlete.crick",
    mockRole: "U-16 Elite Batsman • Aarav Sharma",
    description:
      "Athletic performance portal showing career batting/bowling averages, net slot bookings, Man of the Match awards, and digital payment receipts.",
    keyFeatures: [
      "Personal career stats (Runs, Wickets, Strike Rate)",
      "Interactive batting wagon wheel & dismissal analysis",
      "Net practice slot reservations & upcoming schedules",
      "Digital payment receipts & tournament badges"
    ],
    sampleStats: [
      { label: "Runs Scored", value: "648" },
      { label: "Batting Avg", value: "46.3" },
      { label: "MOTM Awards", value: "4" }
    ],
    actionLabel: "Launch Student Portal"
  },
  {
    id: "parent",
    title: "Parent & Guardian",
    subtitle: "Child Safety, Attendance & Direct Pay",
    badge: "Family Guardian",
    badgeColor: "bg-pitch-green-100 text-pitch-green-800 border-pitch-green-300 dark:bg-pitch-green-900/60 dark:text-chalk",
    icon: HeartHandshake,
    themeColor: "from-pitch-green/15 via-chalk-200/40 to-transparent",
    accentBorder: "group-hover:border-pitch-green group-hover:shadow-pitch-green/20",
    destination: "/parent",
    mockEmail: "parent.sharma@family.crick",
    mockRole: "Parent of Aarav Sharma (U-16)",
    description:
      "Dedicated parent portal with real-time ground check-in timestamps, 1-click UPI fee clearance, coach remarks feed, and tournament match schedules.",
    keyFeatures: [
      "Live ground arrival & departure security check-ins",
      "1-Click UPI monthly academy fee payments & GST invoices",
      "Direct coach performance feedback & injury notices",
      "Live match updates & weekend tournament schedules"
    ],
    sampleStats: [
      { label: "Check-in Status", value: "Active at Nets" },
      { label: "Fee Balance", value: "₹ 0 (Cleared)" },
      { label: "Coach Remarks", value: "Excellent Form" }
    ],
    actionLabel: "Launch Parent Portal"
  }
];

export function RolePortalGateway() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleCardConfig>(ROLE_CONFIGS[0]);
  const [isSimulatingAuth, setIsSimulatingAuth] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleOpenAuthModal = (role: RoleCardConfig) => {
    setSelectedRole(role);
    setAuthModalOpen(true);
  };

  const handleSimulateLogin = (role: RoleCardConfig) => {
    setIsSimulatingAuth(true);
    toast.loading(`Authenticating as ${role.title}...`, { id: "auth-sim" });

    setTimeout(() => {
      setIsSimulatingAuth(false);
      setAuthModalOpen(false);
      toast.success(`Access granted! Redirecting to ${role.title} workspace...`, {
        id: "auth-sim"
      });
      router.push(role.destination);
    }, 900);
  };

  return (
    <section id="portals" className="relative py-20 lg:py-28 overflow-hidden bg-chalk-100/60 dark:bg-pitch-green-950/40">
      {/* Background Subtle Cricket Turf Styling */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-stump-gold/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-pitch-green/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-pitch-green/30 bg-pitch-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pitch-green dark:text-stump-gold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Role-Based Portal Gateway</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-pitch-green dark:text-chalk tracking-tight">
            ONE PLATFORM, FOUR SPECIALIZED EXPERIENCES
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Every member of your cricket academy enjoys a tailored, secure workspace.
            Select your role below to test the live portal workspace.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>Instant Demo Access Enabled • No Password Required in Demo</span>
          </div>
        </div>

        {/* 4 Multi-Role Access Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROLE_CONFIGS.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`group relative flex flex-col justify-between rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${role.accentBorder}`}
              >
                {/* Top Subtle Gradient */}
                <div
                  className={`absolute inset-x-0 top-0 h-32 rounded-t-2xl bg-gradient-to-b ${role.themeColor} opacity-70 pointer-events-none`}
                />

                <div className="relative z-10 space-y-4">
                  {/* Card Header with Icon & Role Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pitch-green text-chalk shadow-md group-hover:scale-110 group-hover:bg-pitch-green-700 transition-all">
                      <Icon className="h-6 w-6 text-stump-gold" />
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${role.badgeColor}`}
                    >
                      {role.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-heading text-xl font-bold text-pitch-green dark:text-chalk group-hover:text-pitch-green dark:group-hover:text-stump-gold transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                      {role.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-ink/80 dark:text-chalk/80 leading-relaxed min-h-[50px]">
                    {role.description}
                  </p>

                  {/* Mini Stats Preview */}
                  <div className="grid grid-cols-3 gap-1 rounded-xl bg-chalk-100/90 dark:bg-pitch-green-950/60 p-2.5 border border-border/60">
                    {role.sampleStats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase truncate">
                          {stat.label}
                        </p>
                        <p className="font-heading text-xs sm:text-sm font-bold text-pitch-green dark:text-stump-gold">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Features List */}
                  <div className="space-y-2 pt-2 border-t border-border/70">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Included Capabilities
                    </p>
                    <ul className="space-y-1.5 text-xs text-ink/75 dark:text-chalk/70">
                      {role.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-pitch-green dark:text-stump-gold mt-0.5" />
                          <span className="text-[11px] leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Area */}
                <div className="relative z-10 mt-6 space-y-2 pt-4 border-t border-border/80">
                  {/* Direct Launch Button */}
                  <Link href={role.destination} className="block w-full">
                    <Button
                      variant={role.id === "admin" ? "pitch" : role.id === "student" ? "gold" : "default"}
                      className="w-full justify-center gap-2 text-xs font-bold shadow-sm group-hover:shadow-md transition-all"
                    >
                      <span>{role.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  {/* Simulate Login Modal Trigger */}
                  <button
                    onClick={() => handleOpenAuthModal(role)}
                    className="w-full text-center text-[10px] font-bold text-muted-foreground hover:text-pitch-green dark:hover:text-stump-gold flex items-center justify-center gap-1 py-1 transition-colors"
                  >
                    <Lock className="h-3 w-3" />
                    <span>View Credentials & Auth Flow</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Role Comparison Studio / Tab Preview */}
        <div className="mt-16 rounded-3xl border-2 border-border/80 bg-card p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-border">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stump-gold-800 dark:text-stump-gold">
                Role Access Blueprint
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-pitch-green dark:text-chalk mt-1">
                ENTERPRISE MULTI-ROLE ARCHITECTURE
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                In production, users securely authenticate via phone OTP, email, or RFID badge.
                The system automatically routes each user to their permitted role portal.
              </p>
            </div>

            {/* Quick Demo Launcher Pill */}
            <div className="flex flex-wrap items-center gap-2">
              {ROLE_CONFIGS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    selectedRole.id === r.id
                      ? "bg-pitch-green text-chalk shadow-md ring-2 ring-stump-gold"
                      : "bg-chalk-200/80 text-ink/80 hover:bg-chalk-300 dark:bg-pitch-green-900/60 dark:text-chalk"
                  }`}
                >
                  <r.icon className="h-3.5 w-3.5 text-stump-gold" />
                  <span>{r.title.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Role Deep Dive Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            {/* Left: Role Specs */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-pitch-green/10 dark:bg-pitch-green-800/50 px-2 py-1 text-xs font-bold text-pitch-green dark:text-stump-gold uppercase">
                  Portal Selected: {selectedRole.title}
                </span>
                <span className="text-xs text-muted-foreground">Path: {selectedRole.destination}</span>
              </div>

              <h4 className="font-heading text-xl sm:text-2xl font-bold text-pitch-green dark:text-chalk">
                {selectedRole.subtitle}
              </h4>

              <p className="text-sm text-ink/80 dark:text-chalk/80 leading-relaxed">
                {selectedRole.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {selectedRole.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-xl border border-border/70 bg-chalk-50/50 dark:bg-pitch-green-950/40 p-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-pitch-green dark:text-stump-gold" />
                    <span className="text-xs font-semibold">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => handleSimulateLogin(selectedRole)}
                  variant="pitch"
                  className="gap-2 shadow-md"
                >
                  <LogIn className="h-4 w-4 text-stump-gold" />
                  <span>Launch {selectedRole.title}</span>
                </Button>

                <Button
                  onClick={() => handleOpenAuthModal(selectedRole)}
                  variant="outline"
                  className="gap-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Inspect Credentials</span>
                </Button>
              </div>
            </div>

            {/* Right: Mock Login Card & Portal Preview Card */}
            <div className="lg:col-span-6 rounded-2xl border-2 border-border/80 bg-chalk-100/90 dark:bg-pitch-green-950/80 p-6 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-3 w-3 rounded-full bg-leather-red" />
                  <div className="flex h-3 w-3 rounded-full bg-stump-gold" />
                  <div className="flex h-3 w-3 rounded-full bg-pitch-green" />
                  <span className="text-xs font-mono font-bold text-muted-foreground ml-2">
                    auth.crickacademy.pwa / {selectedRole.id}
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">
                  RBAC SECURE
                </Badge>
              </div>

              {/* Mock Form Preview */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Simulated Account / User ID
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono font-bold text-pitch-green dark:text-stump-gold">
                    <span>{selectedRole.mockEmail}</span>
                    <span className="rounded bg-pitch-green/10 px-1.5 py-0.5 text-[10px] font-sans text-pitch-green dark:text-chalk">
                      Verified
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Assigned Security Role
                  </label>
                  <div className="mt-1 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-ink dark:text-chalk">
                    {selectedRole.mockRole}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Destination Workspace
                  </label>
                  <div className="mt-1 flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono text-muted-foreground">
                    <span>{selectedRole.destination}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">200 OK</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => handleSimulateLogin(selectedRole)}
                    disabled={isSimulatingAuth}
                    className="w-full bg-pitch-green hover:bg-pitch-green-700 text-chalk gap-2 shadow-md text-xs font-bold"
                  >
                    {isSimulatingAuth ? (
                      <>
                        <span className="h-3.5 w-3.5 border-2 border-chalk border-t-transparent rounded-full animate-spin" />
                        <span>Verifying & Opening Workspace...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-3.5 w-3.5 text-stump-gold" />
                        <span>Enter Workspace as {selectedRole.title.split(" ")[0]}</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Credential Simulation Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
          <div className="relative w-full max-w-md rounded-2xl border-2 border-border/80 bg-card p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pitch-green text-chalk">
                  <selectedRole.icon className="h-5 w-5 text-stump-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    {selectedRole.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">Credential & Role Preview</p>
                </div>
              </div>

              <button
                onClick={() => setAuthModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-chalk-200 hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl bg-chalk-100 dark:bg-pitch-green-950 p-3 border border-border">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Upcoming Production Authentication Flow
                </p>
                <p className="text-xs text-ink/80 dark:text-chalk/80 mt-1 leading-relaxed">
                  In the final production release, users will log in using their registered mobile
                  number (SMS OTP) or Email credentials. After authentication, the RBAC gateway
                  will instantly direct them to:
                </p>
                <div className="mt-2 font-mono text-[11px] bg-card p-2 rounded-lg border text-pitch-green dark:text-stump-gold font-bold">
                  {selectedRole.destination}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <span className="text-muted-foreground font-semibold">Demo User:</span>
                  <span className="font-bold text-foreground">{selectedRole.mockRole}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <span className="text-muted-foreground font-semibold">Demo Email:</span>
                  <span className="font-mono font-bold text-pitch-green dark:text-stump-gold">
                    {selectedRole.mockEmail}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/60 py-1.5">
                  <span className="text-muted-foreground font-semibold">Demo Password:</span>
                  <span className="font-mono font-bold text-muted-foreground">●●●●●●●● (Bypassed)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground font-semibold">Access Level:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Full Role Permissions
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setAuthModalOpen(false)}
                className="w-1/2 text-xs"
              >
                Close
              </Button>
              <Button
                variant="pitch"
                onClick={() => handleSimulateLogin(selectedRole)}
                disabled={isSimulatingAuth}
                className="w-1/2 text-xs font-bold gap-1.5"
              >
                <LogIn className="h-3.5 w-3.5 text-stump-gold" />
                <span>Enter Portal Now</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
