"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button
} from "@crick-academy/ui";
import { CreditCard, CheckCircle, AlertCircle, Clock } from "lucide-react";
import type { PaymentStatus, PaymentType } from "@crick-academy/types";

interface FeeItem {
  id: string;
  studentName: string;
  batch: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  type: PaymentType;
  method?: string;
}

const mockFees: FeeItem[] = [
  {
    id: "fee-101",
    studentName: "Aarav Sharma",
    batch: "Morning Elite U-19",
    amount: 3500,
    dueDate: "2026-09-05",
    status: "PAID",
    type: "MONTHLY",
    method: "UPI (GooglePay)"
  },
  {
    id: "fee-102",
    studentName: "Rohan Varma",
    batch: "Morning Elite U-19",
    amount: 3500,
    dueDate: "2026-09-01",
    status: "UNPAID",
    type: "MONTHLY"
  },
  {
    id: "fee-103",
    studentName: "Kabir Singh",
    batch: "Evening Juniors U-14",
    amount: 1500,
    dueDate: "2026-08-20",
    status: "OVERDUE",
    type: "TOURNAMENT"
  },
  {
    id: "fee-104",
    studentName: "Aditya Patil",
    batch: "Weekend Batch",
    amount: 2500,
    dueDate: "2026-09-07",
    status: "PAID",
    type: "MONTHLY",
    method: "Bank Transfer"
  }
];

export function FeeTrackerPreview() {
  const [fees, setFees] = useState<FeeItem[]>(mockFees);

  const markAsPaid = (feeId: string) => {
    setFees((prev) =>
      prev.map((f) =>
        f.id === feeId ? { ...f, status: "PAID", method: "UPI Instant" } : f
      )
    );
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "PAID":
        return <Badge variant="paid">PAID</Badge>;
      case "UNPAID":
        return <Badge variant="unpaid">UNPAID</Badge>;
      case "OVERDUE":
        return <Badge variant="overdue">OVERDUE</Badge>;
    }
  };

  return (
    <Card className="h-full border-border/80 shadow-sm" id="fees">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>FEE & MEMBERSHIP TRACKER</CardTitle>
          <CardDescription>
            Student dues, match fees, and online UPI reconciliation
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <CreditCard className="h-3.5 w-3.5" />
          Send Reminders
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {fees.map((fee) => (
          <div
            key={fee.id}
            className="flex items-center justify-between p-3.5 rounded-lg border border-border/60 bg-card hover:bg-chalk-50/50 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">
                  {fee.studentName}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  • {fee.batch}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-semibold text-pitch-green">
                  ₹{fee.amount.toLocaleString("en-IN")}
                </span>
                <span className="capitalize text-[11px] bg-chalk-200 px-2 py-0.5 rounded font-bold text-ink/70">
                  {fee.type.toLowerCase()}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="h-3 w-3" /> Due: {fee.dueDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getStatusBadge(fee.status)}
              {fee.status !== "PAID" && (
                <Button
                  variant="pitch"
                  size="sm"
                  onClick={() => markAsPaid(fee.id)}
                  className="text-xs h-8 px-2.5"
                >
                  Collect
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
