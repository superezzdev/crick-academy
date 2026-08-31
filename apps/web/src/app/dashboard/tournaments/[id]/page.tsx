import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@crick-academy/ui";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import {
  getTournamentById,
  getTournamentsList,
  getTournamentLeaderboard
} from "@/lib/data";
import { TournamentDetailView } from "@/components/dashboard/tournament-detail-view";

interface TournamentDetailPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  const tournaments = getTournamentsList();
  return tournaments.map((t) => ({
    id: t.id
  }));
}

export function generateMetadata({
  params
}: TournamentDetailPageProps): Metadata {
  const tournament = getTournamentById(params.id);
  if (!tournament) {
    return {
      title: "Tournament Not Found | CrickAcademy"
    };
  }

  return {
    title: `${tournament.name} - Hub, Fixtures & Leaderboard | CrickAcademy`,
    description: `Match fixtures, team compositions, live player statistics, and performance leaderboards for ${tournament.name} at ${tournament.location || "CrickAcademy"}.`
  };
}

export default function TournamentDetailPage({ params }: TournamentDetailPageProps) {
  const tournament = getTournamentById(params.id);

  if (!tournament) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-leather-red/15 text-leather-red">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="font-heading text-3xl font-bold">Tournament Not Found</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          The requested tournament ID could not be located in the CrickAcademy database.
        </p>
        <Link href="/dashboard/tournaments">
          <Button variant="pitch" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tournaments Arena
          </Button>
        </Link>
      </div>
    );
  }

  const leaderboard = getTournamentLeaderboard(params.id);

  return (
    <TournamentDetailView
      tournament={tournament}
      leaderboard={leaderboard}
    />
  );
}
