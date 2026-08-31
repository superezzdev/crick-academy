"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Award,
  Zap,
  Target,
  Sparkles,
  Flame,
  ArrowRight,
  Shield,
  Activity,
  Star
} from "lucide-react";
import { Avatar, Badge, Button } from "@crick-academy/ui";

export function PlayerSpotlights() {
  const spotlights = [
    {
      id: "stud_aarav_sharma",
      name: "Aarav Sharma",
      age: 16,
      batch: "Morning Batch",
      discipline: "All-Rounder",
      battingStyle: "Right-Hand Bat",
      bowlingStyle: "Right-Arm Fast (128 km/h)",
      avatarFallback: "AS",
      badgeText: "Summer Cup MVP 2026",
      badgeColor: "bg-stump-gold text-pitch-green",
      keyStats: [
        { label: "Grand Final", value: "74 (46 balls)" },
        { label: "SF-1 Knock", value: "62 (41 balls)" },
        { label: "Wickets", value: "3 Wkts (1/18, 2/22)" },
        { label: "Strike Rate", value: "158.5" }
      ],
      achievement: "Selected for Punjab State U-16 Squad Probables",
      testimonial:
        "“The biomechanical analysis at CCA transformed my front-foot bat speed and added 8 km/h to my bowling pace in just 6 months.”",
      joinedYear: "Joined 2024"
    },
    {
      id: "stud_devendra_rao",
      name: "Devendra Rao",
      age: 17,
      batch: "Morning Batch",
      discipline: "Spin Specialist",
      battingStyle: "Right-Hand Bat",
      bowlingStyle: "Left-Arm Orthodox Spin",
      avatarFallback: "DR",
      badgeText: "Purple Cap Winner",
      badgeColor: "bg-purple-600 text-chalk",
      keyStats: [
        { label: "Tournament Wickets", value: "7 Wickets" },
        { label: "SF Spell", value: "4/16 (4 overs)" },
        { label: "Final Spell", value: "3/22 (4 overs)" },
        { label: "Economy", value: "4.75 RPO" }
      ],
      achievement: "Tricity Inter-District Best Bowler Award",
      testimonial:
        "“Coach Vikram helped me master the arm-ball and drift. Bowling on the Sector 16 turf nets prepared me for high-pressure match situations.”",
      joinedYear: "Joined 2023"
    },
    {
      id: "stud_kabir_singh",
      name: "Kabir Singh",
      age: 13,
      batch: "Evening Batch",
      discipline: "Top-Order Batsman",
      battingStyle: "Right-Hand Top Order",
      bowlingStyle: "Specialist Batsman",
      avatarFallback: "KS",
      badgeText: "U-14 Best Batsman",
      badgeColor: "bg-emerald-600 text-chalk",
      keyStats: [
        { label: "Grand Final", value: "48 (35 balls)" },
        { label: "SF-2 Chase", value: "44 (32 balls)" },
        { label: "Tournament Avg", value: "46.0" },
        { label: "Boundaries", value: "14 Fours" }
      ],
      achievement: "Top Run Scorer • Junior Championship 2026",
      testimonial:
        "“The structured net drills and match scenario sessions helped me stay calm during tough run chases in the knockout rounds.”",
      joinedYear: "Joined 2025"
    },
    {
      id: "stud_vihaan_deshmukh",
      name: "Vihaan Deshmukh",
      age: 12,
      batch: "Evening Batch",
      discipline: "Leg-Spin All-Rounder",
      battingStyle: "Right-Hand Bat",
      bowlingStyle: "Right-Arm Leg Spin",
      avatarFallback: "VD",
      badgeText: "Rising Star Award",
      badgeColor: "bg-leather-red text-chalk",
      keyStats: [
        { label: "Best Figures", value: "2/22 in Semi-Final" },
        { label: "Match Finish", value: "24* (16 balls)" },
        { label: "Economy", value: "5.5 RPO" },
        { label: "Catches", value: "3 Sharp Catches" }
      ],
      achievement: "Fast-Tracked into Junior Development Squad",
      testimonial:
        "“I started in the soft-ball grassroots camp. Within 10 months, CCA coaches refined my wrist position and taught me the wrong-un.”",
      joinedYear: "Joined 2025"
    }
  ];

  return (
    <section id="spotlight" className="py-16 lg:py-24 bg-card/40 relative overflow-hidden border-b border-border/80">
      <div className="container mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-leather-red/15 px-4 py-1 text-xs font-black tracking-wider text-leather-red uppercase">
            <Flame className="h-3.5 w-3.5 fill-leather-red" />
            <span>Proven Student Track Record</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pitch-green dark:text-chalk tracking-tight">
            PLAYER SPOTLIGHTS & SUCCESS STORIES
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Real athletes, real match figures. Meet the young cricketers who honed their craft at Chandigarh Cricket Academy and won state championships.
          </p>
        </div>

        {/* Spotlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spotlights.map((player) => (
            <div
              key={player.id}
              className="relative rounded-3xl border-2 border-border/80 bg-card p-6 flex flex-col justify-between shadow-xl hover:border-stump-gold/60 transition-all hover:translate-y-[-3px] group"
            >
              <div className="space-y-5">
                {/* Header: Avatar, Badge & Role */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <Avatar
                      fallback={player.avatarFallback}
                      size="lg"
                      className="h-16 w-16 text-xl font-bold bg-pitch-green text-chalk ring-2 ring-stump-gold shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-stump-gold text-pitch-green text-[10px] font-black shadow-xs">
                      ★
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${player.badgeColor}`}
                  >
                    {player.badgeText}
                  </span>
                </div>

                {/* Player Name & Disciplines */}
                <div>
                  <h3 className="font-heading text-xl font-bold text-pitch-green dark:text-chalk">
                    {player.name}
                  </h3>
                  <p className="text-xs font-semibold text-stump-gold-800 dark:text-stump-gold">
                    {player.discipline} • Age {player.age}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {player.battingStyle} | {player.bowlingStyle}
                  </p>
                </div>

                {/* Highlighted Match Stats Grid */}
                <div className="rounded-2xl bg-chalk-100 dark:bg-pitch-green-950/70 p-3 border border-border grid grid-cols-2 gap-2 text-center">
                  {player.keyStats.map((stat, sIdx) => (
                    <div key={sIdx} className="p-1 rounded-lg bg-card/60">
                      <p className="text-[9px] uppercase font-bold text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="font-heading text-xs font-extrabold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Achievement Callout */}
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <Award className="h-4 w-4 shrink-0" />
                  <span className="leading-tight">{player.achievement}</span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs italic text-muted-foreground leading-relaxed">
                  {player.testimonial}
                </p>
              </div>

              {/* Locker Link */}
              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{player.joinedYear}</span>
                <Link
                  href={`/portal?studentId=${player.id}`}
                  className="font-bold text-pitch-green dark:text-stump-gold hover:underline flex items-center gap-1"
                >
                  <span>View Student Locker</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* State Selection Banner */}
        <div className="rounded-3xl border-2 border-stump-gold/40 bg-gradient-to-r from-pitch-green via-pitch-green-800 to-pitch-green text-chalk p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-stump-gold text-pitch-green font-bold text-2xl shadow-lg">
              🏏
            </div>
            <div>
              <p className="font-heading text-xl sm:text-2xl font-black text-stump-gold">
                14 PRODIGIES SELECTED FOR STATE & DISTRICT SQUADS
              </p>
              <p className="text-xs text-chalk/80 max-w-xl leading-relaxed">
                Our curriculum aligns strictly with BCCI state selection metrics, ensuring your child receives the exact technical foundation scouted by state selectors.
              </p>
            </div>
          </div>

          <a href="#enroll-form">
            <Button
              variant="gold"
              size="lg"
              className="shrink-0 gap-2 font-bold text-xs sm:text-sm text-pitch-green shadow-xl hover:scale-105 transition-transform"
            >
              <span>Join the Champions Squad</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
