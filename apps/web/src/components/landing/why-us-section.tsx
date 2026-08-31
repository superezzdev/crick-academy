"use client";

import React from "react";
import {
  Trophy,
  ShieldCheck,
  Zap,
  Target,
  Award,
  Video,
  Flame,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles
} from "lucide-react";

export function WhyUsSection() {
  const stats = [
    {
      value: "14+",
      label: "Years of Excellence",
      subtext: "Shaping young talent since 2012",
      icon: Calendar,
      color: "text-stump-gold"
    },
    {
      value: "1,200+",
      label: "Students Trained",
      subtext: "From beginners to state stars",
      icon: Users,
      color: "text-emerald-500"
    },
    {
      value: "28",
      label: "Tournament Trophies",
      subtext: "Summer & Monsoon titles",
      icon: Trophy,
      color: "text-amber-500"
    },
    {
      value: "94%",
      label: "District Selection Rate",
      subtext: "For advanced elite batch athletes",
      icon: Award,
      color: "text-leather-red"
    }
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      badge: "BCCI Level 2 & 3",
      title: "Masterclass Coaching Team",
      description:
        "Led by former Ranji Trophy stalwarts and NIS certified coaches who give personalized attention with a strict 1:8 net coach-to-student ratio.",
      perks: [
        "Head Coach Vikram Rathour (BCCI L-3)",
        "Specialist Spin & Fast Bowling Mentors",
        "Individual Biomechanics Correction"
      ]
    },
    {
      icon: Target,
      badge: "International Standard",
      title: "World-Class Turf Facilities",
      description:
        "Practice on curated red-soil turf wickets, floodlit astro nets, and dedicated speed lanes equipped with programmable bowling machines.",
      perks: [
        "4 Full-Length Match Turf Pitches",
        "2 AstroTurf Indoor All-Weather Nets",
        "Bola Pro Bowling Machines (up to 145 km/h)"
      ]
    },
    {
      icon: Video,
      badge: "Sports Science",
      title: "Video Analysis & Speed Radar",
      description:
        "Every athlete’s batting backlift, bowling release point, and sprint biomechanics are analyzed using frame-by-frame video feedback.",
      perks: [
        "High-Speed 240fps Stance Capture",
        "Radar Gun Ball Velocity Tracking",
        "Monthly Player Progress Report Card"
      ]
    },
    {
      icon: Trophy,
      badge: "Match Exposure",
      title: "Active Tournament Calendar",
      description:
        "Cricket is learned in the middle. CCA students participate in 40+ competitive matches per season against premier clubs and school academies.",
      perks: [
        "Summer Cup & Monsoon League Trophies",
        "Inter-District & State Trial Scouting",
        "Weekend Day-Night 30-Over Fixtures"
      ]
    }
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-card/60 relative overflow-hidden border-b border-border/80">
      <div className="container mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-stump-gold/15 px-4 py-1 text-xs font-black tracking-wider text-stump-gold-800 dark:text-stump-gold uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Chandigarh Cricket Academy Advantage</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pitch-green dark:text-chalk tracking-tight">
            WHY PARENTS & PRODIGIES CHOOSE CCA
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            We don't just offer net practice. We provide a complete professional cricketing pathway—from basic grip mechanics to state-level tournament victories.
          </p>
        </div>

        {/* Real-Feeling Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="relative rounded-3xl border-2 border-border/80 bg-card p-6 text-center space-y-2 shadow-lg hover:border-stump-gold/60 transition-all hover:translate-y-[-2px] group"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch-green/10 dark:bg-pitch-green-950 text-pitch-green dark:text-stump-gold group-hover:scale-110 transition-transform">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-pitch-green dark:text-chalk tracking-tight">
                  {stat.value}
                </p>
                <p className="font-heading text-sm sm:text-base font-bold text-foreground">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* 4 Core Pillars Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl border-2 border-border/90 bg-card p-6 sm:p-8 shadow-md hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch-green text-chalk shadow-md">
                      <Icon className="h-6 w-6 text-stump-gold" />
                    </div>
                    <span className="rounded-full bg-stump-gold/20 border border-stump-gold/40 px-3 py-1 text-[11px] font-bold text-stump-gold-800 dark:text-stump-gold uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-pitch-green dark:text-chalk">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-pitch-green dark:text-stump-gold">
                    What Athletes Experience:
                  </p>
                  <ul className="space-y-2">
                    {pillar.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
