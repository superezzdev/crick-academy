"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button, StatCard } from "@crick-academy/ui";
import {
  Users,
  CalendarCheck,
  CreditCard,
  Trophy,
  PlusCircle,
  Activity,
  Award
} from "lucide-react";

export function GsapDashboardHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);



  return (
    <div ref={heroRef} className="relative overflow-hidden py-8 lg:py-12">
      {/* Background Subtle Cricket Pitch Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-pitch-green -translate-y-1/2" />
        <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-pitch-green" />
        <div className="absolute top-0 bottom-0 right-1/4 w-0.5 bg-pitch-green" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Top Title & Quick Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-border/70">
          <div className="space-y-2">
            <div className="hero-anim-item inline-flex items-center gap-2 rounded-full bg-pitch-green/10 px-3 py-1 text-xs font-bold text-pitch-green dark:text-stump-gold">
              <Activity className="h-3.5 w-3.5" />
              <span>ACADEMY CONTROL CENTER • LIVE</span>
            </div>
            <h1 className="hero-anim-item font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-pitch-green dark:text-chalk">
              EXCELLENCE ON THE PITCH
            </h1>
            <p className="hero-anim-item text-muted-foreground text-sm sm:text-base max-w-2xl">
              Manage player batches, schedule high-intensity net practices, track
              membership fees, and analyze tournament match performances with real-time sync.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="hero-anim-item flex flex-wrap items-center gap-3">
            <Button variant="pitch" className="gap-2 shadow-lg">
              <PlusCircle className="h-4 w-4 text-stump-gold" />
              Add Student
            </Button>
            <Button variant="gold" className="gap-2">
              <CalendarCheck className="h-4 w-4" />
              Book Net Session
            </Button>
            <Button variant="outline" className="gap-2">
              <Award className="h-4 w-4" />
              Log Match Score
            </Button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="stat-card-anim">
            <StatCard
              title="Active Students"
              value="128"
              subtitle="4 Batches (Morning & Evening)"
              icon={<Users className="h-6 w-6" />}
              accentColor="pitch"
              trend={{ value: "+12%", positive: true, label: "from last month" }}
            />
          </div>

          <div className="stat-card-anim">
            <StatCard
              title="Today's Net Slots"
              value="8 / 12"
              subtitle="6:30 AM - 8:30 AM Session"
              icon={<CalendarCheck className="h-6 w-6" />}
              accentColor="gold"
              trend={{ value: "4 slots left", positive: true, label: "capacity" }}
            />
          </div>

          <div className="stat-card-anim">
            <StatCard
              title="Monthly Fees"
              value="₹ 1,84,000"
              subtitle="94% Collected (Aug 2026)"
              icon={<CreditCard className="h-6 w-6" />}
              accentColor="pitch"
              trend={{ value: "6 pending", positive: false, label: "due this week" }}
            />
          </div>

          <div className="stat-card-anim">
            <StatCard
              title="Tournament Win Rate"
              value="78%"
              subtitle="14 Matches • 11 Won"
              icon={<Trophy className="h-6 w-6" />}
              accentColor="leather"
              trend={{ value: "+5.4%", positive: true, label: "vs last season" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
