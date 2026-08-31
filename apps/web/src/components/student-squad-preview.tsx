"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  Badge,
  Button
} from "@crick-academy/ui";
import { UserPlus, Filter, Phone, Shield } from "lucide-react";
import type { StudentWithStats } from "@crick-academy/types";

const mockStudents: StudentWithStats[] = [
  {
    id: "stud-1",
    name: "Aarav Sharma",
    photoUrl: null,
    dateOfBirth: "2008-04-14",
    phone: "+91 98765 43210",
    guardianPhone: "+91 98765 43211",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_FAST",
    joinedDate: "2024-01-15",
    batch: "Morning Elite U-19",
    totalRuns: 640,
    totalWickets: 18,
    matchesPlayed: 12
  },
  {
    id: "stud-2",
    name: "Rohan Varma",
    photoUrl: null,
    dateOfBirth: "2009-08-22",
    phone: "+91 98765 11223",
    guardianPhone: "+91 98765 11224",
    battingStyle: "LEFT_HAND",
    bowlingStyle: "RIGHT_ARM_SPIN_OFF",
    joinedDate: "2024-03-01",
    batch: "Morning Elite U-19",
    totalRuns: 480,
    totalWickets: 24,
    matchesPlayed: 14
  },
  {
    id: "stud-3",
    name: "Kabir Singh",
    photoUrl: null,
    dateOfBirth: "2012-11-05",
    phone: "+91 98765 99887",
    guardianPhone: "+91 98765 99888",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "NONE",
    joinedDate: "2025-06-10",
    batch: "Evening Juniors U-14",
    totalRuns: 310,
    totalWickets: 0,
    matchesPlayed: 8
  },
  {
    id: "stud-4",
    name: "Devendra Rao",
    photoUrl: null,
    dateOfBirth: "2007-02-18",
    phone: "+91 98765 66778",
    guardianPhone: "+91 98765 66779",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "LEFT_ARM_SPIN_ORTHODOX",
    joinedDate: "2023-09-12",
    batch: "Morning Elite U-19",
    totalRuns: 195,
    totalWickets: 32,
    matchesPlayed: 15
  }
];

export function StudentSquadPreview() {
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");

  const filteredStudents =
    selectedBatch === "ALL"
      ? mockStudents
      : mockStudents.filter((s) => s.batch.includes(selectedBatch));

  return (
    <Card className="h-full border-border/80 shadow-sm" id="students">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <CardTitle>ACADEMY SQUAD & PLAYER ROSTER</CardTitle>
          <CardDescription>
            Player profiles, batting/bowling disciplines, and match statistics
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-chalk-50 p-1 text-xs font-semibold">
            <button
              onClick={() => setSelectedBatch("ALL")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedBatch === "ALL"
                  ? "bg-pitch-green text-chalk"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Batches
            </button>
            <button
              onClick={() => setSelectedBatch("Elite")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedBatch === "Elite"
                  ? "bg-pitch-green text-chalk"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              U-19 Elite
            </button>
            <button
              onClick={() => setSelectedBatch("Juniors")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedBatch === "Juniors"
                  ? "bg-pitch-green text-chalk"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              U-14 Juniors
            </button>
          </div>
          <Button variant="pitch" size="sm" className="gap-1.5 text-xs">
            <UserPlus className="h-3.5 w-3.5 text-stump-gold" />
            Enrol
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredStudents.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 max-w-sm mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chalk-200/80 text-pitch-green dark:bg-pitch-green-950 dark:text-stump-gold">
              <Filter className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="font-heading text-lg font-bold text-foreground">
                No Players in This Batch
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No athletes are registered in the selected training slot.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedBatch("ALL")}
              className="text-xs font-semibold mt-1"
            >
              Show All Squads
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-card hover:border-pitch-green/40 hover:shadow-md transition-all"
            >
              <Avatar
                fallback={student.name}
                size="lg"
                className="mt-1 ring-2 ring-stump-gold/30"
              />

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    {student.name}
                  </h4>
                  <Badge variant="pitch" className="text-[10px] px-2 py-0">
                    {student.batch}
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p>
                    <span className="font-medium text-foreground">Bat:</span>{" "}
                    {student.battingStyle.replace("_", " ")}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Bowl:</span>{" "}
                    {student.bowlingStyle.replace(/_/g, " ")}
                  </p>
                </div>

                {/* Quick Performance Metrics */}
                <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-chalk-100/70 p-2 text-center text-xs dark:bg-pitch-green-950/60">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      Runs
                    </span>
                    <p className="font-heading text-base font-bold text-pitch-green dark:text-chalk">
                      {student.totalRuns}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      Wickets
                    </span>
                    <p className="font-heading text-base font-bold text-leather-red">
                      {student.totalWickets}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      Matches
                    </span>
                    <p className="font-heading text-base font-bold text-stump-gold-700">
                      {student.matchesPlayed}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-pitch-green" />
                    {student.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-leather-red" />
                    Guardian: {student.guardianPhone}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  );
}
