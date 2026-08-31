"use client";

import React from "react";
import { Star, Trophy, Quote, Award, Sparkles, ShieldCheck } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Coach Kapil Dev Sharma",
      role: "Head Coach • Former Ranji Trophy Player & BCCI Level-2",
      quote:
        "Taking attendance on grass pitches with zero Wi-Fi used to be a headache. With CrickAcademy PWA, I log 40 players in 20 seconds, evaluate bowling speeds, and the parents get immediate updates. Game changer.",
      rating: 5,
      tag: "Coach Portal User",
      avatarBg: "bg-pitch-green text-chalk"
    },
    {
      name: "Vikramaditya Oberoi",
      role: "Founder & Director • Premier Cricket Center",
      quote:
        "Our fee collection jumped from 72% to 96% in the very first month. Parents love the instant WhatsApp UPI receipts and clear fee ledger, while I can see our financial scoreboard live every morning.",
      rating: 5,
      tag: "Academy Owner",
      avatarBg: "bg-stump-gold text-pitch-green font-bold"
    },
    {
      name: "Sunita & Rajesh Sharma",
      role: "Parents of Aarav Sharma (U-16 Elite Squad)",
      quote:
        "The parent portal gives us total peace of mind. We know the exact minute Aarav reaches the nets, his coach’s weekly technical remarks, and we can pay academy fees in one tap with UPI.",
      rating: 5,
      tag: "Parent Portal User",
      avatarBg: "bg-pitch-green-800 text-chalk"
    },
    {
      name: "Aarav Sharma",
      role: "U-16 State Team Selectee & Academy Captain",
      quote:
        "Seeing my wagon wheel, batting strike rate, and tournament leaderboard ranks right in my phone locker room motivates me to train harder every single net session.",
      rating: 5,
      tag: "Athlete Locker Room",
      avatarBg: "bg-leather-red text-chalk"
    }
  ];

  const hallOfFame = [
    {
      name: "Aarav Sharma",
      achievement: "Selected for State U-16 Championship",
      badge: "State Squad 2026",
      stats: "648 Runs • Avg 46.3"
    },
    {
      name: "Vihaan Kulkarni",
      achievement: "Purple Cap Winner - Monsoon Trophy",
      badge: "18 Wickets",
      stats: "Economy 4.2 • 5-Wkt Haul"
    },
    {
      name: "Dev Patel",
      achievement: "Fastest 50 in Inter-Academy League",
      badge: "54 off 18 Balls",
      stats: "Strike Rate 210.4"
    },
    {
      name: "Rohan Verma",
      achievement: "Best Wicketkeeper Dismissals Award",
      badge: "22 Dismissals",
      stats: "14 Catches • 8 Stumpings"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-chalk-100/50 dark:bg-pitch-green-950/30 border-b border-border/80 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-pitch-green/30 bg-pitch-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pitch-green dark:text-stump-gold">
            <Trophy className="h-3.5 w-3.5" />
            <span>Wall of Fame & Academy Voices</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-pitch-green dark:text-chalk tracking-tight">
            TRUSTED BY COACHES, ATHLETES & PARENTS
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Real feedback from the cricket community experiencing unmatched operational
            clarity and athletic excellence.
          </p>
        </div>

        {/* 4 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="space-y-4">
                {/* Rating & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="rounded-full bg-chalk-200/90 dark:bg-pitch-green-900/60 px-2 py-0.5 text-[10px] font-bold text-pitch-green dark:text-stump-gold">
                    {t.tag}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs text-ink/80 dark:text-chalk/80 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border/80">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-heading font-bold text-xs shadow-xs ${t.avatarBg}`}
                >
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk truncate">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academy Stars & Hall of Fame Banner */}
        <div className="rounded-3xl border-2 border-stump-gold/40 bg-gradient-to-r from-pitch-green via-pitch-green-900 to-pitch-green text-chalk p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-chalk/20">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-stump-gold font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Rising Stars of the Academy</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-chalk">
                RECENT ACADEMY SELECTIONS & MILESTONES
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-stump-gold">
              <Trophy className="h-4 w-4" />
              <span>Season 2025-26 Honors</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {hallOfFame.map((star, i) => (
              <div
                key={i}
                className="rounded-2xl bg-pitch-green-950/80 p-4 border border-pitch-green-700/60 space-y-2 hover:border-stump-gold transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-stump-gold/20 px-2 py-0.5 text-[10px] font-bold text-stump-gold">
                    {star.badge}
                  </span>
                  <Award className="h-4 w-4 text-stump-gold" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-chalk">{star.name}</p>
                  <p className="text-[11px] text-chalk/70 leading-snug">{star.achievement}</p>
                </div>
                <p className="text-[10px] font-mono font-bold text-stump-gold pt-1">
                  {star.stats}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
