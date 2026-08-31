"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge
} from "@crick-academy/ui";
import { PortalSessionModal } from "./portal-session-modal";
import type { StudentPortalSession } from "@/lib/portal-data";

interface PortalNetSessionsProps {
  sessions: StudentPortalSession[];
  studentName: string;
}

export function PortalNetSessions({
  sessions: initialSessions,
  studentName
}: PortalNetSessionsProps) {
  const [sessions, setSessions] = useState<StudentPortalSession[]>(initialSessions);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<StudentPortalSession | null>(null);

  React.useEffect(() => {
    setSessions(initialSessions);
  }, [initialSessions]);

  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const handleOpenRegister = (session: StudentPortalSession) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

  const handleRegisterSuccess = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              isRegistered: true,
              isPaid: true,
              registeredCount: s.registeredCount + 1
            }
          : s
      )
    );
  };

  const enrolledSessions = sessions.filter((s) => s.isRegistered);

  return (
    <div className="space-y-6" id="sessions-section">
      {/* Overview Banner */}
      <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
              <Calendar className="h-4 w-4" />
            </div>
            <h3 className="font-heading text-xl font-bold text-pitch-green dark:text-chalk">
              NET PRACTICE & SPECIALIST DRILLS
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-xl">
            Register for upcoming turf and astro net sessions under certified academy coaches.
            Session passes include automated bowling machine tokens and high-speed video analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Badge variant="paid" className="text-xs px-3 py-1 font-bold">
            ✓ {enrolledSessions.length} ENROLLED SESSIONS
          </Badge>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((session) => {
          const isFull = session.registeredCount >= session.capacity && !session.isRegistered;
          const slotsLeft = Math.max(0, session.capacity - session.registeredCount);

          return (
            <Card
              key={session.id}
              className={`border-2 transition-all shadow-sm ${
                session.isRegistered
                  ? "border-emerald-500/50 bg-emerald-50/20 dark:bg-emerald-950/10"
                  : "border-border/80 hover:border-pitch-green/40"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Badge variant="gold" className="text-[10px] font-bold">
                      {session.pitchType}
                    </Badge>
                    <CardTitle className="text-lg leading-snug">
                      {session.focusArea}
                    </CardTitle>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-heading text-xl font-bold text-pitch-green dark:text-stump-gold">
                      ₹{session.feeAmount}
                    </span>
                    <p className="text-[10px] text-muted-foreground">Per Slot</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground rounded-xl bg-chalk-50/80 p-3 dark:bg-pitch-green-950/40 border border-border/50">
                  <div className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Calendar className="h-3.5 w-3.5 text-pitch-green" />
                    <span>{formatDate(session.date)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Clock className="h-3.5 w-3.5 text-stump-gold-700" />
                    <span>{session.time}</span>
                  </div>

                  <div className="col-span-2 text-pitch-green dark:text-stump-gold font-semibold pt-1 border-t border-border/40">
                    Lead: {session.coachName}
                  </div>
                </div>

                {/* Capacity Meter & Action Button */}
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-semibold">
                        {session.registeredCount}/{session.capacity} Spots Booked
                      </span>
                    </div>
                    {isFull ? (
                      <span className="text-[11px] font-bold text-leather-red block">
                        Slot Full (Waitlist Open)
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block">
                        {slotsLeft} slots remaining
                      </span>
                    )}
                  </div>

                  <div>
                    {session.isRegistered ? (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="gap-1.5 border-emerald-600 bg-emerald-50 text-emerald-700 text-xs font-bold dark:bg-emerald-950/40 dark:text-emerald-400"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Enrolled & Confirmed
                      </Button>
                    ) : (
                      <Button
                        variant="pitch"
                        size="sm"
                        disabled={isFull}
                        onClick={() => handleOpenRegister(session)}
                        className="gap-1.5 text-xs font-bold shadow-md"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-stump-gold" />
                        {isFull ? "Join Waitlist" : "Register & Pay"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Session Booking Modal */}
      <PortalSessionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        session={selectedSession}
        studentName={studentName}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
}
