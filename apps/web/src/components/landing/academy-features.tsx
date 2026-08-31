"use client";

import React, { useState } from "react";
import {
  Trophy,
  Activity,
  CreditCard,
  CalendarCheck,
  Users,
  Smartphone,
  ShieldCheck,
  Zap,
  BarChart3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  QrCode
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";

export function AcademyFeatures() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      title: "Stadium Digital Scoreboard & Operations",
      subtitle: "Full Visibility over Batches, Coaches & Financials",
      badge: "Command Center",
      icon: BarChart3,
      description:
        "Real-time KPI metrics inspired by IPL stadium scoreboards. Monitor monthly collections, active student rosters across morning/evening batches, and daily net occupancy at a single glance.",
      bullets: [
        "Live student headcounts across U-12, U-14, U-16 and Senior squads",
        "Automated overdue fee flagging with 1-click WhatsApp reminders",
        "Net capacity gauges to avoid overcrowding and manage turf rotation",
        "Role-based permission controls for coaches and administrative staff"
      ],
      previewStats: [
        { label: "Active Roster", val: "128 Players" },
        { label: "Collection Rate", val: "94.2%" },
        { label: "Live Nets", val: "8 / 12 In Use" }
      ]
    },
    {
      title: "Pitch-Side Digital Attendance & Safety",
      subtitle: "Instant Check-In for Coaches & Parents",
      badge: "Real-Time Tracking",
      icon: Activity,
      description:
        "Coaches can take attendance right on the field in under 15 seconds. Automatic check-in and check-out timestamps are mirrored to the parent portal for athlete safety.",
      bullets: [
        "1-Tap Present / Late / Absent logging directly on mobile or tablet",
        "Ground arrival & departure safety notifications for guardians",
        "Historical attendance trends & consistency streaks for player awards",
        "Offline synchronization: records saved locally and synced when online"
      ],
      previewStats: [
        { label: "Avg Check-in Time", val: "12 Seconds" },
        { label: "Parent Safety Alerts", val: "Instant" },
        { label: "Offline Mode", val: "100% Ready" }
      ]
    },
    {
      title: "Automated Fee Ledger & UPI Receipts",
      subtitle: "Zero Financial Leakage with Digital Invoicing",
      badge: "Fintech Grade",
      icon: CreditCard,
      description:
        "Say goodbye to manual paper registers and missed dues. Generate itemized digital invoices, track UPI QR payments, and issue downloadable PDF receipts with complete audit logs.",
      bullets: [
        "Dynamic fee statuses: Paid, Partial, Overdue, and Waived",
        "One-click UPI QR simulator for instant parent clearance",
        "Automated GST-compliant billing receipts & transaction ID tracking",
        "Comprehensive exportable ledgers for annual academy accounting"
      ],
      previewStats: [
        { label: "Monthly Tracked", val: "₹ 1.84 Lakh" },
        { label: "Payment Methods", val: "UPI, Cards, Cash" },
        { label: "Receipt Speed", val: "Instant PDF" }
      ]
    },
    {
      title: "Tournaments & Match League Engine",
      subtitle: "Fixtures, Teams, Squad XI & Live Points Table",
      badge: "Competition Ready",
      icon: Trophy,
      description:
        "Run in-house inter-batch leagues and state invitationals. Create teams, assign player jerseys, build knockout or round-robin fixtures, and compute live Net Run Rates (NRR).",
      bullets: [
        "Automated match fixture scheduler with venue and timing assignments",
        "Live Orange Cap (Top Run Scorers) & Purple Cap (Top Wickets) leaderboards",
        "Match scorecards with strike rates, economy, sixes, and Man of the Match",
        "Team roster builder with squad selection & player form indicators"
      ],
      previewStats: [
        { label: "Active Tournaments", val: "3 Leagues" },
        { label: "Points Table NRR", val: "Auto-Calculated" },
        { label: "Player Rankings", val: "Live Sync" }
      ]
    }
  ];

  const currentFeature = features[activeTab];

  return (
    <section id="features" className="py-20 lg:py-28 border-b border-border/80 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-pitch-green/30 bg-pitch-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pitch-green dark:text-stump-gold">
            <Zap className="h-3.5 w-3.5" />
            <span>Built For Cricket Excellence</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-pitch-green dark:text-chalk tracking-tight">
            ENGINEERED FOR THE MODERN CRICKET ACADEMY
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Eliminate operational chaos. CrickAcademy provides high-speed, pitch-ready tools
            tested and optimized for academy owners, head coaches, and players.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            const isSelected = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-pitch-green text-chalk shadow-lg ring-2 ring-stump-gold scale-105"
                    : "bg-card border border-border text-ink/75 hover:bg-chalk-200 dark:hover:bg-pitch-green-900/60 dark:text-chalk"
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? "text-stump-gold" : "text-pitch-green"}`} />
                <span>{feat.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Deep-Dive Card */}
        <div className="rounded-3xl border-2 border-border/80 bg-card p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Descriptions & Bullets */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="rounded bg-stump-gold/30 px-2.5 py-0.5 text-[11px] font-bold text-stump-gold-800 dark:text-stump-gold uppercase tracking-wider">
                {currentFeature.badge}
              </span>
              <h3 className="font-heading text-2xl sm:text-4xl font-bold text-pitch-green dark:text-chalk mt-2">
                {currentFeature.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
                {currentFeature.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-ink/80 dark:text-chalk/80 leading-relaxed">
              {currentFeature.description}
            </p>

            {/* Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentFeature.bullets.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-xl bg-chalk-100/80 dark:bg-pitch-green-950/60 p-3 border border-border/70"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-pitch-green dark:text-stump-gold mt-0.5" />
                  <span className="text-xs font-semibold leading-snug">{b}</span>
                </div>
              ))}
            </div>

            {/* Quick Action */}
            <div className="pt-2">
              <a href="#portals">
                <Button variant="pitch" size="sm" className="gap-2 shadow-sm">
                  <span>Explore Role Portals</span>
                  <ArrowRight className="h-3.5 w-3.5 text-stump-gold" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Live Metric Showcase Box */}
          <div className="lg:col-span-5 rounded-2xl border-2 border-pitch-green/30 bg-pitch-green text-chalk p-6 shadow-2xl relative overflow-hidden space-y-6">
            {/* Background glowing cricket turf circle */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-stump-gold/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-chalk/20 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stump-gold text-pitch-green font-bold text-xs">
                  🏏
                </div>
                <div>
                  <p className="font-heading text-sm font-bold tracking-wider text-chalk">
                    CRICKACADEMY ENGINE
                  </p>
                  <p className="text-[10px] text-chalk/70">Verified System Benchmarks</p>
                </div>
              </div>
              <Badge variant="outline" className="text-stump-gold border-stump-gold/40 text-[10px]">
                LIVE PWA
              </Badge>
            </div>

            {/* Metric Displays */}
            <div className="space-y-3">
              {currentFeature.previewStats.map((st, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-pitch-green-900/80 p-3.5 border border-pitch-green-700/50"
                >
                  <span className="text-xs text-chalk/80">{st.label}</span>
                  <span className="font-heading text-lg font-bold text-stump-gold">{st.val}</span>
                </div>
              ))}
            </div>

            {/* PWA & Security Assurance */}
            <div className="pt-2 border-t border-chalk/20 flex items-center justify-between text-[11px] text-chalk/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-stump-gold" />
                Supabase Auth & RBAC
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5 text-stump-gold" />
                Offline IndexedDB
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
