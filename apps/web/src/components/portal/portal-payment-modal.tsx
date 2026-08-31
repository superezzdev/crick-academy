"use client";

import React, { useState } from "react";
import {
  CreditCard,
  QrCode,
  Smartphone,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
  X
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";
import { toast } from "sonner";
import type { FeePayment } from "@crick-academy/types";

interface PortalPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: FeePayment | null;
  studentName: string;
  studentBatch: string;
  onPaymentSuccess: (feeId: string, method: string, receiptId: string) => void;
}

type PaymentMethodType = "UPI" | "CARD" | "NET_BANKING";

export function PortalPaymentModal({
  isOpen,
  onClose,
  fee,
  studentName,
  studentBatch,
  onPaymentSuccess
}: PortalPaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("UPI");
  const [upiId, setUpiId] = useState("parent.crick@okaxis");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedReceiptId, setGeneratedReceiptId] = useState("");

  if (!isOpen || !fee) return null;

  const monthLabel = fee.dueDate.toString().includes("2026-06")
    ? "June 2026"
    : fee.dueDate.toString().includes("2026-07")
    ? "July 2026"
    : "August 2026";

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const receiptId = `REC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedReceiptId(receiptId);
      setIsProcessing(false);
      setIsComplete(true);

      onPaymentSuccess(fee.id, selectedMethod, receiptId);

      toast.success("Payment Received Successfully! 🎉", {
        description: `₹${fee.amount} credited for ${studentName}'s ${monthLabel} training dues. Receipt #${receiptId} generated.`,
        duration: 5000
      });
    }, 1200);
  };

  const handleDone = () => {
    setIsComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-pitch-green/40 bg-card p-6 shadow-2xl dark:bg-pitch-green-950/95 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:hover:bg-pitch-green-900"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!isComplete ? (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pitch-green text-chalk">
                  <Lock className="h-4 w-4 text-stump-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-extrabold tracking-tight text-pitch-green dark:text-chalk">
                    SECURE FEE PAYMENT
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    CrickAcademy Verified Gateway (Demo Flow)
                  </p>
                </div>
              </div>
            </div>

            {/* Bill Summary Card */}
            <div className="rounded-2xl border border-pitch-green/20 bg-chalk-100/80 p-4 dark:bg-pitch-green-900/40">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div>
                  <p className="text-xs text-muted-foreground">Student Name & Batch</p>
                  <p className="font-heading text-sm font-bold text-pitch-green dark:text-chalk">
                    {studentName} • {studentBatch}
                  </p>
                </div>
                <Badge variant="leather" className="text-xs">
                  {monthLabel} Fee
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs font-semibold text-muted-foreground">
                  Total Payable Dues:
                </span>
                <span className="font-heading text-2xl font-black text-pitch-green dark:text-stump-gold">
                  ₹{fee.amount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Select Payment Mode
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {/* UPI Option */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod("UPI")}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                    selectedMethod === "UPI"
                      ? "border-pitch-green bg-pitch-green/10 ring-2 ring-pitch-green/30"
                      : "border-border hover:bg-chalk-100 dark:hover:bg-pitch-green-900/50"
                  }`}
                >
                  <Smartphone className="h-5 w-5 text-pitch-green dark:text-stump-gold" />
                  <span className="text-xs font-bold">UPI / QR</span>
                  <span className="text-[9px] text-muted-foreground">GPay, PhonePe</span>
                </button>

                {/* Card Option */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod("CARD")}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                    selectedMethod === "CARD"
                      ? "border-pitch-green bg-pitch-green/10 ring-2 ring-pitch-green/30"
                      : "border-border hover:bg-chalk-100 dark:hover:bg-pitch-green-900/50"
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-pitch-green dark:text-stump-gold" />
                  <span className="text-xs font-bold">Card</span>
                  <span className="text-[9px] text-muted-foreground">Visa, Master</span>
                </button>

                {/* Net Banking Option */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod("NET_BANKING")}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                    selectedMethod === "NET_BANKING"
                      ? "border-pitch-green bg-pitch-green/10 ring-2 ring-pitch-green/30"
                      : "border-border hover:bg-chalk-100 dark:hover:bg-pitch-green-900/50"
                  }`}
                >
                  <Building2 className="h-5 w-5 text-pitch-green dark:text-stump-gold" />
                  <span className="text-xs font-bold">Net Banking</span>
                  <span className="text-[9px] text-muted-foreground">All Major Banks</span>
                </button>
              </div>
            </div>

            {/* Method Details Form */}
            {selectedMethod === "UPI" && (
              <div className="space-y-3 rounded-xl border border-border/80 bg-chalk-50 p-4 dark:bg-pitch-green-900/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    Instant UPI Payment
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold dark:text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" /> 0% Convenience Fee
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g. mobile@upi)"
                    className="flex-1 rounded-lg border border-border/80 bg-card px-3 py-2 text-xs font-mono text-foreground focus:border-pitch-green focus:outline-none"
                  />
                  <Badge variant="gold" className="text-[10px] px-2 py-1">
                    VERIFIED
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  A payment request will be sent to your UPI App. Click below to confirm simulated payment.
                </p>
              </div>
            )}

            {selectedMethod === "CARD" && (
              <div className="space-y-3 rounded-xl border border-border/80 bg-chalk-50 p-4 dark:bg-pitch-green-900/20 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground">
                    Card Number (Demo Mock)
                  </label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 4242"
                    disabled
                    className="w-full rounded-lg border border-border/80 bg-card px-3 py-2 text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-muted-foreground">
                      Expiry
                    </label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      disabled
                      className="w-full rounded-lg border border-border/80 bg-card px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-muted-foreground">
                      CVV
                    </label>
                    <input
                      type="password"
                      defaultValue="888"
                      disabled
                      className="w-full rounded-lg border border-border/80 bg-card px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === "NET_BANKING" && (
              <div className="rounded-xl border border-border/80 bg-chalk-50 p-4 dark:bg-pitch-green-900/20 text-xs space-y-2">
                <p className="font-semibold text-foreground">Select Popular Bank:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded border bg-card text-center font-bold text-pitch-green">
                    HDFC Bank
                  </div>
                  <div className="p-2 rounded border bg-card text-center font-bold text-pitch-green">
                    ICICI Bank
                  </div>
                  <div className="p-2 rounded border bg-card text-center font-bold text-pitch-green">
                    State Bank of India
                  </div>
                  <div className="p-2 rounded border bg-card text-center font-bold text-pitch-green">
                    Axis Bank
                  </div>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <div className="space-y-2 pt-2">
              <Button
                variant="pitch"
                size="lg"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full gap-2 text-sm font-bold shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-stump-gold" />
                    Processing Payment of ₹{fee.amount.toLocaleString("en-IN")}...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-stump-gold" />
                    Pay ₹{fee.amount.toLocaleString("en-IN")} Now
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" /> 256-Bit SSL Encrypted Demo Transaction
              </p>
            </div>
          </div>
        ) : (
          /* Payment Success View */
          <div className="space-y-6 py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-heading text-2xl font-black text-pitch-green dark:text-chalk">
                PAYMENT CONFIRMED!
              </h3>
              <p className="text-xs text-muted-foreground">
                Your payment for <strong>{monthLabel}</strong> has been verified.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-4 dark:bg-emerald-950/30 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Receipt Number:</span>
                <span className="font-mono font-bold text-foreground">
                  #{generatedReceiptId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-bold text-pitch-green dark:text-stump-gold">
                  ₹{fee.amount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Mode:</span>
                <span className="font-bold">{selectedMethod} (Instant Verified)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
              </div>
            </div>

            <Button
              variant="pitch"
              size="lg"
              onClick={handleDone}
              className="w-full text-sm font-bold shadow-md"
            >
              Return to Student Locker Room
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
