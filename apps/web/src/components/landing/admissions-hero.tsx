"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  Users,
  Flame,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  MapPin,
  Clock,
  Compass,
  Play
} from "lucide-react";
import { Button } from "@crick-academy/ui";

interface AdmissionsHeroProps {
  onBookTrialClick?: () => void;
}

export function AdmissionsHero({ onBookTrialClick }: AdmissionsHeroProps) {
  const scrollToForm = () => {
    if (onBookTrialClick) {
      onBookTrialClick();
    } else {
      const el = document.getElementById("enroll-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-border/70 bg-gradient-to-b from-background via-pitch-green-50/40 to-background dark:via-pitch-green-950/30">
      {/* Background Stadium Glow & Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-pitch-green/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-stump-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-leather-red/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* 1. Live Match Highlight / Student Achievement Banner Anchor */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto rounded-2xl border-2 border-stump-gold/60 bg-gradient-to-r from-pitch-green-900 via-pitch-green-800 to-pitch-green-900 text-chalk p-3.5 sm:px-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stump-gold text-pitch-green font-bold shadow-md">
              <Trophy className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-stump-gold">
                  RECENT MATCH HIGHLIGHT • SUMMER CUP 2026 FINAL
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-chalk/95">
                CCA Thunderbolts Crowned Champions! Aarav Sharma <strong>74(46)</strong> & Devendra Rao <strong>4/16</strong>
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-stump-gold-200 bg-pitch-green-950/70 px-3 py-1.5 rounded-lg border border-stump-gold/30 shrink-0">
            <Flame className="h-3.5 w-3.5 text-leather-red fill-leather-red" />
            <span>14 Students Selected for State Trials</span>
          </div>
        </div>

        {/* 2. Main Hero Grid: Headline & Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Compelling Ad-Ready Copy & Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-pitch-green/10 border border-pitch-green/25 dark:bg-pitch-green-900/50 px-4 py-1.5 text-xs font-extrabold text-pitch-green dark:text-stump-gold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-pitch-green dark:text-stump-gold" />
              <span>Admissions Open • Fall 2026 Batch</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-pitch-green dark:text-chalk leading-[1.08]">
              WHERE YOUNG CRICKETERS BECOME{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stump-gold via-leather-red to-stump-gold">
                MATCH-WINNERS
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink/80 dark:text-chalk/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join <strong>Chandigarh Cricket Academy</strong>, North India’s premier youth coaching facility. 
              Train under <strong>BCCI Level-3 coaches</strong>, play on <strong>4 international-standard turf pitches</strong>, 
              and get guaranteed tournament exposure.
            </p>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm font-semibold text-ink/80 dark:text-chalk/80">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-4 w-4 text-pitch-green dark:text-stump-gold shrink-0" />
                <span>1:8 Coach-to-Student Net Ratio</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-4 w-4 text-pitch-green dark:text-stump-gold shrink-0" />
                <span>Video Analysis & Speed Radar</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-4 w-4 text-pitch-green dark:text-stump-gold shrink-0" />
                <span>Morning, Evening & Weekend Batches</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-4 w-4 text-pitch-green dark:text-stump-gold shrink-0" />
                <span>State & District Tournament Pathways</span>
              </div>
            </div>

            {/* Primary High-Converting CTA Area */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button
                onClick={scrollToForm}
                variant="gold"
                size="lg"
                className="w-full sm:w-auto gap-2.5 text-base font-extrabold shadow-xl hover:scale-105 transition-all text-pitch-green py-6 px-8 rounded-2xl"
              >
                <Zap className="h-5 w-5 text-pitch-green fill-pitch-green" />
                <span>Book a Free Trial Session</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <a href="#programs" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-sm sm:text-base font-bold bg-background/80 hover:bg-chalk-200 dark:hover:bg-pitch-green-900 py-6 px-6 rounded-2xl border-pitch-green/30 text-pitch-green dark:text-chalk"
                >
                  <Compass className="h-4 w-4" />
                  <span>View Batches & Timings</span>
                </Button>
              </a>
            </div>

            {/* Micro Social Proof Ticker */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
              </div>
              <span className="font-bold text-foreground">4.9/5</span>
              <span>• Over 250+ Parents Trust CCA</span>
            </div>
          </div>

          {/* Right Column: Grounded Visual Anchor Container with Cricket Elements */}
          <div className="lg:col-span-5 relative">
            {/* Visual Action Container Card */}
            <div className="relative rounded-3xl border-2 border-pitch-green/30 bg-card p-4 sm:p-6 shadow-2xl overflow-hidden space-y-4">
              {/* Photo Placeholder Container with Real Production Guidance */}
              <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-pitch-green-900 via-pitch-green-800 to-pitch-green-950 overflow-hidden border border-stump-gold/40 flex flex-col justify-between p-5 text-chalk">
                {/* Visual Glows & Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#E8C468_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-stump-gold/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full bg-pitch-green-950/80 backdrop-blur-md border border-stump-gold/40 px-3 py-1 text-[11px] font-bold text-stump-gold flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Sector 16 Stadium Turf
                  </span>
                  <span className="rounded-full bg-leather-red/90 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-chalk">
                    LIVE DRILL
                  </span>
                </div>

                {/* Center Stadium / Player Visual Concept */}
                <div className="relative z-10 my-auto text-center space-y-3 py-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-stump-gold/20 border border-stump-gold text-stump-gold shadow-lg backdrop-blur-sm">
                    <Trophy className="h-8 w-8 text-stump-gold" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-heading text-lg font-bold text-chalk">
                      HIGH-INTENSITY NET PRACTICE UNDER FLOODLIGHTS
                    </p>
                    <p className="text-[11px] text-chalk/75 max-w-xs mx-auto">
                      [Placeholder: Replace with authentic high-res action photo of CCA junior athletes batting against speed bowling lane]
                    </p>
                  </div>
                </div>

                {/* Bottom Stat Ticker */}
                <div className="relative z-10 grid grid-cols-3 gap-2 pt-2 border-t border-chalk/20 text-center text-xs">
                  <div>
                    <p className="text-[10px] text-chalk/70 uppercase">Bowling Speed</p>
                    <p className="font-heading font-extrabold text-stump-gold text-sm sm:text-base">128 km/h</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-chalk/70 uppercase">Active Nets</p>
                    <p className="font-heading font-extrabold text-chalk text-sm sm:text-base">4 Lanes</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-chalk/70 uppercase">Selection Rate</p>
                    <p className="font-heading font-extrabold text-emerald-400 text-sm sm:text-base">94%</p>
                  </div>
                </div>
              </div>

              {/* Coach & Stadium Accreditation Floating Snippet */}
              <div className="rounded-2xl bg-chalk-100 dark:bg-pitch-green-950/70 border border-border p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pitch-green text-stump-gold font-heading font-black text-sm">
                    CCA
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      Head Coach Vikram Rathour
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      BCCI Level-3 Certified • Ex-Punjab Ranji Trophy
                    </p>
                  </div>
                </div>
                <Button
                  onClick={scrollToForm}
                  size="sm"
                  variant="pitch"
                  className="text-xs font-bold shrink-0"
                >
                  Meet Coach
                </Button>
              </div>
            </div>

            {/* Decorative Floating Badges */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-card border-2 border-pitch-green/40 shadow-xl rounded-2xl p-3 items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-foreground">100% Safety Certified</p>
                <p className="text-[10px] text-muted-foreground">First-aid & Turf Safety Guard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
