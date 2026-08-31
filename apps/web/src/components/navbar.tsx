"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@crick-academy/ui";
import {
  Trophy,
  Users,
  Calendar,
  CreditCard,
  Bell,
  Menu,
  X,
  Smartphone,
  GraduationCap,
  Activity,
  HeartHandshake,
  Crown,
  Sparkles,
  Zap,
  PhoneCall,
  Flame,
  Compass
} from "lucide-react";
import { RoleSwitcher } from "@/components/role-switcher";
import { AdmissionModal } from "@/components/landing/admission-modal";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);

  const scrollToEnroll = () => {
    const el = document.getElementById("enroll-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setAdmissionModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-chalk-100/90 backdrop-blur-md dark:bg-pitch-green-950/90 shadow-xs">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pitch-green text-chalk shadow-md group-hover:scale-105 transition-transform">
              <Trophy className="h-5 w-5 text-stump-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg sm:text-xl font-black tracking-wider text-pitch-green uppercase dark:text-chalk">
                  CHANDIGARH <span className="text-leather-red">CRICKET</span>
                </span>
                <span className="hidden md:inline-block rounded bg-stump-gold/20 px-1.5 py-0.5 text-[9px] font-black text-stump-gold-800 uppercase tracking-widest">
                  CCA
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-muted-foreground leading-none">
                Sector 16 High-Performance Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold text-ink/80 dark:text-chalk/80">
            <a
              href="#why-us"
              className="transition-colors hover:text-pitch-green dark:hover:text-stump-gold flex items-center gap-1"
            >
              Why CCA
            </a>
            <a
              href="#programs"
              className="transition-colors hover:text-pitch-green dark:hover:text-stump-gold flex items-center gap-1"
            >
              Batches & Timing
            </a>
            <a
              href="#spotlight"
              className="transition-colors hover:text-pitch-green dark:hover:text-stump-gold flex items-center gap-1"
            >
              Player Spotlight
            </a>
            <a
              href="#enroll-form"
              className="text-pitch-green dark:text-stump-gold font-extrabold flex items-center gap-1"
            >
              <Zap className="h-3.5 w-3.5 fill-stump-gold" />
              Admissions
            </a>
            <div className="h-4 w-px bg-border/80" />
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-muted-foreground hover:text-pitch-green dark:hover:text-stump-gold text-xs font-semibold"
            >
              <Crown className="h-3 w-3 text-stump-gold" />
              Portal Access
            </Link>
          </nav>

          {/* Action Buttons & Role Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Global Role Switcher */}
            <RoleSwitcher />

            {/* Trial Net Session CTA */}
            <Button
              onClick={scrollToEnroll}
              variant="gold"
              size="sm"
              className="hidden sm:inline-flex gap-1.5 text-xs font-extrabold text-pitch-green shadow-md hover:scale-105 transition-transform"
            >
              <Zap className="h-3.5 w-3.5 text-pitch-green fill-pitch-green" />
              <span>Book Trial Session</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-chalk-100 p-4 space-y-3 shadow-xl dark:bg-pitch-green-950">
            <div className="space-y-1">
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-foreground hover:bg-chalk-200 dark:hover:bg-pitch-green-900 rounded-lg"
              >
                Why Chandigarh Cricket Academy
              </a>
              <a
                href="#programs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-foreground hover:bg-chalk-200 dark:hover:bg-pitch-green-900 rounded-lg"
              >
                Training Batches & Timings
              </a>
              <a
                href="#spotlight"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-foreground hover:bg-chalk-200 dark:hover:bg-pitch-green-900 rounded-lg"
              >
                Player Spotlights & Achievements
              </a>
              <a
                href="#enroll-form"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-pitch-green dark:text-stump-gold bg-stump-gold/15 rounded-lg"
              >
                Book Free Trial Session
              </a>
            </div>

            <div className="pt-2 border-t border-border space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                Internal Demo Portals
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-background border border-border"
                >
                  <Crown className="h-3.5 w-3.5 text-stump-gold" />
                  <span>Admin</span>
                </Link>
                <Link
                  href="/coach"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-background border border-border"
                >
                  <Activity className="h-3.5 w-3.5 text-leather-red" />
                  <span>Coach</span>
                </Link>
                <Link
                  href="/portal?studentId=stud_aarav_sharma"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-background border border-border"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-stump-gold" />
                  <span>Student</span>
                </Link>
                <Link
                  href="/parent"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-background border border-border"
                >
                  <HeartHandshake className="h-3.5 w-3.5 text-pitch-green" />
                  <span>Parent</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Trial Admission Booking Modal */}
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
      />
    </>
  );
}
