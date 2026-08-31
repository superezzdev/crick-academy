"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge
} from "@crick-academy/ui";
import { Clock, Users, Plus, CheckCircle2 } from "lucide-react";
import type { NetSession } from "@crick-academy/types";

interface SessionWithOccupancy extends NetSession {
  bookedCount: number;
  coach: string;
  focus: string;
}

const mockSessions: SessionWithOccupancy[] = [
  {
    id: "sess-1",
    date: new Date().toISOString(),
    time: "06:30 AM - 08:30 AM",
    capacity: 12,
    feeAmount: 350,
    bookedCount: 10,
    coach: "Coach Vikram Rathour",
    focus: "Pace Bowling & Slip Catching"
  },
  {
    id: "sess-2",
    date: new Date(Date.now() + 86400000).toISOString(),
    time: "04:30 PM - 06:30 PM",
    capacity: 12,
    feeAmount: 350,
    bookedCount: 6,
    coach: "Coach Rajesh Sharma",
    focus: "Spin Variations & Power Hitting"
  },
  {
    id: "sess-3",
    date: new Date(Date.now() + 86400000 * 2).toISOString(),
    time: "06:30 AM - 08:30 AM",
    capacity: 12,
    feeAmount: 350,
    bookedCount: 12,
    coach: "Coach Vikram Rathour",
    focus: "Match Simulation & Death Overs"
  }
];

export function UpcomingSessions() {
  const [sessions, setSessions] = useState<SessionWithOccupancy[]>(mockSessions);
  const [registeredIds, setRegisteredIds] = useState<string[]>(["sess-1"]);

  const handleRegister = (sessionId: string) => {
    if (registeredIds.includes(sessionId)) return;

    setRegisteredIds((prev) => [...prev, sessionId]);
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, bookedCount: s.bookedCount + 1 } : s
      )
    );
  };

  return (
    <Card className="h-full border-border/80 shadow-sm" id="nets">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>NET SESSIONS SCHEDULE</CardTitle>
          <CardDescription>
            Upcoming turf & astro net practice bookings
          </CardDescription>
        </div>
        <Button variant="pitch" size="sm" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Schedule Slot
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((sess) => {
          const isRegistered = registeredIds.includes(sess.id);
          const isFull = sess.bookedCount >= sess.capacity && !isRegistered;
          const slotsLeft = Math.max(0, sess.capacity - sess.bookedCount);

          return (
            <div
              key={sess.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border/60 bg-chalk-50/70 hover:bg-chalk-100/90 transition-all dark:bg-pitch-green-950/40"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-lg font-bold text-pitch-green dark:text-chalk">
                    {sess.focus}
                  </span>
                  {isFull ? (
                    <Badge variant="leather">FULL</Badge>
                  ) : (
                    <Badge variant="gold">{slotsLeft} SLOTS LEFT</Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1 text-ink/80 dark:text-chalk/80 font-medium">
                    <Clock className="h-3.5 w-3.5 text-stump-gold-600" />
                    <span>{sess.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-pitch-green" />
                    <span>
                      {sess.bookedCount}/{sess.capacity} Registered
                    </span>
                  </div>
                  <span className="text-pitch-green font-semibold">
                    Fee: ₹{sess.feeAmount}
                  </span>
                </div>
              </div>

              <div className="mt-3 sm:mt-0 flex items-center gap-2">
                {isRegistered ? (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="gap-1.5 border-emerald-600 text-emerald-700 bg-emerald-50 text-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Enrolled
                  </Button>
                ) : (
                  <Button
                    variant="pitch"
                    size="sm"
                    disabled={isFull}
                    onClick={() => handleRegister(sess.id)}
                    className="text-xs"
                  >
                    {isFull ? "Waitlist" : "Register Slot"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
