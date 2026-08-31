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
  Avatar,
  Input
} from "@crick-academy/ui";
import {
  Users,
  Search,
  UserPlus,
  Phone,
  Shield,
  Trophy,
  ChevronRight,
  Filter,
  CheckCircle,
  AlertTriangle,
  Flame
} from "lucide-react";
import { getStudentsList } from "@/lib/data";
import type { StudentWithStats } from "@crick-academy/types";

export default function StudentsDirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");

  const students = getStudentsList(search, selectedBatch);
  const allStudentsCount = getStudentsList().length;

  return (
    <div className="space-y-6">
      {/* Top Squad Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">
              Total Enrolled
            </p>
            <h3 className="font-heading text-3xl font-bold text-pitch-green dark:text-stump-gold mt-1">
              18 Players
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              100% attendance rate
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pitch-green/10 text-pitch-green dark:text-stump-gold">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">
              Morning Batch
            </p>
            <h3 className="font-heading text-3xl font-bold text-pitch-green dark:text-stump-gold mt-1">
              6 Players
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              06:30 AM - 08:30 AM (U-19)
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stump-gold/20 text-stump-gold-800 dark:text-stump-gold">
            <Flame className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">
              Evening Batch
            </p>
            <h3 className="font-heading text-3xl font-bold text-pitch-green dark:text-stump-gold mt-1">
              6 Players
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              04:30 PM - 06:30 PM (U-14)
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">
              Weekend Batch
            </p>
            <h3 className="font-heading text-3xl font-bold text-pitch-green dark:text-stump-gold mt-1">
              6 Players
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Sat-Sun Match Practice
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-leather-red/10 text-leather-red">
            <Trophy className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <Card className="border-border/80 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl">
                STUDENTS & ATHLETES ROSTER
              </CardTitle>
              <CardDescription className="mt-1">
                Filter by batch training schedule, search by name or bowling/batting discipline
              </CardDescription>
            </div>

            <Button variant="pitch" size="sm" className="self-start sm:self-auto gap-1.5 shadow-sm">
              <UserPlus className="h-4 w-4 text-stump-gold" />
              Enroll Student
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4 pt-3 border-t border-border/60">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by student name, phone, or style..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 text-sm"
              />
            </div>

            {/* Batch Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/80 bg-chalk-100/70 p-1 text-xs font-semibold">
              <button
                onClick={() => setSelectedBatch("ALL")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  selectedBatch === "ALL"
                    ? "bg-pitch-green text-chalk shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Squad ({allStudentsCount})
              </button>
              <button
                onClick={() => setSelectedBatch("Morning")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  selectedBatch === "Morning"
                    ? "bg-pitch-green text-chalk shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Morning Batch
              </button>
              <button
                onClick={() => setSelectedBatch("Evening")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  selectedBatch === "Evening"
                    ? "bg-pitch-green text-chalk shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Evening Batch
              </button>
              <button
                onClick={() => setSelectedBatch("Weekend")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  selectedBatch === "Weekend"
                    ? "bg-pitch-green text-chalk shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Weekend Batch
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-pitch-green-700">
                <TableHead>Student Name</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Discipline (Bat / Bowl)</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Fee Dues</TableHead>
                <TableHead className="text-center">Match Stats</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No students found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow
                    key={student.id}
                    className="group cursor-pointer hover:bg-chalk-100/70 dark:hover:bg-pitch-green-950/40"
                  >
                    {/* Student Name & Avatar */}
                    <TableCell className="py-3.5">
                      <Link
                        href={`/dashboard/students/${student.id}`}
                        className="flex items-center gap-3 group-hover:text-pitch-green transition-colors"
                      >
                        <Avatar
                          fallback={student.name}
                          size="md"
                          className="ring-2 ring-border/80 group-hover:ring-pitch-green transition-all"
                        />
                        <div>
                          <p className="font-bold text-sm text-foreground group-hover:text-pitch-green group-hover:underline">
                            {student.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {student.id.replace("stud_", "")}
                          </p>
                        </div>
                      </Link>
                    </TableCell>

                    {/* Batch */}
                    <TableCell>
                      <Badge variant="pitch" className="text-[11px] font-semibold">
                        {student.batch}
                      </Badge>
                    </TableCell>

                    {/* Discipline */}
                    <TableCell className="text-xs space-y-0.5">
                      <div className="font-medium text-foreground">
                        {student.battingStyle.replace("_", " ")}
                      </div>
                      <div className="text-muted-foreground text-[11px]">
                        {student.bowlingStyle.replace(/_/g, " ")}
                      </div>
                    </TableCell>

                    {/* Contact Info */}
                    <TableCell className="text-xs space-y-1">
                      <div className="flex items-center gap-1 text-ink/80 dark:text-chalk/80 font-mono">
                        <Phone className="h-3 w-3 text-pitch-green" />
                        {student.phone}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-[11px] font-mono">
                        <Shield className="h-3 w-3 text-leather-red" />
                        {student.guardianPhone}
                      </div>
                    </TableCell>

                    {/* Fee Dues */}
                    <TableCell>
                      {(student.pendingFeesCount ?? 0) > 0 ? (
                        <Badge variant="overdue" className="text-[11px]">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {student.pendingFeesCount} Due{(student.pendingFeesCount ?? 0) > 1 ? "s" : ""}
                        </Badge>
                      ) : (
                        <Badge variant="paid" className="text-[11px]">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Up to Date
                        </Badge>
                      )}
                    </TableCell>

                    {/* Match Stats */}
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-2 rounded-lg bg-chalk-100/90 px-2.5 py-1 text-xs dark:bg-pitch-green-950/60">
                        <span className="font-bold text-pitch-green dark:text-chalk">
                          {student.totalRuns}r
                        </span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="font-bold text-leather-red">
                          {student.totalWickets}w
                        </span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="font-bold text-stump-gold-800 dark:text-stump-gold">
                          {student.matchesPlayed}m
                        </span>
                      </div>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="text-right">
                      <Link href={`/dashboard/students/${student.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 text-xs text-pitch-green hover:bg-pitch-green/10 font-bold"
                        >
                          Profile
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Table bottom pagination/count */}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-2">
            <span>
              Showing <strong>{students.length}</strong> of {allStudentsCount} athletes
            </span>
            <span className="font-mono">CrickAcademy Player Registry</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
