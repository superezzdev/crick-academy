"use client";

import React from "react";
import {
  Clock,
  Users,
  Target,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { Button } from "@crick-academy/ui";

interface ProgramsSectionProps {
  onSelectBatch?: (batchName: string) => void;
}

export function ProgramsSection({ onSelectBatch }: ProgramsSectionProps) {
  const programs = [
    {
      id: "grassroots",
      batchValue: "Evening Batch (4:30 PM - 6:30 PM)",
      title: "Grassroots Foundation",
      ageGroup: "Ages 6 - 10 Years",
      tag: "Beginners & Sub-Juniors",
      schedule: "Mon, Wed, Fri • 04:30 PM - 06:30 PM",
      timingShort: "Evening Batch",
      coachRatio: "1:6 Coach Ratio",
      description:
        "Building passion and fundamental movement skills. Focuses on proper grip, batting stance, basic straight-bat drives, catching reflexes, and fun target games.",
      highlights: [
        "Soft-ball & light leather transition",
        "Eye-hand coordination & agility drills",
        "Introduction to bowling action mechanics",
        "Fun weekly mini-matches"
      ],
      featured: false
    },
    {
      id: "development",
      batchValue: "Morning Batch (6:30 AM - 8:30 AM)",
      title: "Junior Development Squad",
      ageGroup: "Ages 11 - 14 Years",
      tag: "Most Popular",
      schedule: "Tue, Thu, Sat • 06:30 AM - 08:30 AM",
      timingShort: "Morning Batch",
      coachRatio: "1:8 Coach Ratio",
      description:
        "Structured technical refinement on curated turf wickets. Mastering front-foot/back-foot stroke play, spin variations, pace bowling run-ups, and game strategy.",
      highlights: [
        "Regular turf wicket practice nets",
        "Bowling speed & line-and-length tracking",
        "Match scenario batting under pressure",
        "Summer Cup & internal league selection"
      ],
      featured: true
    },
    {
      id: "elite",
      batchValue: "High-Performance Elite Batch",
      title: "High-Performance Elite",
      ageGroup: "Ages 15 - 19 Years",
      tag: "State & District Aspirants",
      schedule: "Daily (Mon - Fri) • 06:00 AM - 09:00 AM",
      timingShort: "Intensive Morning Squad",
      coachRatio: "1:5 Specialist Ratio",
      description:
        "Rigorous training designed for district and state-level representation. High-speed bowling machines, tactical masterclasses, mental conditioning, and video analytics.",
      highlights: [
        "130+ km/h pace bowling machine drills",
        "Video biomechanics & 240fps frame analysis",
        "Strength, stamina & recovery regimens",
        "Direct scouting for Punjab & Haryana trials"
      ],
      featured: false
    },
    {
      id: "weekend",
      batchValue: "Weekend Batch (Sat & Sun)",
      title: "Weekend Mastery Camp",
      ageGroup: "All Ages (8 - 18 Years)",
      tag: "Ideal for School/College Students",
      schedule: "Saturdays & Sundays • 07:00 AM - 10:30 AM",
      timingShort: "Weekend Intensive",
      coachRatio: "1:8 Coach Ratio",
      description:
        "Comprehensive, intensive weekend curriculum designed for students balancing rigorous academics with serious cricket development.",
      highlights: [
        "3.5 hours of continuous intensive training",
        "2 full-length 25-over practice matches/month",
        "Specialist guest coach masterclasses",
        "Dedicated fitness & agility sessions"
      ],
      featured: false
    }
  ];

  const handleBatchClick = (batchValue: string) => {
    if (onSelectBatch) {
      onSelectBatch(batchValue);
    }
    const formEl = document.getElementById("enroll-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="programs" className="py-16 lg:py-24 relative overflow-hidden border-b border-border/80">
      <div className="container mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-pitch-green/10 dark:bg-pitch-green-900/50 px-4 py-1 text-xs font-black tracking-wider text-pitch-green dark:text-stump-gold uppercase">
            <Trophy className="h-3.5 w-3.5" />
            <span>Structured Development Pathways</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pitch-green dark:text-chalk tracking-tight">
            PROGRAMS & TRAINING BATCHES
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every age group and skill level has a specialized curriculum tailored to maximize potential and build confident, match-winning athletes.
          </p>
        </div>

        {/* 4 Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`relative rounded-3xl border-2 p-6 flex flex-col justify-between transition-all duration-300 ${
                program.featured
                  ? "border-stump-gold bg-gradient-to-b from-card via-card to-stump-gold/10 shadow-2xl scale-[1.02] lg:-translate-y-2 ring-2 ring-stump-gold/40"
                  : "border-border/90 bg-card hover:border-pitch-green/50 shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Highlight Tag */}
              {program.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-stump-gold text-pitch-green font-heading text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  ⭐ {program.tag}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {program.ageGroup}
                  </span>
                  {!program.featured && (
                    <span className="rounded-md bg-chalk-200 dark:bg-pitch-green-950 px-2 py-0.5 text-[10px] font-bold text-foreground">
                      {program.tag}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading text-2xl font-bold text-pitch-green dark:text-chalk">
                    {program.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stump-gold-800 dark:text-stump-gold">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>{program.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    <span>{program.coachRatio}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {program.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-pitch-green dark:text-stump-gold">
                    Core Focus Areas:
                  </p>
                  <ul className="space-y-1.5">
                    {program.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs font-medium text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <Button
                  onClick={() => handleBatchClick(program.batchValue)}
                  variant={program.featured ? "gold" : "pitch"}
                  size="sm"
                  className="w-full gap-2 text-xs font-bold rounded-xl shadow-md"
                >
                  <span>Select & Book Trial</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Batch Consultation Callout */}
        <div className="rounded-3xl bg-pitch-green-950 text-chalk p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-pitch-green/40 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading text-xl font-bold text-chalk">
              Not sure which batch fits your child best?
            </h4>
            <p className="text-xs text-chalk/80 max-w-xl">
              Book a complimentary 45-minute assessment trial. Our Head Coach will evaluate their stance, grip, hand-eye coordination, and recommend the ideal squad.
            </p>
          </div>
          <Button
            onClick={() => handleBatchClick("Morning Batch (6:30 AM - 8:30 AM)")}
            variant="gold"
            className="shrink-0 gap-2 text-xs sm:text-sm font-bold shadow-lg"
          >
            <Sparkles className="h-4 w-4 text-pitch-green" />
            <span>Book Free Assessment Net</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
