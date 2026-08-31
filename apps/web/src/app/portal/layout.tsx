import React from "react";
import { Navbar } from "@/components/navbar";

export default function PortalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Primary Top Navbar with Role Switcher */}
      <Navbar />

      {/* Main Student Portal Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
