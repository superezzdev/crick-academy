"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  CalendarCheck,
  CreditCard,
  Crown,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  Play
} from "lucide-react";
import { Button } from "@crick-academy/ui";
import { AdmissionModal } from "./admission-modal";

export function HeroSection() {
  const [admissionOpen, setAdmissionOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 border-b border-border/80">
      {/* Background Turf Grid & Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pitch-green/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-stump-gold/15 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Live Academy Status Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-pitch-green/25 bg-chalk-100/90 dark:bg-pitch-green-950/80 px-4 py-1.5 text-xs font-bold shadow-xs">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-pitch-green dark:text-stump-gold font-heading tracking-wider uppercase">
              LIVE ACADEMY OPS
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-ink/80 dark:text-chalk/80 text-[11px]">
              3 Turf Nets Active • Morning U-16 Squad in Session
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-stump-gold/25 px-3 py-1 text-xs font-bold text-stump-gold-800 dark:text-stump-gold">
            <Trophy className="h-3.5 w-3.5" />
            <span>Monsoon Champions Trophy 2026 Live</span>
          </div>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-pitch-green dark:text-chalk leading-[1.08]">
            WHERE CRICKET DREAMS TURN INTO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stump-gold via-leather-red to-stump-gold">
              MATCH-WINNING
            </span>{" "}
            REALITY
          </h1>

          <p className="text-base sm:text-lg text-ink/80 dark:text-chalk/80 max-w-2xl mx-auto leading-relaxed">
            The next-generation, high-performance cricket academy management platform.
            Unifying <strong>Academy Owners</strong>, <strong>Coaches</strong>,{" "}
            <strong>Athletes</strong>, and <strong>Parents</strong> in one synchronized ecosystem.
          </p>

          {/* Direct CTA Group */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a href="#portals">
              <Button
                variant="pitch"
                size="lg"
                className="gap-2.5 text-sm sm:text-base font-bold shadow-xl hover:scale-105 transition-all"
              >
                <Zap className="h-4 w-4 text-stump-gold" />
                <span>Explore Role Portals</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>

            <Button
              onClick={() => setAdmissionOpen(true)}
              variant="gold"
              size="lg"
              className="gap-2 text-sm sm:text-base font-bold shadow-md hover:scale-105 transition-all"
            >
              <CalendarCheck className="h-4 w-4 text-pitch-green" />
              <span>Book Free Trial Net</span>
            </Button>
          </div>

          {/* Quick 4-Persona Launcher Ribbon */}
          <div className="pt-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Direct Portal Access Links (Click to Test)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2.5 rounded-2xl border-2 border-border/70 bg-card p-3 text-left transition-all hover:border-pitch-green hover:shadow-lg"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pitch-green text-chalk shadow-xs group-hover:scale-105">
                  <Crown className="h-4 w-4 text-stump-gold" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk group-hover:text-pitch-green">
                    Admin
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    KPIs & Financials
                  </p>
                </div>
              </Link>

              <Link
                href="/coach"
                className="group flex items-center gap-2.5 rounded-2xl border-2 border-border/70 bg-card p-3 text-left transition-all hover:border-leather-red hover:shadow-lg"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-leather-red text-chalk shadow-xs group-hover:scale-105">
                  <Activity className="h-4 w-4 text-chalk" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk group-hover:text-leather-red">
                    Coach
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Nets & Attendance
                  </p>
                </div>
              </Link>

              <Link
                href="/portal?studentId=stud_aarav_sharma"
                className="group flex items-center gap-2.5 rounded-2xl border-2 border-border/70 bg-card p-3 text-left transition-all hover:border-stump-gold hover:shadow-lg"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stump-gold text-pitch-green font-bold text-sm shadow-xs group-hover:scale-105">
                  🏏
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk group-hover:text-stump-gold">
                    Student
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Locker & Stats
                  </p>
                </div>
              </Link>

              <Link
                href="/parent"
                className="group flex items-center gap-2.5 rounded-2xl border-2 border-border/70 bg-card p-3 text-left transition-all hover:border-pitch-green hover:shadow-lg"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pitch-green-800 text-chalk shadow-xs group-hover:scale-105">
                  <HeartHandshake className="h-4 w-4 text-stump-gold" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk group-hover:text-pitch-green">
                    Parent
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Safety & UPI Pay
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Digital Stadium Scoreboard Ticker Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto">
          <div className="rounded-2xl border-2 border-border/80 bg-card p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-pitch-green dark:text-stump-gold mb-1">
              <Users className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Enrolled Athletes</span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-pitch-green dark:text-chalk">
              128
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold">+18% this season</p>
          </div>

          <div className="rounded-2xl border-2 border-border/80 bg-card p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-pitch-green dark:text-stump-gold mb-1">
              <CalendarCheck className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Daily Net Slots</span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-pitch-green dark:text-chalk">
              12 Slots
            </p>
            <p className="text-[10px] text-muted-foreground">Turf & Astro Pitches</p>
          </div>

          <div className="rounded-2xl border-2 border-border/80 bg-card p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-pitch-green dark:text-stump-gold mb-1">
              <CreditCard className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Fee Collection</span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-pitch-green dark:text-chalk">
              94.2%
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold">Instant UPI Sync</p>
          </div>

          <div className="rounded-2xl border-2 border-border/80 bg-card p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-pitch-green dark:text-stump-gold mb-1">
              <Trophy className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Tournaments Won</span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-extrabold text-pitch-green dark:text-chalk">
              14 Cups
            </p>
            <p className="text-[10px] text-stump-gold-800 dark:text-stump-gold font-semibold">
              State & District Level
            </p>
          </div>
        </div>
      </div>

      <AdmissionModal isOpen={admissionOpen} onClose={() => setAdmissionOpen(false)} />
    </section>
  );
}
