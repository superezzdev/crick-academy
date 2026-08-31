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
  CreditCard,
  Send,
  Check,
  Search,
  MessageCircle,
  ExternalLink,
  Clock,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import type { FeeWithStudent } from "@/lib/data";

interface FeeStatusTableProps {
  initialFees: FeeWithStudent[];
}

export function FeeStatusTable({ initialFees }: FeeStatusTableProps) {
  const [filter, setFilter] = useState<"ALL" | "OVERDUE" | "UNPAID" | "PAID">("ALL");
  const [search, setSearch] = useState<string>("");
  const [remindedIds, setRemindedIds] = useState<Set<string>>(new Set());

  const handleSendReminder = (fee: FeeWithStudent) => {
    setRemindedIds((prev) => new Set(prev).add(fee.id));

    toast.success(`WhatsApp Reminder Sent`, {
      description: `Dispatched payment link of ₹${fee.amount} for ${fee.studentName} to guardian (${fee.guardianPhone || fee.studentPhone}).`,
      icon: <MessageCircle className="h-4 w-4 text-emerald-600" />,
      duration: 4500
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

  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Filter list
  const filteredFees = initialFees.filter((fee) => {
    if (filter !== "ALL" && fee.status !== filter) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        fee.studentName.toLowerCase().includes(q) ||
        fee.studentBatch.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <Card className="h-full border-border/80 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pitch-green/10 text-pitch-green dark:text-stump-gold">
                <CreditCard className="h-4 w-4" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">
                FEE STATUS & COLLECTIONS
              </CardTitle>
            </div>
            <CardDescription className="mt-1">
              Monthly academy fees, dues reconciliation, and instant guardian WhatsApp reminders
            </CardDescription>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1 self-start sm:self-auto rounded-lg border border-border/80 bg-chalk-100/70 p-1 text-xs font-semibold">
            <button
              onClick={() => setFilter("ALL")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                filter === "ALL"
                  ? "bg-pitch-green text-chalk shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({initialFees.length})
            </button>
            <button
              onClick={() => setFilter("OVERDUE")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                filter === "OVERDUE"
                  ? "bg-leather-red text-chalk shadow-sm"
                  : "text-leather-red hover:bg-leather-red/10"
              }`}
            >
              Overdue ({initialFees.filter((f) => f.status === "OVERDUE").length})
            </button>
            <button
              onClick={() => setFilter("UNPAID")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                filter === "UNPAID"
                  ? "bg-stone-700 text-chalk shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Unpaid ({initialFees.filter((f) => f.status === "UNPAID").length})
            </button>
            <button
              onClick={() => setFilter("PAID")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                filter === "PAID"
                  ? "bg-emerald-700 text-chalk shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Paid ({initialFees.filter((f) => f.status === "PAID").length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search student by name or batch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="max-h-[460px] overflow-y-auto pr-1">
          <Table>
            <TableHeader>
              <TableRow className="border-pitch-green-700">
                <TableHead>Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No fee records match the selected filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFees.map((fee) => {
                  const isReminded = remindedIds.has(fee.id);

                  return (
                    <TableRow key={fee.id} className="group">
                      {/* Student Name & Batch */}
                      <TableCell className="py-3">
                        <Link
                          href={`/dashboard/students/${fee.studentId}`}
                          className="flex items-center gap-2.5 group-hover:text-pitch-green transition-colors"
                        >
                          <Avatar
                            fallback={fee.studentName}
                            size="sm"
                            className="ring-1 ring-border"
                          />
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-foreground group-hover:underline">
                              {fee.studentName}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {fee.studentBatch}
                            </p>
                          </div>
                        </Link>
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="font-heading font-bold text-sm text-pitch-green dark:text-stump-gold">
                        ₹{fee.amount.toLocaleString("en-IN")}
                      </TableCell>

                      {/* Due Date */}
                      <TableCell className="text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground/80" />
                          {formatDate(fee.dueDate)}
                        </span>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell>{getStatusBadge(fee.status)}</TableCell>

                      {/* Action: Send reminder for overdue, view details or receipt */}
                      <TableCell className="text-right">
                        {fee.status === "OVERDUE" ? (
                          <Button
                            variant={isReminded ? "outline" : "leather"}
                            size="sm"
                            onClick={() => handleSendReminder(fee)}
                            disabled={isReminded}
                            className={`h-7 px-2.5 text-xs gap-1 font-semibold ${
                              isReminded ? "border-emerald-600 text-emerald-700 bg-emerald-50" : ""
                            }`}
                          >
                            {isReminded ? (
                              <>
                                <Check className="h-3 w-3" />
                                Reminded
                              </>
                            ) : (
                              <>
                                <MessageCircle className="h-3 w-3" />
                                Send reminder
                              </>
                            )}
                          </Button>
                        ) : fee.status === "UNPAID" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendReminder(fee)}
                            className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Send Notice
                          </Button>
                        ) : (
                          <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {fee.method || "Paid"}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer summary bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-chalk-100/70 p-3 text-xs text-muted-foreground dark:bg-pitch-green-950/40">
          <span>
            Showing <strong className="text-foreground">{filteredFees.length}</strong> of{" "}
            {initialFees.length} total records
          </span>
          <Link
            href="/dashboard/students"
            className="flex items-center gap-1 font-semibold text-pitch-green hover:underline dark:text-stump-gold"
          >
            View student fee ledger
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
