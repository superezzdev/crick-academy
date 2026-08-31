"use client";

import React from "react";
import Link from "next/link";
import { WifiOff, RefreshCw, LayoutDashboard, UserCheck, ShieldCheck, Home } from "lucide-react";
import { Button } from "@crick-academy/ui";

export default function OfflineFallbackPage() {
  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0B3D2E] via-[#082e23] to-[#041a13] text-[#F5F1E6] p-4 sm:p-6 select-none">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6">
        {/* Offline Badge & Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center rounded-3xl bg-[#0B3D2E] border-2 border-[#E8C468]/40 shadow-inner">
          <WifiOff className="w-12 h-12 text-[#E8C468]" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 rounded-full bg-[#C1121F] ring-2 ring-[#0B3D2E]" />
        </div>

        {/* Heading & Information */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-[#E8C468]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Offline Mode
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white">
            Chandigarh Cricket Academy
          </h1>
          <p className="text-sm text-[#F5F1E6]/80 leading-relaxed">
            You are currently playing without an active internet connection. Don&apos;t worry—your previously visited academy sections are available offline in your local app shell.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={handleReload}
            className="w-full sm:w-auto bg-[#E8C468] text-[#0B3D2E] hover:bg-[#d4b057] font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Try Reconnecting
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-[#F5F1E6] hover:bg-white/20 font-medium px-6 py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home Page
            </Button>
          </Link>
        </div>

        {/* Cached App Shell Shortcuts */}
        <div className="pt-4 border-t border-white/10 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-[#E8C468]/90 mb-3 text-center">
            Open Cached Shell Modules
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#E8C468]" />
              <div>
                <div className="text-xs font-bold text-white">Dashboard</div>
                <div className="text-[10px] text-white/60">Admin Turf Ops</div>
              </div>
            </Link>

            <Link
              href="/portal"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <UserCheck className="w-4 h-4 text-[#E8C468]" />
              <div>
                <div className="text-xs font-bold text-white">Portal</div>
                <div className="text-[10px] text-white/60">Student / Player</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-white/50">
          Chandigarh Cricket Academy PWA • Service Worker Cache v1.0
        </p>
      </div>
    </div>
  );
}
