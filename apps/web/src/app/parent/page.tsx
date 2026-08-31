"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CreditCard,
  Download,
  Phone,
  MessageCircle,
  Trophy,
  Calendar,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Zap,
  Award,
  AlertCircle
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";
import { Navbar } from "@/components/navbar";
import { SEED_STUDENTS } from "@/lib/data";
import { getStudentPortalData } from "@/lib/portal-data";
import { toast } from "sonner";

export default function ParentPortalPage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("stud_aarav_sharma");
  const [isPayingFee, setIsPayingFee] = useState<boolean>(false);
  const [feePaid, setFeePaid] = useState<boolean>(false);

  const currentStudent =
    SEED_STUDENTS.find((s) => s.id === selectedChildId) || SEED_STUDENTS[0];
  const portalData = getStudentPortalData(selectedChildId);

  const handlePayFee = () => {
    setIsPayingFee(true);
    toast.loading("Connecting to UPI Gateway...", { id: "upi-pay" });

    setTimeout(() => {
      setIsPayingFee(false);
      setFeePaid(true);
      toast.success("Payment of ₹4,500 successful! Invoice sent to your registered WhatsApp.", {
        id: "upi-pay"
      });
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-8 container mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Breadcrumb & Return */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pitch-green hover:underline dark:text-stump-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Landing Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Verified Guardian Link Active
            </span>
          </div>
        </div>

        {/* Parent Header Banner */}
        <div className="rounded-3xl border-2 border-pitch-green/30 bg-gradient-to-r from-pitch-green-100 via-chalk-100 to-stump-gold/15 dark:from-pitch-green-950 dark:via-pitch-green-900 dark:to-pitch-green-950 p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pitch-green text-chalk shadow-md">
                <HeartHandshake className="h-8 w-8 text-stump-gold" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-pitch-green/20 px-2.5 py-0.5 text-[10px] font-bold text-pitch-green dark:text-stump-gold uppercase tracking-wider">
                    Parent & Guardian Portal
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    SMS & WhatsApp Alerts On
                  </Badge>
                </div>
                <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-pitch-green dark:text-chalk">
                  RAJESH & SUNITA SHARMA
                </h1>
                <p className="text-xs text-muted-foreground">
                  Guardian of <strong>{currentStudent.name}</strong> • {currentStudent.batch}
                </p>
              </div>
            </div>

            {/* Child Switcher Dropdown for multi-child families */}
            <div className="bg-card/80 backdrop-blur-md p-3 rounded-2xl border border-border space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Linked Athlete Profile:
              </label>
              <select
                value={selectedChildId}
                onChange={(e) => {
                  setSelectedChildId(e.target.value);
                  setFeePaid(false);
                }}
                className="w-full rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-bold text-pitch-green dark:text-chalk focus:outline-none"
              >
                {SEED_STUDENTS.slice(0, 6).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.batch})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left (Ground Safety Check-in & Fee Pay) & Right (Coach Remarks & Match Fixtures) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Ground Safety & Live Attendance Card */}
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-card p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h2 className="font-heading text-xl font-bold text-pitch-green dark:text-chalk">
                    GROUND SAFETY & ATTENDANCE STATUS
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Checked-In at Nets
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-chalk-100 dark:bg-pitch-green-950/60 p-3 border border-border">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Arrival Timestamp</p>
                  <p className="font-heading text-lg font-bold text-pitch-green dark:text-stump-gold mt-0.5">
                    06:28 AM
                  </p>
                  <p className="text-[10px] text-emerald-600 font-semibold">On Time (Morning Batch)</p>
                </div>

                <div className="rounded-xl bg-chalk-100 dark:bg-pitch-green-950/60 p-3 border border-border">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Net Allocation</p>
                  <p className="font-heading text-lg font-bold text-pitch-green dark:text-chalk mt-0.5">
                    Turf Net #2
                  </p>
                  <p className="text-[10px] text-muted-foreground">Pace Bowling Net</p>
                </div>

                <div className="rounded-xl bg-chalk-100 dark:bg-pitch-green-950/60 p-3 border border-border">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Supervising Coach</p>
                  <p className="font-heading text-lg font-bold text-pitch-green dark:text-chalk mt-0.5 truncate">
                    Kapil Dev S.
                  </p>
                  <p className="text-[10px] text-muted-foreground">BCCI Level-2 Coach</p>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                <span>Auto SMS dispatched to +91 98765 43210 on ground entry.</span>
                <span className="font-bold text-[10px]">VERIFIED GATE SCAN</span>
              </div>
            </div>

            {/* Instant UPI Fee Clearance Card */}
            <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-stump-gold-800 dark:text-stump-gold" />
                  <h3 className="font-heading text-xl font-bold text-pitch-green dark:text-chalk">
                    ACADEMY FEE LEDGER & DUES
                  </h3>
                </div>
                <Badge variant={feePaid ? "default" : "outline"}>
                  {feePaid ? "ALL DUES CLEARED" : "INVOICE DUE"}
                </Badge>
              </div>

              <div className="rounded-2xl bg-chalk-100/90 dark:bg-pitch-green-950/70 p-5 border border-border space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-pitch-green dark:text-chalk">
                      September 2026 High-Performance Coaching Fee
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Includes 24 Net Practice Sessions, Video Analysis & Gym Access
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-2xl font-extrabold text-pitch-green dark:text-stump-gold">
                      ₹ 4,500
                    </p>
                    <p className="text-[10px] text-muted-foreground">Due: Sep 05, 2026</p>
                  </div>
                </div>

                {feePaid ? (
                  <div className="rounded-xl bg-emerald-100 dark:bg-emerald-950 p-3 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="font-bold">Transaction Confirmed • UPI Ref #CRK9948271</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.success("Receipt downloaded as PDF!")}
                      className="gap-1.5 text-[11px] h-7 bg-card"
                    >
                      <Download className="h-3 w-3" />
                      <span>Receipt PDF</span>
                    </Button>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      onClick={handlePayFee}
                      disabled={isPayingFee}
                      variant="pitch"
                      className="w-full sm:w-auto flex-1 gap-2 text-xs font-bold shadow-md"
                    >
                      {isPayingFee ? (
                        <>
                          <span className="h-3.5 w-3.5 border-2 border-chalk border-t-transparent rounded-full animate-spin" />
                          <span>Processing UPI Payment...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-3.5 w-3.5 text-stump-gold" />
                          <span>Pay ₹ 4,500 via 1-Click UPI / GPay / PhonePe</span>
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => toast.info("WhatsApp payment link sent to registered phone!")}
                      className="w-full sm:w-auto text-xs gap-1.5"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                      <span>WhatsApp Link</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Coach Feedback Card */}
            <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-leather-red" />
                  <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    COACH PROGRESS REMARKS
                  </h3>
                </div>
                <span className="text-[10px] text-muted-foreground">Updated Today</span>
              </div>

              <div className="rounded-xl bg-chalk-100/80 dark:bg-pitch-green-950/60 p-4 border border-border space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-leather-red text-chalk font-bold text-xs">
                    KD
                  </div>
                  <div>
                    <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk">
                      Coach Kapil Dev Sharma
                    </p>
                    <p className="text-[9px] text-muted-foreground">Head Coach • U-16 Elite</p>
                  </div>
                </div>

                <p className="text-xs text-ink/80 dark:text-chalk/80 leading-relaxed italic">
                  "{currentStudent.name} had a terrific net practice today! His balance on the off-drive
                  has improved significantly. He is currently selected in our starting XI for Saturday's
                  Monsoon Trophy fixture."
                </p>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-bold">
                  <span className="text-pitch-green dark:text-stump-gold">Overall Form Rating:</span>
                  <span className="font-heading text-base text-pitch-green dark:text-stump-gold">
                    9.2 / 10
                  </span>
                </div>
              </div>

              {/* Direct Call / WhatsApp Coach */}
              <div className="pt-1 flex items-center gap-2">
                <Button
                  onClick={() => toast.success("Calling Head Coach Kapil Dev (+91 98765 12345)...")}
                  variant="outline"
                  className="w-1/2 text-xs gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5 text-pitch-green" />
                  <span>Call Coach</span>
                </Button>
                <Button
                  onClick={() => toast.success("Opening WhatsApp Chat with Academy Staff...")}
                  variant="outline"
                  className="w-1/2 text-xs gap-1.5"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </Button>
              </div>
            </div>

            {/* Upcoming Tournament Matches & Travel */}
            <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-stump-gold-800 dark:text-stump-gold" />
                  <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    UPCOMING MATCH FIXTURE
                  </h3>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  SEMI-FINAL
                </Badge>
              </div>

              <div className="rounded-xl border border-border p-3.5 bg-chalk-50/70 dark:bg-pitch-green-950/50 space-y-2">
                <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk">
                  Monsoon Champions Trophy 2026 • Semi-Final 1
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-pitch-green dark:text-stump-gold">
                    Super Kings Colts
                  </span>
                  <span className="text-[10px] text-muted-foreground font-bold">VS</span>
                  <span className="font-semibold text-leather-red">Royal Challengers</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1 border-t border-border/70">
                  <Calendar className="h-3 w-3" />
                  <span>Saturday, 09:00 AM • Turf Ground Stadium</span>
                </div>
              </div>

              <Link href={`/portal?studentId=${currentStudent.id}`}>
                <Button variant="pitch" className="w-full text-xs font-bold gap-2">
                  <span>View Student Locker Room & Stats</span>
                  <ArrowRight className="h-3.5 w-3.5 text-stump-gold" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
