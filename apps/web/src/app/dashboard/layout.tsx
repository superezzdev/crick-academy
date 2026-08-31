import React from "react";
import { Navbar } from "@/components/navbar";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Primary Top Navbar */}
      <Navbar />

      {/* Admin Dashboard Breadcrumbs & Section Navigation */}
      <DashboardNav />

      {/* Main Content Area */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          {children}
        </div>
      </main>

      {/* Global Toast Provider for Reminder feedback */}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "border border-border font-sans shadow-lg",
          style: {
            borderRadius: "0.75rem"
          }
        }}
      />
    </div>
  );
}
