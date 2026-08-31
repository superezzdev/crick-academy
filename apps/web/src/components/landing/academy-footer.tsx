"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  MapPin,
  Phone,
  Mail,
  Clock,
  Crown,
  Activity,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@crick-academy/ui";

export function AcademyFooter() {
  return (
    <footer className="border-t border-border/80 bg-pitch-green text-chalk pt-16 pb-12 relative overflow-hidden">
      {/* Decorative stadium glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-stump-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stump-gold text-pitch-green shadow-xl font-bold">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-2xl font-black tracking-wider uppercase text-chalk">
                  CHANDIGARH <span className="text-stump-gold">CRICKET ACADEMY</span>
                </p>
                <p className="text-xs text-chalk/75">
                  North India's Premier High-Performance Youth Training Ground
                </p>
              </div>
            </div>

            <p className="text-xs text-chalk/80 leading-relaxed max-w-sm">
              Dedicated to developing world-class cricket athletes through elite coaching, modern biomechanics, match-ready turf pitches, and certified state pathways.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-chalk/80 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-stump-gold" />
                BCCI Certified Mentors
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-stump-gold" />
                28 Titles Won
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="h-4 w-4 text-stump-gold" />
                Live Turf PWA
              </span>
            </div>
          </div>

          {/* Col 3: Programs & Pathways */}
          <div className="space-y-3">
            <p className="font-heading text-sm font-bold text-stump-gold uppercase tracking-wider">
              Training Batches
            </p>
            <ul className="space-y-2 text-xs text-chalk/80">
              <li>
                <a href="#programs" className="hover:text-stump-gold transition-colors">
                  Grassroots Foundation (Ages 6-10)
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-stump-gold transition-colors">
                  Junior Development Squad (11-14)
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-stump-gold transition-colors">
                  High-Performance Elite (15-19)
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-stump-gold transition-colors">
                  Weekend Mastery Camp
                </a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-stump-gold transition-colors">
                  Student Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Role Portals (Platform Access) */}
          <div className="space-y-3">
            <p className="font-heading text-sm font-bold text-stump-gold uppercase tracking-wider">
              Academy Portals
            </p>
            <ul className="space-y-2 text-xs text-chalk/80">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-stump-gold flex items-center gap-1.5 transition-colors"
                >
                  <Crown className="h-3.5 w-3.5 text-stump-gold" />
                  <span>Admin Owner Console</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/coach"
                  className="hover:text-stump-gold flex items-center gap-1.5 transition-colors"
                >
                  <Activity className="h-3.5 w-3.5 text-leather-red" />
                  <span>Coach Desk & Drills</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/portal?studentId=stud_aarav_sharma"
                  className="hover:text-stump-gold flex items-center gap-1.5 transition-colors"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-stump-gold" />
                  <span>Student Athlete Locker</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parent"
                  className="hover:text-stump-gold flex items-center gap-1.5 transition-colors"
                >
                  <HeartHandshake className="h-3.5 w-3.5 text-stump-gold" />
                  <span>Parent & Guardian Desk</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tournaments"
                  className="hover:text-stump-gold flex items-center gap-1.5 transition-colors"
                >
                  <Trophy className="h-3.5 w-3.5 text-stump-gold" />
                  <span>Tournaments & Brackets</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Contact */}
          <div className="space-y-3">
            <p className="font-heading text-sm font-bold text-stump-gold uppercase tracking-wider">
              Stadium & Contact
            </p>
            <ul className="space-y-2.5 text-xs text-chalk/85">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-stump-gold shrink-0 mt-0.5" />
                <span>
                  Sector 16 Cricket Stadium, Sector 16-D, Chandigarh, 160016 (Opp. Rose Garden)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-stump-gold shrink-0" />
                <span>+91 98765 43210 (Admissions)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-stump-gold shrink-0" />
                <span>admissions@chandigarhcricket.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-stump-gold shrink-0" />
                <span>Nets: 06:00 AM - 09:00 PM (Daily)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner with Map & Copyright */}
        <div className="border-t border-chalk/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-chalk/70">
          <p>© 2026 Chandigarh Cricket Academy (CCA). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#enroll-form" className="text-stump-gold hover:underline font-bold">
              Book Trial Session
            </a>
            <span>•</span>
            <Link href="/dashboard" className="hover:text-chalk">
              Admin Portal
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Admissions Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
