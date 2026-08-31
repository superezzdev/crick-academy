"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  User,
  CreditCard,
  Trophy,
  Calendar,
  Layers,
  Sparkles,
  Users,
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";
import { getStudentPortalData } from "@/lib/portal-data";
import { SEED_STUDENTS } from "@/lib/data";
import { PortalNav } from "@/components/portal/portal-nav";
import { PortalStudentHero } from "@/components/portal/portal-student-hero";
import { PortalFeeLedger } from "@/components/portal/portal-fee-ledger";
import { PortalPerformanceHistory } from "@/components/portal/portal-performance-history";
import { PortalNetSessions } from "@/components/portal/portal-net-sessions";
import { PortalTournamentContribution } from "@/components/portal/portal-tournament-contribution";

function StudentPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Selected Student ID from URL or default to Aarav Sharma
  const urlStudentId = searchParams?.get("studentId");
  const [studentId, setStudentId] = useState<string>(
    urlStudentId || "stud_aarav_sharma"
  );

  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    if (urlStudentId && urlStudentId !== studentId) {
      setStudentId(urlStudentId);
    } else if (!urlStudentId && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("crick_active_student_id");
        if (stored && SEED_STUDENTS.some((s) => s.id === stored)) {
          setStudentId(stored);
        }
      } catch {}
    }
  }, [urlStudentId]);

  const portalData = getStudentPortalData(studentId) || getStudentPortalData("stud_aarav_sharma");

  if (!portalData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-heading text-2xl font-bold text-pitch-green">Student Not Found</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Unable to locate the specified student record.
        </p>
        <Button
          variant="pitch"
          size="sm"
          onClick={() => {
            setStudentId("stud_aarav_sharma");
            router.push("/portal?studentId=stud_aarav_sharma");
          }}
          className="mt-4"
        >
          View Aarav Sharma (Default)
        </Button>
      </div>
    );
  }

  const { student, careerSummary, tournamentContribution, sessions } = portalData;

  const handleStudentSwitch = (newId: string) => {
    setStudentId(newId);
    try {
      localStorage.setItem("crick_active_student_id", newId);
    } catch {}
    router.push(`/portal?studentId=${newId}`);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Subheader Navigation with Tabs & Switcher */}
      <PortalNav
        student={student}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="container mx-auto px-4 sm:px-6 space-y-8">
        {/* Quick Student Switcher Bar for Demo */}
        <div className="rounded-2xl border border-pitch-green/20 bg-chalk-100/90 p-3 sm:p-4 dark:bg-pitch-green-950/60 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-pitch-green text-chalk text-xs">
              🏏
            </span>
            <span className="text-xs font-bold text-pitch-green dark:text-chalk uppercase tracking-wide">
              Quick Switch Student Demo (18 Seeded Players):
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SEED_STUDENTS.slice(0, 7).map((s) => {
              const isSelected = s.id === studentId;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStudentSwitch(s.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-pitch-green text-chalk shadow-xs scale-102 ring-2 ring-stump-gold/50 font-bold"
                      : "bg-card text-muted-foreground hover:bg-chalk-200 hover:text-foreground"
                  }`}
                >
                  {s.name.split(" ")[0]} ({s.batch.split(" ")[0]})
                </button>
              );
            })}
            <span className="text-[11px] text-muted-foreground whitespace-nowrap px-1">
              +11 more in top switcher
            </span>
          </div>
        </div>

        {/* Hero Student Profile Card */}
        <PortalStudentHero
          data={portalData}
          onNavigateToFees={() => setActiveTab("fees")}
          onNavigateToTeam={() => setActiveTab("tournament")}
        />

        {/* Dynamic Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Fee Ledger & Net Sessions (6 cols) */}
              <div className="lg:col-span-6 space-y-8">
                <PortalFeeLedger
                  fees={student.fees}
                  studentName={student.name}
                  studentBatch={student.batch}
                  guardianPhone={student.guardianPhone}
                />

                <PortalNetSessions
                  sessions={sessions}
                  studentName={student.name}
                />
              </div>

              {/* Right Column: Match History & Tournament Contribution (6 cols) */}
              <div className="lg:col-span-6 space-y-8">
                <PortalPerformanceHistory
                  student={student}
                  careerSummary={careerSummary}
                />

                <PortalTournamentContribution
                  contribution={tournamentContribution}
                  studentName={student.name}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Details Card */}
              <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pitch-green text-chalk">
                    <User className="h-4 w-4 text-stump-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    OFFICIAL STUDENT DETAILS
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Full Name
                    </span>
                    <p className="font-heading text-base font-bold text-foreground mt-0.5">
                      {student.name}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Academy Batch
                    </span>
                    <p className="font-heading text-base font-bold text-pitch-green dark:text-stump-gold mt-0.5">
                      {student.batch}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Date of Birth & Age
                    </span>
                    <p className="font-semibold text-foreground mt-0.5">
                      {new Date(student.dateOfBirth).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}{" "}
                      ({student.age} Years)
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Joined Academy
                    </span>
                    <p className="font-semibold text-foreground mt-0.5">
                      {new Date(student.joinedDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Student Contact Phone
                    </span>
                    <p className="font-mono font-semibold text-foreground mt-0.5">
                      {student.phone}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Guardian Emergency Contact
                    </span>
                    <p className="font-mono font-semibold text-foreground mt-0.5">
                      {student.guardianPhone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cricket Playing Profile */}
              <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stump-gold/25 text-stump-gold-800 dark:text-stump-gold">
                    <Award className="h-4 w-4" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    CRICKETING DISCIPLINES
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Batting Style
                    </span>
                    <p className="font-heading text-base font-bold text-pitch-green dark:text-chalk mt-0.5">
                      {student.battingStyle.replace("_", " ")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Bowling Style
                    </span>
                    <p className="font-heading text-base font-bold text-pitch-green dark:text-chalk mt-0.5">
                      {student.bowlingStyle.replace(/_/g, " ")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Assigned Team
                    </span>
                    <p className="font-heading text-base font-bold text-stump-gold-800 dark:text-stump-gold mt-0.5">
                      {tournamentContribution.teamName}
                    </p>
                  </div>

                  <div className="rounded-xl bg-chalk-50 p-3 dark:bg-pitch-green-950/40">
                    <span className="text-muted-foreground uppercase font-bold text-[10px]">
                      Team Role
                    </span>
                    <p className="font-heading text-base font-bold text-pitch-green dark:text-chalk mt-0.5">
                      {tournamentContribution.roleInTeam}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "fees" && (
          <div>
            <PortalFeeLedger
              fees={student.fees}
              studentName={student.name}
              studentBatch={student.batch}
              guardianPhone={student.guardianPhone}
            />
          </div>
        )}

        {activeTab === "performance" && (
          <div>
            <PortalPerformanceHistory
              student={student}
              careerSummary={careerSummary}
            />
          </div>
        )}

        {activeTab === "sessions" && (
          <div>
            <PortalNetSessions
              sessions={sessions}
              studentName={student.name}
            />
          </div>
        )}

        {activeTab === "tournament" && (
          <div>
            <PortalTournamentContribution
              contribution={tournamentContribution}
              studentName={student.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudentPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-3 w-3 rounded-full bg-pitch-green" />
            <p className="font-heading text-lg font-bold text-pitch-green">
              Loading Player Locker Room...
            </p>
          </div>
        </div>
      }
    >
      <StudentPortalContent />
    </Suspense>
  );
}
