"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Loader2,
  X,
  QrCode,
  Download
} from "lucide-react";
import { Button, Badge } from "@crick-academy/ui";
import { toast } from "sonner";
import type { StudentPortalSession } from "@/lib/portal-data";

interface PortalSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: StudentPortalSession | null;
  studentName: string;
  onRegisterSuccess: (sessionId: string) => void;
}

export function PortalSessionModal({
  isOpen,
  onClose,
  session,
  studentName,
  onRegisterSuccess
}: PortalSessionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [passNumber, setPassNumber] = useState("");

  if (!isOpen || !session) return null;

  const formatDate = (dateStr: Date | string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const handleRegister = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const passId = `PASS-NET-${Math.floor(10000 + Math.random() * 90000)}`;
      setPassNumber(passId);
      setIsProcessing(false);
      setIsConfirmed(true);

      onRegisterSuccess(session.id);

      toast.success("Net Session Confirmed! 🏏", {
        description: `${studentName} has been booked for ${session.focusArea}. Booking pass #${passId} generated.`,
        duration: 5000
      });
    }, 1000);
  };

  const handleDownloadPass = () => {
    toast.success("Entry Pass Downloaded", {
      description: `Saved ${passNumber}.pdf to your device.`,
      icon: <Download className="h-4 w-4 text-emerald-600" />
    });
  };

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-pitch-green/40 bg-card p-6 shadow-2xl dark:bg-pitch-green-950 sm:p-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full p-2 text-muted-foreground hover:bg-chalk-100 hover:text-foreground dark:hover:bg-pitch-green-900"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!isConfirmed ? (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pitch-green text-chalk">
                  <Calendar className="h-4 w-4 text-stump-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-black text-pitch-green dark:text-chalk">
                    REGISTER NET SESSION
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Academy Turf & Astro Pitch Booking Pass
                  </p>
                </div>
              </div>
            </div>

            {/* Session Card */}
            <div className="rounded-2xl border-2 border-pitch-green/30 bg-chalk-50 p-4 dark:bg-pitch-green-900/40 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge variant="gold" className="text-[10px] mb-1.5 font-bold">
                    {session.pitchType}
                  </Badge>
                  <h4 className="font-heading text-base font-bold text-pitch-green dark:text-chalk">
                    {session.focusArea}
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Session Fee</p>
                  <p className="font-heading text-xl font-black text-pitch-green dark:text-stump-gold">
                    ₹{session.feeAmount}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 text-foreground">
                  <Calendar className="h-3.5 w-3.5 text-pitch-green" />
                  <span>{formatDate(session.date)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-foreground">
                  <Clock className="h-3.5 w-3.5 text-stump-gold-700" />
                  <span>{session.time}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-xs text-pitch-green dark:text-stump-gold font-semibold pt-1">
                  <span>Lead: {session.coachName}</span>
                </div>
              </div>
            </div>

            {/* Equipment Checklist */}
            <div className="rounded-xl border border-border/80 bg-card p-3.5 text-xs space-y-2">
              <span className="font-bold text-foreground block">
                Required Gear Checklist:
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-muted-foreground">
                <span>✓ White/Color Academy Jersey</span>
                <span>✓ Bat & Batting Gloves</span>
                <span>✓ Helmet & Leg Guards</span>
                <span>✓ Turf Spike / Rubber Studs</span>
              </div>
            </div>

            {/* Register Action */}
            <div className="space-y-2 pt-2">
              <Button
                variant="pitch"
                size="lg"
                onClick={handleRegister}
                disabled={isProcessing}
                className="w-full gap-2 text-sm font-bold shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-stump-gold" />
                    Confirming Slot for {studentName}...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-stump-gold" />
                    Register & Pay ₹{session.feeAmount} (Demo Flow)
                  </>
                )}
              </Button>
              <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" /> Guaranteed Net Pitch Slot with Senior Coach
              </p>
            </div>
          </div>
        ) : (
          /* Confirmed Pass View */
          <div className="space-y-6 py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-heading text-2xl font-black text-pitch-green dark:text-chalk uppercase">
                NET SLOT CONFIRMED!
              </h3>
              <p className="text-xs text-muted-foreground">
                {studentName} is booked for <strong>{session.focusArea}</strong>
              </p>
            </div>

            <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 p-4 dark:bg-emerald-950/30 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking Pass ID:</span>
                <span className="font-mono font-bold text-foreground">
                  #{passNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-semibold">{formatDate(session.date)} ({session.time})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pitch:</span>
                <span className="font-semibold">{session.pitchType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coach:</span>
                <span>{session.coachName}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="default"
                onClick={handleDownloadPass}
                className="flex-1 text-xs gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download Pass
              </Button>
              <Button
                variant="pitch"
                size="default"
                onClick={handleClose}
                className="flex-1 text-xs font-bold shadow-md"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
