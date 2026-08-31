"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Button,
  Avatar
} from "@crick-academy/ui";
import {
  ArrowLeft,
  Phone,
  Shield,
  CreditCard,
  Trophy,
  MessageCircle,
  Check,
  Target
} from "lucide-react";
import { toast } from "sonner";
import type { StudentFullProfile } from "@/lib/data";

interface StudentProfileViewProps {
  student: StudentFullProfile;
}

export function StudentProfileView({ student }: StudentProfileViewProps) {
  const [remindedFeeIds, setRemindedFeeIds] = useState<Set<string>>(new Set());

  const handleSendReminder = (feeId: string, month: string, amount: number) => {
    setRemindedFeeIds((prev) => new Set(prev).add(feeId));

    toast.success(`WhatsApp Reminder Sent`, {
      description: `Dispatched payment link for ${month} (₹${amount}) to ${student.name}'s guardian at ${student.guardianPhone}.`,
      icon: <MessageCircle className="h-4 w-4 text-emerald-600" />,
      duration: 4500
    });
  };

  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const getStatusBadge = (status: "PAID" | "UNPAID" | "OVERDUE") => {
    switch (status) {
      case "PAID":
        return <Badge variant="paid">PAID</Badge>;
      case "OVERDUE":
        return <Badge variant="overdue">OVERDUE</Badge>;
      case "UNPAID":
        return <Badge variant="unpaid">UNPAID</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Back Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/dashboard/students">
          <Button variant="ghost" size="sm" className="gap-2 text-xs font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Students Directory
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(`${student.name} - ${student.phone}`);
              toast.info("Copied contact details to clipboard");
            }}
            className="gap-1.5 text-xs"
          >
            <Phone className="h-3.5 w-3.5" />
            Copy Contact
          </Button>
          <Button
            variant="pitch"
            size="sm"
            onClick={() => {
              toast.success("WhatsApp chat opened with Guardian", {
                description: `Initiated conversation with ${student.guardianPhone}`
              });
            }}
            className="gap-1.5 text-xs shadow-sm"
          >
            <MessageCircle className="h-3.5 w-3.5 text-stump-gold" />
            WhatsApp Guardian
          </Button>
        </div>
      </div>

      {/* Hero Player Profile Card */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-border/80 bg-gradient-to-r from-pitch-green-900 via-pitch-green-950 to-[#07291f] p-6 sm:p-8 text-chalk shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar
              fallback={student.name}
              size="lg"
              className="h-20 w-20 text-2xl font-bold ring-4 ring-stump-gold/40 shadow-lg bg-chalk text-pitch-green"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-chalk">
                  {student.name}
                </h1>
                <Badge variant="gold" className="text-xs px-2.5 py-0.5">
                  {student.batch}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-chalk/80">
                <span>Age: <strong>{student.age} Years</strong></span>
                <span>•</span>
                <span>DOB: {formatDate(student.dateOfBirth)}</span>
                <span>•</span>
                <span>Joined: {formatDate(student.joinedDate)}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-chalk/70">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-stump-gold" />
                  Student: {student.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-leather-red-300" />
                  Guardian: {student.guardianPhone}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Performance Scorecard Badge Pills */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto self-stretch md:self-auto rounded-xl border border-stump-gold/30 bg-black/40 p-3 sm:p-4 text-center backdrop-blur-md">
            <div>
              <p className="text-[10px] uppercase font-bold text-chalk/60">Career Runs</p>
              <p className="font-heading text-2xl sm:text-3xl font-extrabold text-stump-gold mt-0.5">
                {student.totalRuns}
              </p>
            </div>
            <div className="border-x border-chalk/20 px-3">
              <p className="text-[10px] uppercase font-bold text-chalk/60">Wickets</p>
              <p className="font-heading text-2xl sm:text-3xl font-extrabold text-leather-red-400 mt-0.5">
                {student.totalWickets}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-chalk/60">Matches</p>
              <p className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-0.5">
                {student.matchesPlayed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Content Grid: Left: Discipline + Fee History | Right: Match Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Info & Fee History (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Card 1: Discipline & Profile Overview */}
          <Card className="border-border/80 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pitch-green/10 text-pitch-green">
                  <Target className="h-4 w-4" />
                </div>
                <CardTitle className="text-xl">DISCIPLINE & SQUAD PROFILE</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border/60 bg-chalk-50/50 p-3 dark:bg-pitch-green-950/30">
                  <p className="text-xs text-muted-foreground font-semibold uppercase">
                    Batting Style
                  </p>
                  <p className="font-heading text-base font-bold text-pitch-green dark:text-chalk mt-1">
                    {student.battingStyle.replace("_", " ")}
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-chalk-50/50 p-3 dark:bg-pitch-green-950/30">
                  <p className="text-xs text-muted-foreground font-semibold uppercase">
                    Bowling Style
                  </p>
                  <p className="font-heading text-base font-bold text-pitch-green dark:text-chalk mt-1">
                    {student.bowlingStyle.replace(/_/g, " ")}
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-chalk-50/50 p-3 dark:bg-pitch-green-950/30">
                  <p className="text-xs text-muted-foreground font-semibold uppercase">
                    Batch Allocation
                  </p>
                  <p className="font-heading text-base font-bold text-pitch-green dark:text-chalk mt-1">
                    {student.batch}
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-chalk-50/50 p-3 dark:bg-pitch-green-950/30">
                  <p className="text-xs text-muted-foreground font-semibold uppercase">
                    Account Dues Status
                  </p>
                  <div className="mt-1">
                    {(student.pendingFeesCount ?? 0) > 0 ? (
                      <span className="font-bold text-leather-red text-xs">
                        ⚠️ {student.pendingFeesCount} Overdue / Pending Payment(s)
                      </span>
                    ) : (
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs">
                        ✓ All Monthly Fees Cleared
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: 3-Month Fee Payment History */}
          <Card className="border-border/80 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-xl">FEE PAYMENT HISTORY</CardTitle>
                </div>
                <Badge variant="pitch" className="text-xs">
                  ₹1,500 / Month
                </Badge>
              </div>
              <CardDescription>
                Full ledger of past 3 months subscriptions & payment receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-pitch-green-700">
                    <TableHead>Billing Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt / Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.fees.map((fee) => {
                    const isReminded = remindedFeeIds.has(fee.id);
                    const monthLabel = fee.dueDate.toString().includes("2026-06")
                      ? "June 2026"
                      : fee.dueDate.toString().includes("2026-07")
                      ? "July 2026"
                      : "August 2026";

                    return (
                      <TableRow key={fee.id}>
                        <TableCell className="font-semibold text-xs text-foreground">
                          {monthLabel}
                        </TableCell>
                        <TableCell className="font-heading font-bold text-sm text-pitch-green dark:text-stump-gold">
                          ₹{fee.amount.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(fee.dueDate)}
                        </TableCell>
                        <TableCell>{getStatusBadge(fee.status)}</TableCell>
                        <TableCell className="text-right">
                          {fee.status === "PAID" ? (
                            <div className="text-[11px] font-mono text-muted-foreground">
                              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                {fee.method}
                              </span>
                              {fee.paidOn && (
                                <p className="text-[10px]">
                                  Paid: {formatDate(fee.paidOn)}
                                </p>
                              )}
                            </div>
                          ) : (
                            <Button
                              variant={fee.status === "OVERDUE" ? "leather" : "outline"}
                              size="sm"
                              onClick={() => handleSendReminder(fee.id, monthLabel, fee.amount)}
                              disabled={isReminded}
                              className="h-7 text-xs px-2.5 gap-1"
                            >
                              {isReminded ? (
                                <>
                                  <Check className="h-3 w-3" />
                                  Sent
                                </>
                              ) : (
                                <>
                                  <MessageCircle className="h-3 w-3" />
                                  Send Reminder
                                </>
                              )}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Match Performance & Tournament Scorecards (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="border-border/80 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-xl">MATCH PERFORMANCE STATS</CardTitle>
                </div>
                <Badge variant="gold" className="text-xs">
                  Summer Cup 2026
                </Badge>
              </div>
              <CardDescription>
                Detailed match scorecards, runs scored, wickets & coach notes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {student.performances.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-sm">
                  No tournament match records logged yet for this player.
                </div>
              ) : (
                student.performances.map((perf) => (
                  <div
                    key={perf.id}
                    className="rounded-xl border border-border/80 bg-card p-4 space-y-3 shadow-sm hover:border-pitch-green/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-heading text-base font-bold text-pitch-green dark:text-chalk">
                          vs {perf.match.opponent}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(perf.match.date)} • {perf.match.tournament.name}
                        </p>
                      </div>
                      <Badge
                        variant={perf.match.result === "WON" ? "paid" : "leather"}
                        className="text-[10px] px-2 py-0.5 font-bold"
                      >
                        {perf.match.result}
                      </Badge>
                    </div>

                    {/* Match stats pills */}
                    <div className="grid grid-cols-3 gap-2 rounded-lg bg-chalk-100/80 p-2.5 text-center text-xs dark:bg-pitch-green-950/60">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">
                          Runs Scored
                        </span>
                        <p className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                          {perf.runs}
                        </p>
                      </div>
                      <div className="border-x border-border/60">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">
                          Wickets
                        </span>
                        <p className="font-heading text-lg font-bold text-leather-red">
                          {perf.wickets}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">
                          Catches
                        </span>
                        <p className="font-heading text-lg font-bold text-stump-gold-800 dark:text-stump-gold">
                          {perf.catches}
                        </p>
                      </div>
                    </div>

                    {/* Coach Notes */}
                    {perf.notes && (
                      <div className="rounded-lg bg-chalk-50/70 p-2.5 text-xs text-foreground dark:bg-pitch-green-950/30 border border-border/40">
                        <span className="font-bold text-pitch-green dark:text-stump-gold block text-[11px] uppercase mb-0.5">
                          Coach Assessment
                        </span>
                        <p className="italic text-muted-foreground text-[11px] leading-relaxed">
                          &ldquo;{perf.notes}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
