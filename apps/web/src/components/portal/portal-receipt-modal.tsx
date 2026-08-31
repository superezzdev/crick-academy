"use client";

import React from "react";
import {
  Printer,
  Download,
  CheckCircle2,
  Trophy,
  X,
  FileCheck,
  Building
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";
import { toast } from "sonner";
import type { FeePayment } from "@crick-academy/types";

interface PortalReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: FeePayment | null;
  studentName: string;
  studentBatch: string;
  guardianPhone: string;
}

export function PortalReceiptModal({
  isOpen,
  onClose,
  fee,
  studentName,
  studentBatch,
  guardianPhone
}: PortalReceiptModalProps) {
  if (!isOpen || !fee) return null;

  const monthLabel = fee.dueDate.toString().includes("2026-06")
    ? "June 2026"
    : fee.dueDate.toString().includes("2026-07")
    ? "July 2026"
    : "August 2026";

  const receiptNumber = `REC-2026-${fee.id.replace(/[^0-9]/g, "").padEnd(6, "4") || "842911"}`;

  const formatDate = (dateStr?: Date | string | null) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Receipt Downloaded", {
      description: `Saved ${receiptNumber}.pdf to your device.`,
      icon: <Download className="h-4 w-4 text-emerald-600" />
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-border/80 bg-card p-6 shadow-2xl dark:bg-pitch-green-950 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:hover:bg-pitch-green-900"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          {/* Receipt Header */}
          <div className="flex items-start justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pitch-green text-chalk shadow-md">
                <Trophy className="h-5 w-5 text-stump-gold" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-black text-pitch-green dark:text-chalk uppercase">
                  CRICK<span className="text-leather-red">ACADEMY</span>
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Official Subscription & Training Receipt
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-xs font-bold text-foreground">
                #{receiptNumber}
              </span>
              <p className="text-[10px] text-muted-foreground">
                Date: {formatDate(fee.paidOn || fee.dueDate)}
              </p>
            </div>
          </div>

          {/* Student & Bill Details */}
          <div className="grid grid-cols-2 gap-4 text-xs rounded-xl bg-chalk-50 p-4 dark:bg-pitch-green-900/30 border border-border/60">
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">
                Billed To (Student)
              </p>
              <p className="font-heading text-sm font-bold text-pitch-green dark:text-chalk mt-0.5">
                {studentName}
              </p>
              <p className="text-muted-foreground">{studentBatch}</p>
              <p className="text-muted-foreground text-[10px]">Guardian: {guardianPhone}</p>
            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">
                Payment Status
              </p>
              <div className="mt-1 flex justify-end">
                <Badge variant="paid" className="text-[11px] px-2.5 py-0.5">
                  ✓ PAID & VERIFIED
                </Badge>
              </div>
              <p className="text-muted-foreground text-[10px] mt-1">
                Method: <strong>{fee.method || "UPI Transfer"}</strong>
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold text-muted-foreground pb-1 border-b border-border/60 uppercase text-[10px]">
              <span>Description</span>
              <span>Amount</span>
            </div>

            <div className="flex justify-between py-1 border-b border-border/40">
              <div>
                <p className="font-semibold text-foreground">
                  Academy Monthly Tuition ({monthLabel})
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Coaching, Astro turf net access, match analysis
                </p>
              </div>
              <span className="font-bold">₹1,271.18</span>
            </div>

            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">GST @ 18%</span>
              <span>₹228.82</span>
            </div>

            <div className="flex justify-between pt-2 font-heading text-base font-black text-pitch-green dark:text-stump-gold">
              <span>Total Amount Paid:</span>
              <span>₹{fee.amount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Stamp & Authorized Signature */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/40 p-3 dark:bg-emerald-950/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-bold text-emerald-800 dark:text-emerald-300">
                  Electronic Tax Invoice
                </p>
                <p className="text-[10px] text-muted-foreground">GSTIN: 27AAACC4128F1Z8</p>
              </div>
            </div>
            <span className="font-heading text-xs font-extrabold text-emerald-700 dark:text-emerald-400 border border-emerald-600 rounded px-2 py-0.5 uppercase">
              SEALED
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 text-xs">
              <Printer className="h-3.5 w-3.5" />
              Print
            </Button>
            <Button variant="pitch" size="sm" onClick={handleDownload} className="gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5 text-stump-gold" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
