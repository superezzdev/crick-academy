"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { AdmissionsHero } from "@/components/landing/admissions-hero";
import { WhyUsSection } from "@/components/landing/why-us-section";
import { ProgramsSection } from "@/components/landing/programs-section";
import { PlayerSpotlights } from "@/components/landing/player-spotlights";
import { EnrollmentFormSection } from "@/components/landing/enrollment-form-section";
import { AcademyFooter } from "@/components/landing/academy-footer";
import {
  Crown,
  Activity,
  GraduationCap,
  HeartHandshake,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  PhoneCall
} from "lucide-react";
import { Button } from "@crick-academy/ui";

export default function HomePage() {
  const [selectedBatch, setSelectedBatch] = useState<string>(
    "Morning Batch (6:30 AM - 8:30 AM)"
  );

  const handleSelectBatch = (batchName: string) => {
    setSelectedBatch(batchName);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-stump-gold selection:text-ink">
      {/* 1. Header & Navigation */}
      <Navbar />

      <main className="flex-1 space-y-0 pb-12">
        {/* 2. Hero Section with Live Match Highlight Anchor & Clear Conversion CTA */}
        <AdmissionsHero
          onBookTrialClick={() => {
            const el = document.getElementById("enroll-form");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 3. Why Us (Coaching Quality, Facilities, Track Record) */}
        <WhyUsSection />

        {/* 4. Programs / Batches Offered with Dynamic Batch Selection */}
        <ProgramsSection onSelectBatch={handleSelectBatch} />

        {/* 5. Student Success / Player Spotlight Cards */}
        <PlayerSpotlights />

        {/* 6. High-Converting Enrollment Interest Form (Posts to /api/admissions/enroll) */}
        <EnrollmentFormSection selectedBatch={selectedBatch} />

        {/* 7. Academy Portal Showcase Ribbon (For Demo Evaluators) */}
        <section className="container mx-auto px-4 sm:px-6 pt-12">
          <div className="rounded-3xl border-2 border-border/80 bg-chalk-100/60 dark:bg-pitch-green-950/40 p-6 sm:p-8 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-pitch-green/10 dark:bg-pitch-green-900/50 px-3.5 py-1 text-xs font-bold text-pitch-green dark:text-stump-gold uppercase tracking-wider">
              <Crown className="h-3.5 w-3.5" />
              <span>Full Academy Platform Demo</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-pitch-green dark:text-chalk">
              LOOKING TO TEST THE INTERNAL ACADEMY MANAGEMENT SYSTEM?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              CrickAcademy powers end-to-end turf operations for staff and families. Jump directly into any of our dedicated role portals:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
              <Link
                href="/dashboard"
                className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-card border border-border hover:border-stump-gold transition-all shadow-xs"
              >
                <Crown className="h-5 w-5 text-stump-gold mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-heading text-xs font-bold text-foreground">Admin Console</span>
                <span className="text-[10px] text-muted-foreground">Turf Ops & Fees</span>
              </Link>

              <Link
                href="/coach"
                className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-card border border-border hover:border-leather-red transition-all shadow-xs"
              >
                <Activity className="h-5 w-5 text-leather-red mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-heading text-xs font-bold text-foreground">Coach Desk</span>
                <span className="text-[10px] text-muted-foreground">Attendance & Drills</span>
              </Link>

              <Link
                href="/portal?studentId=stud_aarav_sharma"
                className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-card border border-border hover:border-stump-gold transition-all shadow-xs"
              >
                <GraduationCap className="h-5 w-5 text-stump-gold-600 mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-heading text-xs font-bold text-foreground">Student Locker</span>
                <span className="text-[10px] text-muted-foreground">Aarav Sharma</span>
              </Link>

              <Link
                href="/parent"
                className="group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-card border border-border hover:border-pitch-green transition-all shadow-xs"
              >
                <HeartHandshake className="h-5 w-5 text-pitch-green mb-1 group-hover:scale-110 transition-transform" />
                <span className="font-heading text-xs font-bold text-foreground">Parent Portal</span>
                <span className="text-[10px] text-muted-foreground">UPI Fee Pay & Stats</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Comprehensive Footer with Location and Contact */}
      <AcademyFooter />
    </div>
  );
}
