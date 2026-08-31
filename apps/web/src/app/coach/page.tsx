"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  Save,
  Send,
  Zap,
  Flame,
  Gauge,
  Trophy,
  ArrowLeft,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";
import { Navbar } from "@/components/navbar";
import { SEED_STUDENTS, SEED_SESSIONS } from "@/lib/data";
import { toast } from "sonner";

interface AttendanceRecord {
  studentId: string;
  name: string;
  batch: string;
  status: "PRESENT" | "LATE" | "ABSENT";
  checkInTime: string;
  notes?: string;
}

export default function CoachPortalPage() {
  // Session Attendance State
  const [selectedSessionId, setSelectedSessionId] = useState<string>(SEED_SESSIONS[0]?.id || "sess_1");
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(
    SEED_STUDENTS.slice(0, 10).map((student, idx) => ({
      studentId: student.id,
      name: student.name,
      batch: student.batch,
      status: idx === 3 ? "LATE" : idx === 8 ? "ABSENT" : "PRESENT",
      checkInTime: idx === 3 ? "06:44 AM" : idx === 8 ? "--" : "06:28 AM",
      notes: idx === 3 ? "Traffic delay" : ""
    }))
  );

  // Player Evaluation State
  const [evalStudentId, setEvalStudentId] = useState<string>(SEED_STUDENTS[0]?.id || "");
  const [bowlingSpeed, setBowlingSpeed] = useState<number>(128);
  const [driveRating, setDriveRating] = useState<number>(9);
  const [pullRating, setPullRating] = useState<number>(8);
  const [defenseRating, setDefenseRating] = useState<number>(9);
  const [coachNotes, setCoachNotes] = useState<string>(
    "Excellent high elbow on off-drives today. Needs to transfer weight forward earlier against rising short deliveries on pitch 2."
  );

  // Match Squad XI Picker
  const [selectedSquad, setSelectedSquad] = useState<string[]>([
    "stud_aarav_sharma",
    "stud_vihaan_kulkarni",
    "stud_dev_patel",
    "stud_rohan_verma",
    "stud_aryan_joshi",
    "stud_kabir_singh"
  ]);

  const selectedStudent = SEED_STUDENTS.find((s) => s.id === evalStudentId) || SEED_STUDENTS[0];

  const handleToggleAttendance = (studentId: string, newStatus: "PRESENT" | "LATE" | "ABSENT") => {
    setAttendanceList((prev) =>
      prev.map((rec) =>
        rec.studentId === studentId
          ? {
              ...rec,
              status: newStatus,
              checkInTime:
                newStatus === "ABSENT"
                  ? "--"
                  : newStatus === "LATE"
                  ? "06:45 AM"
                  : "06:30 AM"
            }
          : rec
      )
    );
    toast.success(`Updated attendance for ${attendanceList.find(s => s.studentId === studentId)?.name}`, {
      duration: 1500
    });
  };

  const handleSaveEvaluation = () => {
    toast.success(`Evaluation recorded for ${selectedStudent.name}! Synced with Student & Parent portal.`, {
      duration: 3000
    });
  };

  const handleToggleSquadPlayer = (id: string) => {
    if (selectedSquad.includes(id)) {
      setSelectedSquad(selectedSquad.filter((s) => s !== id));
      toast.info(`Removed from match squad`);
    } else {
      if (selectedSquad.length >= 11) {
        toast.error("Squad already has 11 players selected!");
        return;
      }
      setSelectedSquad([...selectedSquad, id]);
      toast.success(`Selected for Starting XI!`);
    }
  };

  const presentCount = attendanceList.filter((a) => a.status === "PRESENT").length;
  const lateCount = attendanceList.filter((a) => a.status === "LATE").length;
  const absentCount = attendanceList.filter((a) => a.status === "ABSENT").length;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-8 container mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Breadcrumb & Return Link */}
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
              Pitch-side Offline Sync Active
            </span>
          </div>
        </div>

        {/* Coach Header Banner */}
        <div className="rounded-3xl border-2 border-leather-red/30 bg-gradient-to-r from-leather-red/15 via-chalk-100 to-pitch-green/10 dark:from-leather-red/20 dark:via-pitch-green-950 dark:to-pitch-green-900 p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-leather-red text-chalk shadow-md font-heading text-2xl font-bold">
                KD
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-leather-red/20 px-2.5 py-0.5 text-[10px] font-bold text-leather-red uppercase tracking-wider">
                    Head Coach Console
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    BCCI Level-2 Certified
                  </Badge>
                </div>
                <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-pitch-green dark:text-chalk">
                  COACH KAPIL DEV SHARMA
                </h1>
                <p className="text-xs text-muted-foreground">
                  Fast Bowling Specialist • U-16 & Senior Elite Batches Lead
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-card/80 backdrop-blur-md p-3 rounded-2xl border border-border">
              <div className="text-center px-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Today's Nets</p>
                <p className="font-heading text-xl font-bold text-leather-red">3 Sessions</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center px-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Attendance</p>
                <p className="font-heading text-xl font-bold text-pitch-green dark:text-stump-gold">
                  92%
                </p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center px-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Starting XI</p>
                <p className="font-heading text-xl font-bold text-ink dark:text-chalk">
                  {selectedSquad.length} / 11
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left (Attendance Register) & Right (Drill Evaluator & XI Selector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Pitch Attendance Sheet (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-leather-red" />
                    <h2 className="font-heading text-xl font-bold text-pitch-green dark:text-chalk">
                      PITCH-SIDE ATTENDANCE LOG
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Morning Elite Net Session • Turf Pitch 1 & 2 (06:30 AM - 08:30 AM)
                  </p>
                </div>

                {/* Live Count Pills */}
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 px-2 py-1">
                    {presentCount} Present
                  </span>
                  <span className="rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 px-2 py-1">
                    {lateCount} Late
                  </span>
                  <span className="rounded-lg bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400 px-2 py-1">
                    {absentCount} Absent
                  </span>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="space-y-2">
                {attendanceList.map((rec) => {
                  return (
                    <div
                      key={rec.studentId}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/70 bg-chalk-50/60 dark:bg-pitch-green-950/40 p-3 hover:border-pitch-green/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pitch-green/10 text-pitch-green font-bold text-xs">
                          {rec.name[0]}
                        </div>
                        <div>
                          <p className="font-heading text-sm font-bold text-pitch-green dark:text-chalk">
                            {rec.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>{rec.batch}</span>
                            <span>•</span>
                            <span>Time: {rec.checkInTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* 1-Tap Toggle Buttons */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center">
                        <button
                          onClick={() => handleToggleAttendance(rec.studentId, "PRESENT")}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                            rec.status === "PRESENT"
                              ? "bg-emerald-600 text-chalk shadow-xs scale-105"
                              : "bg-chalk-200/80 text-muted-foreground hover:bg-emerald-100 dark:bg-pitch-green-900/60"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleToggleAttendance(rec.studentId, "LATE")}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                            rec.status === "LATE"
                              ? "bg-amber-500 text-ink font-bold shadow-xs scale-105"
                              : "bg-chalk-200/80 text-muted-foreground hover:bg-amber-100 dark:bg-pitch-green-900/60"
                          }`}
                        >
                          Late
                        </button>
                        <button
                          onClick={() => handleToggleAttendance(rec.studentId, "ABSENT")}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                            rec.status === "ABSENT"
                              ? "bg-leather-red text-chalk shadow-xs scale-105"
                              : "bg-chalk-200/80 text-muted-foreground hover:bg-red-100 dark:bg-pitch-green-900/60"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit All Button */}
              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => toast.success("All attendance records saved and synced!")}
                  variant="pitch"
                  className="gap-2 text-xs font-bold"
                >
                  <Save className="h-4 w-4 text-stump-gold" />
                  <span>Sync Attendance to Parent Feed</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Player Technique Evaluator & Squad Picker (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Player Technique & Drill Evaluator */}
            <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-stump-gold-800 dark:text-stump-gold" />
                  <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    PLAYER DRILL EVALUATION
                  </h3>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  LIVE COACH REMARKS
                </Badge>
              </div>

              {/* Student Picker Dropdown */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Select Athlete for Evaluation
                </label>
                <select
                  value={evalStudentId}
                  onChange={(e) => setEvalStudentId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-chalk-50/70 p-2.5 text-xs font-bold text-pitch-green focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/60 dark:text-chalk"
                >
                  {SEED_STUDENTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.batch} • {s.battingStyle === "RIGHT_HAND" ? "RHB" : "LHB"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Bowling Speed Gauge */}
              <div className="rounded-xl bg-chalk-100/80 dark:bg-pitch-green-950/60 p-4 border border-border space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold flex items-center gap-1 text-pitch-green dark:text-stump-gold">
                    <Flame className="h-4 w-4 text-leather-red" />
                    Bowling Speed / Delivery Velocity:
                  </span>
                  <span className="font-heading font-bold text-base text-leather-red">
                    {bowlingSpeed} km/h
                  </span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="145"
                  value={bowlingSpeed}
                  onChange={(e) => setBowlingSpeed(Number(e.target.value))}
                  className="w-full accent-leather-red cursor-pointer"
                />
              </div>

              {/* Batting Technique Sliders */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">Cover Drive Execution:</span>
                  <span className="font-bold text-pitch-green dark:text-stump-gold">{driveRating} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={driveRating}
                  onChange={(e) => setDriveRating(Number(e.target.value))}
                  className="w-full accent-pitch-green cursor-pointer"
                />

                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">Pull / Hook Timing:</span>
                  <span className="font-bold text-pitch-green dark:text-stump-gold">{pullRating} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={pullRating}
                  onChange={(e) => setPullRating(Number(e.target.value))}
                  className="w-full accent-pitch-green cursor-pointer"
                />
              </div>

              {/* Remarks Textarea */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Direct Coach Remarks (Visible in Student & Parent Portal)
                </label>
                <textarea
                  rows={3}
                  value={coachNotes}
                  onChange={(e) => setCoachNotes(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-chalk-50/70 p-2.5 text-xs text-foreground focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/60"
                />
              </div>

              <Button onClick={handleSaveEvaluation} variant="pitch" className="w-full gap-2 text-xs font-bold">
                <Send className="h-3.5 w-3.5 text-stump-gold" />
                <span>Save & Publish Coach Feedback</span>
              </Button>
            </div>

            {/* Starting XI Selection Board */}
            <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-leather-red" />
                  <h3 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    MATCH STARTING XI PICKER
                  </h3>
                </div>
                <span className="rounded bg-leather-red/20 px-2 py-0.5 text-[10px] font-bold text-leather-red">
                  {selectedSquad.length} / 11 Selected
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                Next Match: <strong>Academy Super Kings vs Royal Challengers Colts</strong> (Saturday 9:00 AM)
              </p>

              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {SEED_STUDENTS.map((stud) => {
                  const isSelected = selectedSquad.includes(stud.id);
                  return (
                    <button
                      key={stud.id}
                      onClick={() => handleToggleSquadPlayer(stud.id)}
                      className={`flex w-full items-center justify-between rounded-xl p-2 text-left text-xs transition-all ${
                        isSelected
                          ? "bg-pitch-green text-chalk font-bold shadow-xs"
                          : "bg-chalk-100 text-foreground hover:bg-chalk-200 dark:bg-pitch-green-950/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]">🏏</span>
                        <span>{stud.name}</span>
                      </div>
                      <span className="text-[10px] uppercase">
                        {isSelected ? "✓ Starting XI" : "+ Select"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
