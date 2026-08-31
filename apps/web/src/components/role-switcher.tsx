"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Crown,
  GraduationCap,
  ChevronDown,
  Check,
  Search,
  Sparkles,
  Activity,
  HeartHandshake,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";
import { getAllStudentsGrouped } from "@/lib/portal-data";
import { SEED_STUDENTS } from "@/lib/data";

interface RoleSwitcherProps {
  variant?: "header" | "compact" | "banner";
  className?: string;
}

function RoleSwitcherFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div className="flex items-center gap-2 rounded-xl border border-pitch-green/25 bg-chalk-100/95 px-3 py-1.5 text-xs font-semibold shadow-sm dark:border-pitch-green-800 dark:bg-pitch-green-950/80">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-pitch-green text-chalk">
          <Crown className="h-3 w-3 text-stump-gold" />
        </span>
        <span className="font-heading text-xs font-bold text-pitch-green dark:text-chalk">
          Academy Owner
        </span>
      </div>
    </div>
  );
}

function RoleSwitcherContent({ variant = "header", className = "" }: RoleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine current active role from pathname
  const isOwner = pathname?.startsWith("/dashboard");
  const isCoach = pathname?.startsWith("/coach");
  const isParent = pathname?.startsWith("/parent");
  const isStudent = pathname?.startsWith("/portal");

  // Selected student ID
  const urlStudentId = searchParams?.get("studentId");
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    urlStudentId || "stud_aarav_sharma"
  );

  useEffect(() => {
    if (urlStudentId && urlStudentId !== selectedStudentId) {
      setSelectedStudentId(urlStudentId);
      try {
        localStorage.setItem("crick_active_student_id", urlStudentId);
      } catch {}
    } else if (!urlStudentId && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("crick_active_student_id");
        if (stored && SEED_STUDENTS.some((s) => s.id === stored)) {
          setSelectedStudentId(stored);
        }
      } catch {}
    }
  }, [urlStudentId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentStudent =
    SEED_STUDENTS.find((s) => s.id === selectedStudentId) || SEED_STUDENTS[0];

  const groupedStudents = getAllStudentsGrouped();

  const handleSelectRole = (dest: string) => {
    setIsOpen(false);
    router.push(dest);
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    try {
      localStorage.setItem("crick_active_student_id", studentId);
    } catch {}
    setIsOpen(false);
    router.push(`/portal?studentId=${studentId}`);
  };

  const filterStudents = (students: typeof SEED_STUDENTS) => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.batch.toLowerCase().includes(q) ||
        s.battingStyle.toLowerCase().includes(q) ||
        s.bowlingStyle.toLowerCase().includes(q)
    );
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Role Pill Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 rounded-xl border border-pitch-green/25 bg-chalk-100/95 px-3 py-1.5 text-xs font-semibold shadow-sm transition-all hover:border-pitch-green hover:bg-chalk-200/90 dark:border-pitch-green-800 dark:bg-pitch-green-950/80 dark:hover:bg-pitch-green-900 focus:outline-none focus:ring-2 focus:ring-stump-gold"
        aria-label="Switch User Role"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hidden lg:inline-block">
          Portal:
        </span>

        {isOwner && (
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-pitch-green text-chalk shadow-xs">
              <Crown className="h-3 w-3 text-stump-gold" />
            </span>
            <span className="font-heading text-xs font-bold text-pitch-green dark:text-chalk">
              Admin Owner
            </span>
          </div>
        )}

        {isCoach && (
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-leather-red text-chalk shadow-xs">
              <Activity className="h-3 w-3 text-chalk" />
            </span>
            <span className="font-heading text-xs font-bold text-pitch-green dark:text-chalk">
              Coach Kapil
            </span>
          </div>
        )}

        {isParent && (
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-pitch-green-800 text-chalk shadow-xs">
              <HeartHandshake className="h-3 w-3 text-stump-gold" />
            </span>
            <span className="font-heading text-xs font-bold text-pitch-green dark:text-chalk">
              Parent View
            </span>
          </div>
        )}

        {isStudent && (
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-stump-gold/40 text-pitch-green font-bold text-[10px] shadow-xs">
              🏏
            </span>
            <span className="font-heading text-xs font-bold text-pitch-green dark:text-chalk max-w-[120px] sm:max-w-none truncate">
              {currentStudent?.name || "Student"}
            </span>
          </div>
        )}

        {!isOwner && !isCoach && !isParent && !isStudent && (
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-pitch-green text-chalk shadow-xs">
              <Crown className="h-3 w-3 text-stump-gold" />
            </span>
            <span className="font-heading text-xs font-bold text-pitch-green dark:text-chalk">
              Select Role
            </span>
          </div>
        )}

        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180 text-pitch-green" : "group-hover:text-foreground"
          }`}
        />
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border-2 border-border/80 bg-card p-3 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 backdrop-blur-xl">
          {/* Header Role Selector Grid (4 Roles) */}
          <div className="space-y-2 pb-3 border-b border-border/80">
            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                Role Portal Switcher
              </p>
              <span className="flex items-center gap-1 text-[10px] text-stump-gold-800 dark:text-stump-gold font-bold">
                <Sparkles className="h-3 w-3" /> 4 Dedicated Portals
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* 1. Admin / Owner */}
              <button
                onClick={() => handleSelectRole("/dashboard")}
                className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-all ${
                  isOwner
                    ? "border-pitch-green bg-pitch-green/10 ring-2 ring-pitch-green/30"
                    : "border-border/70 hover:border-pitch-green/40 hover:bg-chalk-100 dark:hover:bg-pitch-green-950/40"
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pitch-green text-chalk shadow-xs">
                  <Crown className="h-3.5 w-3.5 text-stump-gold" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk truncate">
                      Owner Admin
                    </p>
                    {isOwner && <Check className="h-3 w-3 text-pitch-green shrink-0" />}
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">KPIs & Finance</p>
                </div>
              </button>

              {/* 2. Coach Portal */}
              <button
                onClick={() => handleSelectRole("/coach")}
                className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-all ${
                  isCoach
                    ? "border-leather-red bg-leather-red/10 ring-2 ring-leather-red/30"
                    : "border-border/70 hover:border-leather-red/40 hover:bg-chalk-100 dark:hover:bg-pitch-green-950/40"
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-leather-red text-chalk shadow-xs">
                  <Activity className="h-3.5 w-3.5 text-chalk" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk truncate">
                      Coach Desk
                    </p>
                    {isCoach && <Check className="h-3 w-3 text-leather-red shrink-0" />}
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">Nets & Drills</p>
                </div>
              </button>

              {/* 3. Student Portal */}
              <button
                onClick={() => handleSelectStudent(selectedStudentId)}
                className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-all ${
                  isStudent
                    ? "border-stump-gold bg-stump-gold/15 ring-2 ring-stump-gold/40"
                    : "border-border/70 hover:border-stump-gold/50 hover:bg-chalk-100 dark:hover:bg-pitch-green-950/40"
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stump-gold text-pitch-green font-bold text-xs shadow-xs">
                  🏏
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk truncate">
                      Student Locker
                    </p>
                    {isStudent && <Check className="h-3 w-3 text-stump-gold-800 shrink-0" />}
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">Stats & Wagon</p>
                </div>
              </button>

              {/* 4. Parent Portal */}
              <button
                onClick={() => handleSelectRole("/parent")}
                className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-all ${
                  isParent
                    ? "border-pitch-green bg-pitch-green/10 ring-2 ring-pitch-green/30"
                    : "border-border/70 hover:border-pitch-green/40 hover:bg-chalk-100 dark:hover:bg-pitch-green-950/40"
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pitch-green-800 text-chalk shadow-xs">
                  <HeartHandshake className="h-3.5 w-3.5 text-stump-gold" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-heading text-xs font-bold text-pitch-green dark:text-chalk truncate">
                      Parent Portal
                    </p>
                    {isParent && <Check className="h-3 w-3 text-pitch-green shrink-0" />}
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">Safety & UPI Pay</p>
                </div>
              </button>
            </div>
          </div>

          {/* Student Selector Section */}
          <div className="pt-3 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-pitch-green dark:text-chalk uppercase tracking-wide">
                Switch Athlete Profile ({SEED_STUDENTS.length})
              </span>
              <span className="text-[10px] text-muted-foreground">3 Batches</span>
            </div>

            {/* Quick Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search athlete name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-chalk-50/70 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/50"
              />
            </div>

            {/* Scrollable Student List */}
            <div className="max-h-52 overflow-y-auto space-y-3 pr-1 pt-1">
              {groupedStudents.map((group) => {
                const students = filterStudents(group.students);
                if (students.length === 0) return null;

                return (
                  <div key={group.batchName} className="space-y-1">
                    <div className="sticky top-0 bg-card/90 backdrop-blur-xs py-0.5 px-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {group.batchName}
                      </p>
                    </div>

                    <div className="space-y-1">
                      {students.map((student) => {
                        const isSelected =
                          isStudent && student.id === selectedStudentId;

                        return (
                          <button
                            key={student.id}
                            onClick={() => handleSelectStudent(student.id)}
                            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                              isSelected
                                ? "bg-pitch-green text-chalk font-bold shadow-xs"
                                : "hover:bg-chalk-100 text-foreground dark:hover:bg-pitch-green-950/60"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                                  isSelected
                                    ? "bg-stump-gold text-pitch-green"
                                    : "bg-pitch-green/10 text-pitch-green dark:bg-pitch-green-800/40 dark:text-chalk"
                                }`}
                              >
                                {student.name[0]}
                              </span>
                              <div className="min-w-0">
                                <p className="truncate font-semibold">{student.name}</p>
                                <p
                                  className={`text-[9px] truncate ${
                                    isSelected
                                      ? "text-chalk/80"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {student.battingStyle === "RIGHT_HAND" ? "RHB" : "LHB"} •{" "}
                                  {student.bowlingStyle.replace(/_/g, " ")}
                                </p>
                              </div>
                            </div>

                            {isSelected && (
                              <Check className="h-4 w-4 shrink-0 text-stump-gold" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Footer Action */}
          <div className="mt-3 border-t border-border/80 pt-2 flex items-center justify-between text-[10px] text-muted-foreground px-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:underline">
              ← Landing Home
            </Link>
            <Link
              href="#portals"
              onClick={() => setIsOpen(false)}
              className="font-bold text-pitch-green hover:underline flex items-center gap-0.5 dark:text-stump-gold"
            >
              All Role Portals <ArrowRight className="h-2.5 w-2.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function RoleSwitcher(props: RoleSwitcherProps) {
  return (
    <Suspense fallback={<RoleSwitcherFallback className={props.className} />}>
      <RoleSwitcherContent {...props} />
    </Suspense>
  );
}
