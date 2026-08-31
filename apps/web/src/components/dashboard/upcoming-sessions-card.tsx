"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Avatar
} from "@crick-academy/ui";
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import type { UpcomingSessionDetail } from "@/lib/data";

interface UpcomingSessionsCardProps {
  sessions: UpcomingSessionDetail[];
}

export function UpcomingSessionsCard({ sessions }: UpcomingSessionsCardProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    sessions[0]?.id || ""
  );

  const currentSession =
    sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  if (!currentSession) {
    return (
      <Card className="h-full border-border/80 shadow-md">
        <CardHeader>
          <CardTitle>UPCOMING NET SESSIONS</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          No upcoming net sessions scheduled.
        </CardContent>
      </Card>
    );
  }

  const occupancyPercent = Math.round(
    (currentSession.registeredCount / currentSession.capacity) * 100
  );

  return (
    <Card className="h-full border-border/80 shadow-md flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
                <CalendarDays className="h-4 w-4" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">
                UPCOMING NET SESSIONS
              </CardTitle>
            </div>
            <CardDescription className="mt-1">
              Turf pitch practice slots, occupancy limits & registered squad
            </CardDescription>
          </div>

          <Badge variant="pitch" className="self-start sm:self-auto text-[11px] px-2.5 py-1">
            {sessions.length} SESSIONS ACTIVE
          </Badge>
        </div>

        {/* Session Selector Pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
          {sessions.map((sess, idx) => {
            const isSelected = sess.id === selectedSessionId;
            return (
              <button
                key={sess.id}
                onClick={() => setSelectedSessionId(sess.id)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "border-pitch-green bg-pitch-green text-chalk shadow-sm"
                    : "border-border/80 bg-card text-muted-foreground hover:bg-chalk-100 hover:text-foreground"
                }`}
              >
                <span>Slot {idx + 1}: {formatDate(sess.date)}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isSelected
                      ? "bg-stump-gold text-ink font-bold"
                      : "bg-chalk-200 text-ink/70"
                  }`}
                >
                  {sess.registeredCount}/{sess.capacity}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Selected Session Hero Card */}
        <div className="rounded-xl border border-pitch-green/30 bg-gradient-to-r from-pitch-green/10 via-pitch-green/5 to-transparent p-4 dark:from-pitch-green-950/60 dark:to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-heading text-lg font-bold text-pitch-green dark:text-stump-gold">
                {formatDate(currentSession.date)}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-medium text-foreground">
                  <Clock className="h-3.5 w-3.5 text-stump-gold-700" />
                  {currentSession.time}
                </span>
                <span>•</span>
                <span className="font-medium text-pitch-green dark:text-chalk">
                  Fee: ₹{currentSession.feeAmount} / player
                </span>
              </div>
            </div>

            {/* Capacity Badge & Gauge */}
            <div className="sm:text-right space-y-1">
              <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-foreground">
                <Users className="h-3.5 w-3.5 text-pitch-green" />
                <span>
                  {currentSession.registeredCount} / {currentSession.capacity} Registered
                </span>
                <span className="text-[11px] text-muted-foreground font-normal">
                  ({currentSession.capacity - currentSession.registeredCount} slots open)
                </span>
              </div>
              <div className="h-2 w-full sm:w-36 rounded-full bg-chalk-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pitch-green to-stump-gold rounded-full transition-all duration-500"
                  style={{ width: `${occupancyPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* List of Registered Students */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
            <span>REGISTERED SQUAD PLAYERS ({currentSession.registeredStudents.length})</span>
            <span>SLOT FEE STATUS</span>
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
            {currentSession.registeredStudents.map(({ student, paid }) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-card hover:bg-chalk-50/70 dark:hover:bg-pitch-green-950/30 transition-colors"
              >
                <Link
                  href={`/dashboard/students/${student.id}`}
                  className="flex items-center gap-3 group"
                >
                  <Avatar
                    fallback={student.name}
                    size="sm"
                    className="ring-1 ring-border group-hover:ring-pitch-green transition-all"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-pitch-green group-hover:underline">
                        {student.name}
                      </p>
                      <span className="text-[10px] text-muted-foreground">
                        ({student.batch})
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {student.battingStyle.replace("_", " ")} •{" "}
                      {student.bowlingStyle.replace(/_/g, " ")}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  {paid ? (
                    <Badge variant="paid" className="text-[10px] px-2 py-0">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      PAID
                    </Badge>
                  ) : (
                    <Badge variant="unpaid" className="text-[10px] px-2 py-0">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      UNPAID
                    </Badge>
                  )}
                  <Link
                    href={`/dashboard/students/${student.id}`}
                    className="text-muted-foreground hover:text-pitch-green p-1"
                    aria-label={`View ${student.name}'s profile`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info & view all students */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span>Max Capacity: {currentSession.capacity} Net Bowlers & Batsmen</span>
          <Link
            href="/dashboard/students"
            className="flex items-center gap-1 font-semibold text-pitch-green hover:underline dark:text-stump-gold"
          >
            Manage Roster
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
