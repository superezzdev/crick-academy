"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Trophy,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import { Button } from "@crick-academy/ui";
import { toast } from "sonner";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdmissionModal({ isOpen, onClose }: AdmissionModalProps) {
  const [formData, setFormData] = useState({
    athleteName: "",
    ageGroup: "U-14 (Sub-Junior)",
    parentName: "",
    phoneNumber: "",
    email: "",
    preferredBatch: "Morning (6:30 AM - 8:30 AM)",
    primarySkill: "All-Rounder",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.athleteName || !formData.phoneNumber) {
      toast.error("Please provide athlete name and contact number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(
        `Trial booking confirmed for ${formData.athleteName}! Our Head Coach will reach out.`,
        { duration: 4000 }
      );
    }, 1000);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md p-4 animate-in fade-in-50">
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-border/80 bg-card p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pitch-green text-chalk shadow-md">
              <Trophy className="h-5 w-5 text-stump-gold" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-pitch-green dark:text-chalk">
                BOOK FREE TRIAL NET SESSION
              </h3>
              <p className="text-xs text-muted-foreground">
                Experience high-performance pitch drills & coaching assessment
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-chalk-200 hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading text-2xl font-bold text-pitch-green dark:text-chalk">
                TRIAL SESSION CONFIRMED!
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                We've reserved a net slot for <strong>{formData.athleteName}</strong> in the{" "}
                <strong>{formData.preferredBatch}</strong> batch.
              </p>
            </div>

            <div className="rounded-2xl bg-chalk-100 dark:bg-pitch-green-950/70 p-4 text-left text-xs space-y-2 border border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Athlete:</span>
                <span className="font-bold">{formData.athleteName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age Group:</span>
                <span className="font-bold">{formData.ageGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Specialization:</span>
                <span className="font-bold">{formData.primarySkill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slot:</span>
                <span className="font-bold text-pitch-green dark:text-stump-gold">
                  {formData.preferredBatch}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button onClick={handleResetAndClose} variant="pitch" className="w-full">
                Done & Return to Homepage
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Athlete Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.athleteName}
                  onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-chalk-50/70 px-3 py-2 text-xs font-semibold focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/60"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Age Category
                </label>
                <select
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-chalk-50/70 px-3 py-2 text-xs font-semibold focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/60"
                >
                  <option value="U-12 (Beginner Grassroots)">U-12 (Beginner Grassroots)</option>
                  <option value="U-14 (Sub-Junior)">U-14 (Sub-Junior)</option>
                  <option value="U-16 (Junior Elite)">U-16 (Junior Elite)</option>
                  <option value="U-19 / Open Senior">U-19 / Open Senior</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-chalk-50/70 px-3 py-2 text-xs font-semibold focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/60"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-chalk-50/70 px-3 py-2 text-xs font-semibold focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Primary Playing Role
                </label>
                <select
                  value={formData.primarySkill}
                  onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-chalk-50/70 px-3 py-2 text-xs font-semibold focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/60"
                >
                  <option value="Top-Order Batsman">Top-Order Batsman</option>
                  <option value="Fast Bowler (Pace)">Fast Bowler (Pace)</option>
                  <option value="Spin Bowler">Spin Bowler</option>
                  <option value="Wicketkeeper Batsman">Wicketkeeper Batsman</option>
                  <option value="All-Rounder">All-Rounder</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Preferred Practice Batch
                </label>
                <select
                  value={formData.preferredBatch}
                  onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-chalk-50/70 px-3 py-2 text-xs font-semibold focus:border-pitch-green focus:outline-none dark:bg-pitch-green-950/60"
                >
                  <option value="Morning (6:30 AM - 8:30 AM)">Morning (6:30 AM - 8:30 AM)</option>
                  <option value="Evening (4:00 PM - 6:30 PM)">Evening (4:00 PM - 6:30 PM)</option>
                  <option value="Weekend Special (Sat & Sun)">Weekend Special (Sat & Sun)</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl bg-chalk-100 dark:bg-pitch-green-950/80 p-3 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-stump-gold shrink-0" />
              <span>Includes 45-min dedicated net assessment with certified BCCI Level-2 Coach.</span>
            </div>

            <div className="pt-2 flex items-center gap-3 border-t border-border">
              <Button type="button" variant="outline" onClick={onClose} className="w-1/3 text-xs">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="pitch"
                className="w-2/3 text-xs font-bold gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-chalk border-t-transparent rounded-full animate-spin" />
                    <span>Reserving Net Slot...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5 text-stump-gold" />
                    <span>Confirm Trial Registration</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
