"use client";

import React, { useState } from "react";
import {
  User,
  Phone,
  Calendar,
  Clock,
  Trophy,
  CheckCircle2,
  Sparkles,
  Zap,
  MapPin,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Award
} from "lucide-react";
import { Button, Input } from "@crick-academy/ui";
import { toast } from "sonner";

interface EnrollmentFormSectionProps {
  selectedBatch?: string;
}

export function EnrollmentFormSection({
  selectedBatch: initialBatch
}: EnrollmentFormSectionProps) {
  const [formData, setFormData] = useState({
    athleteName: "",
    parentName: "",
    phone: "",
    email: "",
    age: "12",
    preferredBatch: initialBatch || "Morning Batch (6:30 AM - 8:30 AM)",
    primarySkill: "All-Rounder",
    experience: "Intermediate (1-2 years school/club)",
    notes: ""
  });

  // Keep preferredBatch in sync if prop changes
  React.useEffect(() => {
    if (initialBatch) {
      setFormData((prev) => ({ ...prev, preferredBatch: initialBatch }));
    }
  }, [initialBatch]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    leadId: string;
    message: string;
    data?: any;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.athleteName.trim()) {
      toast.error("Please enter the athlete's full name.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error("Please provide a valid 10-digit contact / WhatsApp number.");
      return;
    }

    if (!formData.preferredBatch) {
      toast.error("Please select a preferred training batch.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admissions/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit trial application.");
      }

      setSubmissionResult({
        success: true,
        leadId: data.leadId,
        message: data.message,
        data: data.data
      });

      toast.success("Trial Session Booked Successfully!", {
        description: `Booking ID #${data.leadId} reserved for ${formData.athleteName}.`,
        duration: 5000
      });
    } catch (err: any) {
      toast.error("Submission Error", {
        description: err.message || "Could not complete booking. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      athleteName: "",
      parentName: "",
      phone: "",
      email: "",
      age: "12",
      preferredBatch: "Morning Batch (6:30 AM - 8:30 AM)",
      primarySkill: "All-Rounder",
      experience: "Intermediate (1-2 years school/club)",
      notes: ""
    });
  };

  return (
    <section id="enroll-form" className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-background via-card to-background border-b border-border/80">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-stump-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-80 h-80 bg-pitch-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-stump-gold/20 px-4 py-1 text-xs font-black tracking-wider text-stump-gold-800 dark:text-stump-gold uppercase">
            <Zap className="h-3.5 w-3.5 fill-stump-gold" />
            <span>Admissions & Trial Registration</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pitch-green dark:text-chalk tracking-tight">
            BOOK YOUR FREE TRIAL NET SESSION
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Experience our floodlit turf wickets and get assessed by BCCI-certified coaches. Fill in the quick details below to reserve your slot.
          </p>
        </div>

        {/* Main Form / Success State Container */}
        <div className="rounded-3xl border-2 border-border/90 bg-card p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {submissionResult ? (
            /* ========================================================================= */
            /* SUCCESS CONFIRMATION STATE */
            /* ========================================================================= */
            <div className="py-6 space-y-8 animate-in fade-in-50 zoom-in-95">
              <div className="text-center space-y-3">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 shadow-xl ring-4 ring-emerald-500/20">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-pitch-green dark:text-chalk">
                  TRIAL SESSION CONFIRMED!
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  We have successfully logged your interest and reserved a trial net slot.
                </p>
                <div className="inline-block rounded-full bg-stump-gold/20 border border-stump-gold/40 px-4 py-1 text-xs font-black text-stump-gold-800 dark:text-stump-gold uppercase tracking-wider">
                  BOOKING REFERENCE: #{submissionResult.leadId}
                </div>
              </div>

              {/* Booking Summary Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="rounded-2xl bg-chalk-100 dark:bg-pitch-green-950/70 p-5 border border-border space-y-3 text-xs">
                  <p className="font-heading text-sm font-bold uppercase tracking-wider text-pitch-green dark:text-stump-gold">
                    Athlete & Batch Information
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b border-border/60 pb-1.5">
                      <span className="text-muted-foreground">Athlete Name:</span>
                      <span className="font-bold text-foreground">{formData.athleteName}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/60 pb-1.5">
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-bold text-foreground">{formData.age} Years</span>
                    </div>
                    <div className="flex justify-between border-b border-border/60 pb-1.5">
                      <span className="text-muted-foreground">Preferred Batch:</span>
                      <span className="font-bold text-pitch-green dark:text-stump-gold">
                        {formData.preferredBatch}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border/60 pb-1.5">
                      <span className="text-muted-foreground">Discipline:</span>
                      <span className="font-bold text-foreground">{formData.primarySkill}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registered Phone:</span>
                      <span className="font-bold text-foreground">{formData.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-pitch-green text-chalk p-5 border border-pitch-green-800 space-y-3 text-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="font-heading text-sm font-bold uppercase tracking-wider text-stump-gold">
                      What to Bring on Trial Day
                    </p>
                    <ul className="space-y-1.5 text-chalk/85">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-stump-gold shrink-0" />
                        <span>White cricket t-shirt or sports track pants</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-stump-gold shrink-0" />
                        <span>Rubber-stud cricket shoes or sports sneakers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-stump-gold shrink-0" />
                        <span>Personal cricket bat (Academy provides kit if needed)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-stump-gold shrink-0" />
                        <span>Personal water bottle & sports towel</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-chalk/20 flex items-center gap-2 text-[11px] text-chalk/80">
                    <MapPin className="h-4 w-4 text-stump-gold shrink-0" />
                    <span>Sector 16 Cricket Stadium, Sector 16-D, Chandigarh</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/919876543210?text=Hi%20CCA%2C%20I%20have%20booked%20a%20trial%20session%20for%20${encodeURIComponent(formData.athleteName)}%20(Ref%20%23${submissionResult.leadId}).`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="gold"
                    size="lg"
                    className="gap-2 font-bold text-pitch-green shadow-xl"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Connect with Admissions Desk on WhatsApp</span>
                  </Button>
                </a>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="gap-2 font-bold"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Book Another Athlete</span>
                </Button>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* ADMISSIONS INTEREST FORM */
            /* ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Athlete Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                    <span>Athlete Full Name *</span>
                  </label>
                  <Input
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.athleteName}
                    onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                    className="h-12 bg-background border-border/80 focus:border-pitch-green rounded-xl text-sm"
                  />
                </div>

                {/* 2. Parent / Guardian Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Parent / Guardian Name</span>
                  </label>
                  <Input
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="h-12 bg-background border-border/80 focus:border-pitch-green rounded-xl text-sm"
                  />
                </div>

                {/* 3. Contact / WhatsApp Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                    <span>Contact / WhatsApp Number *</span>
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 bg-background border-border/80 focus:border-pitch-green rounded-xl text-sm"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    We will WhatsApp trial timing details & kit guidelines here.
                  </p>
                </div>

                {/* 4. Athlete Age / Date of Birth */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                    <span>Athlete Age (Years) *</span>
                  </label>
                  <select
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="flex h-12 w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="6">6 Years (Grassroots Foundation)</option>
                    <option value="7">7 Years (Grassroots Foundation)</option>
                    <option value="8">8 Years (Grassroots Foundation)</option>
                    <option value="9">9 Years (Grassroots Foundation)</option>
                    <option value="10">10 Years (Grassroots Foundation)</option>
                    <option value="11">11 Years (Junior Squad)</option>
                    <option value="12">12 Years (Junior Squad)</option>
                    <option value="13">13 Years (Junior Squad)</option>
                    <option value="14">14 Years (Junior Squad)</option>
                    <option value="15">15 Years (High-Performance Elite)</option>
                    <option value="16">16 Years (High-Performance Elite)</option>
                    <option value="17">17 Years (High-Performance Elite)</option>
                    <option value="18">18+ Years (Senior / Weekend Intensive)</option>
                  </select>
                </div>

                {/* 5. Preferred Training Batch */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                    <span>Preferred Training Batch *</span>
                  </label>
                  <select
                    value={formData.preferredBatch}
                    onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                    className="flex h-12 w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-sm font-semibold text-pitch-green dark:text-stump-gold ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="Morning Batch (6:30 AM - 8:30 AM)">
                      Morning Batch (06:30 AM - 08:30 AM)
                    </option>
                    <option value="Evening Batch (4:30 PM - 6:30 PM)">
                      Evening Batch (04:30 PM - 06:30 PM)
                    </option>
                    <option value="Weekend Batch (Sat & Sun)">
                      Weekend Batch (Saturdays & Sundays 07:00 AM - 10:30 AM)
                    </option>
                    <option value="High-Performance Elite Batch">
                      High-Performance Elite Batch (06:00 AM - 09:00 AM)
                    </option>
                  </select>
                </div>

                {/* 6. Primary Skill / Specialization */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 text-pitch-green dark:text-stump-gold" />
                    <span>Primary Skill / Specialization</span>
                  </label>
                  <select
                    value={formData.primarySkill}
                    onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                    className="flex h-12 w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="All-Rounder">All-Rounder (Bat & Ball)</option>
                    <option value="Pure Batsman">Specialist Batsman</option>
                    <option value="Fast / Medium Bowler">Fast / Medium-Pace Bowler</option>
                    <option value="Spin Bowler (Off/Leg/Orthodox)">Spin Bowler (Off / Leg / Left-Arm)</option>
                    <option value="Wicketkeeper Batsman">Wicketkeeper Batsman</option>
                    <option value="Complete Beginner">Complete Beginner (Just Starting)</option>
                  </select>
                </div>
              </div>

              {/* 7. Prior Experience / Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Prior Playing Experience / Specific Coaching Goals</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Played for school U-14 team, wants to improve pace bowling run-up and short ball defense."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl border border-border/80 bg-background p-3 text-sm focus:border-pitch-green focus:outline-hidden resize-none"
                />
              </div>

              {/* Trust Badge and Submit Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <ShieldCheck className="h-5 w-5 text-pitch-green dark:text-stump-gold shrink-0" />
                  <span>
                    No upfront registration fees for trial net session. Complete kit provided if required.
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 text-sm sm:text-base font-extrabold text-pitch-green shadow-xl hover:scale-105 transition-all py-6 px-10 rounded-2xl shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-pitch-green" />
                      <span>Reserving Trial Slot...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 text-pitch-green fill-pitch-green" />
                      <span>Confirm Free Trial Session</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
