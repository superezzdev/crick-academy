"use client";

import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  ArrowRight,
  ShieldCheck,
  FileText,
  Sparkles
} from "lucide-react";
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
  Button
} from "@crick-academy/ui";
import { PortalPaymentModal } from "./portal-payment-modal";
import { PortalReceiptModal } from "./portal-receipt-modal";
import type { FeePayment } from "@crick-academy/types";

interface PortalFeeLedgerProps {
  fees: FeePayment[];
  studentName: string;
  studentBatch: string;
  guardianPhone: string;
  onFeePaidStateUpdate?: (feeId: string, updatedFees: FeePayment[]) => void;
}

export function PortalFeeLedger({
  fees: initialFees,
  studentName,
  studentBatch,
  guardianPhone,
  onFeePaidStateUpdate
}: PortalFeeLedgerProps) {
  const [fees, setFees] = useState<FeePayment[]>(initialFees);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PAID" | "PENDING">("ALL");

  // Modals state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFeeForPayment, setSelectedFeeForPayment] = useState<FeePayment | null>(null);

  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedFeeForReceipt, setSelectedFeeForReceipt] = useState<FeePayment | null>(null);

  // Sync if initialFees change (e.g. when changing student in switcher)
  React.useEffect(() => {
    setFees(initialFees);
  }, [initialFees]);

  const pendingFees = fees.filter((f) => f.status === "OVERDUE" || f.status === "UNPAID");
  const pendingTotal = pendingFees.reduce((acc, f) => acc + f.amount, 0);
  const totalPaid = fees.filter((f) => f.status === "PAID").reduce((acc, f) => acc + f.amount, 0);

  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const handleOpenPayment = (fee: FeePayment) => {
    setSelectedFeeForPayment(fee);
    setPaymentModalOpen(true);
  };

  const handleOpenReceipt = (fee: FeePayment) => {
    setSelectedFeeForReceipt(fee);
    setReceiptModalOpen(true);
  };

  const handlePaymentSuccess = (feeId: string, method: string, receiptId: string) => {
    const updated = fees.map((f) => {
      if (f.id === feeId) {
        return {
          ...f,
          status: "PAID" as const,
          paidOn: new Date(),
          method: method === "UPI" ? "UPI (Instant)" : method === "CARD" ? "Debit Card" : "Net Banking",
          proofUrl: receiptId
        };
      }
      return f;
    });

    setFees(updated);
    if (onFeePaidStateUpdate) {
      onFeePaidStateUpdate(feeId, updated);
    }
  };

  const filteredFees = fees.filter((fee) => {
    if (statusFilter === "PAID") return fee.status === "PAID";
    if (statusFilter === "PENDING") return fee.status === "UNPAID" || fee.status === "OVERDUE";
    return true;
  });

  return (
    <div className="space-y-6" id="fees-section">
      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Outstanding Balance */}
        <div className="rounded-2xl border-2 border-border/80 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Outstanding Dues
            </span>
            <Badge
              variant={pendingFees.length > 0 ? "leather" : "paid"}
              className="text-[10px]"
            >
              {pendingFees.length > 0 ? `${pendingFees.length} Pending` : "All Clear"}
            </Badge>
          </div>
          <p className="font-heading text-3xl font-extrabold text-pitch-green dark:text-chalk mt-2">
            ₹{pendingTotal.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {pendingFees.length > 0
              ? "Includes pending monthly academy subscription"
              : "No pending tuition or tournament fees"}
          </p>
        </div>

        {/* Card 2: Total Paid to Date */}
        <div className="rounded-2xl border-2 border-border/80 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Fees Settled
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="font-heading text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-2">
            ₹{totalPaid.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Across 2026 academy quarters & practice nets
          </p>
        </div>

        {/* Card 3: Monthly Plan */}
        <div className="rounded-2xl border-2 border-border/80 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Current Plan
            </span>
            <CreditCard className="h-4 w-4 text-stump-gold-700" />
          </div>
          <p className="font-heading text-3xl font-extrabold text-stump-gold-800 dark:text-stump-gold mt-2">
            ₹1,500 <span className="text-xs font-sans font-normal text-muted-foreground">/ Month</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {studentBatch} (6 Sessions/Wk + Turf Access)
          </p>
        </div>
      </div>

      {/* Pay All Alert if dues exist */}
      {pendingFees.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border-2 border-leather-red/30 bg-leather-red-50/70 p-4 sm:p-5 dark:bg-leather-red-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leather-red text-chalk shadow-sm">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold text-leather-red-900 dark:text-leather-red-200">
                Action Required: {pendingFees.length} Pending Invoice(s)
              </h4>
              <p className="text-xs text-leather-red-800/80 dark:text-leather-red-300">
                Please settle {studentName}&apos;s training dues to ensure uninterrupted access to turf pitches & match selections.
              </p>
            </div>
          </div>

          <Button
            variant="leather"
            size="sm"
            onClick={() => handleOpenPayment(pendingFees[0]!)}
            className="gap-1.5 text-xs font-bold shadow-md self-start sm:self-auto shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Pay ₹{pendingFees[0]?.amount} Dues Now
          </Button>
        </div>
      )}

      {/* Ledger Table Card */}
      <Card className="border-border/80 shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700">
                <CreditCard className="h-4 w-4" />
              </div>
              <CardTitle className="text-xl">FEE PAYMENT HISTORY & RECEIPTS</CardTitle>
            </div>
            <CardDescription className="mt-1">
              Complete monthly invoice ledger, payment timestamps & GST receipts
            </CardDescription>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                statusFilter === "ALL"
                  ? "bg-pitch-green text-chalk shadow-xs"
                  : "bg-chalk-100 text-muted-foreground hover:bg-chalk-200"
              }`}
            >
              All ({fees.length})
            </button>
            <button
              onClick={() => setStatusFilter("PENDING")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                statusFilter === "PENDING"
                  ? "bg-leather-red text-chalk shadow-xs"
                  : "bg-chalk-100 text-muted-foreground hover:bg-chalk-200"
              }`}
            >
              Pending ({pendingFees.length})
            </button>
            <button
              onClick={() => setStatusFilter("PAID")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                statusFilter === "PAID"
                  ? "bg-emerald-700 text-chalk shadow-xs"
                  : "bg-chalk-100 text-muted-foreground hover:bg-chalk-200"
              }`}
            >
              Paid ({fees.length - pendingFees.length})
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-pitch-green-700">
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Details</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10">
                      <div className="flex flex-col items-center justify-center text-center space-y-2.5 max-w-sm mx-auto">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chalk-200/80 text-pitch-green dark:bg-pitch-green-950 dark:text-stump-gold">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-heading text-base font-bold text-foreground">
                            {statusFilter === "PENDING" ? "All Fees Cleared" : "No Invoices Found"}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {statusFilter === "PENDING"
                              ? "Great news! No pending dues are outstanding for this account."
                              : "No payment records match your active filter tab."}
                          </p>
                        </div>
                        {statusFilter !== "ALL" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setStatusFilter("ALL")}
                            className="h-8 text-xs font-semibold mt-1"
                          >
                            View All Invoices
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFees.map((fee) => {
                  const monthLabel = fee.dueDate.toString().includes("2026-06")
                    ? "June 2026"
                    : fee.dueDate.toString().includes("2026-07")
                    ? "July 2026"
                    : "August 2026";

                  const isPaid = fee.status === "PAID";

                  return (
                    <TableRow key={fee.id}>
                      <TableCell>
                        <div className="font-heading font-bold text-sm text-foreground">
                          {monthLabel}
                        </div>
                        <p className="text-[10px] text-muted-foreground">Monthly Subscription</p>
                      </TableCell>

                      <TableCell className="font-heading font-bold text-base text-pitch-green dark:text-stump-gold">
                        ₹{fee.amount.toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground">
                        {formatDate(fee.dueDate)}
                      </TableCell>

                      <TableCell>
                        {isPaid ? (
                          <Badge variant="paid">PAID</Badge>
                        ) : fee.status === "OVERDUE" ? (
                          <Badge variant="overdue">OVERDUE</Badge>
                        ) : (
                          <Badge variant="unpaid">UNPAID</Badge>
                        )}
                      </TableCell>

                      <TableCell>
                        {isPaid ? (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400 block">
                              {fee.method || "UPI Transfer"}
                            </span>
                            {fee.paidOn && (
                              <span className="text-[10px]">
                                Paid on {formatDate(fee.paidOn)}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-leather-red">
                            Pending Settlement
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        {isPaid ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenReceipt(fee)}
                            className="h-8 gap-1.5 text-xs"
                          >
                            <FileText className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                            View Receipt
                          </Button>
                        ) : (
                          <Button
                            variant={fee.status === "OVERDUE" ? "leather" : "pitch"}
                            size="sm"
                            onClick={() => handleOpenPayment(fee)}
                            className="h-8 gap-1.5 text-xs shadow-sm"
                          >
                            <CreditCard className="h-3.5 w-3.5" />
                            Pay ₹{fee.amount}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Gateway Modal */}
      <PortalPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        fee={selectedFeeForPayment}
        studentName={studentName}
        studentBatch={studentBatch}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Official Receipt Modal */}
      <PortalReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        fee={selectedFeeForReceipt}
        studentName={studentName}
        studentBatch={studentBatch}
        guardianPhone={guardianPhone}
      />
    </div>
  );
}
