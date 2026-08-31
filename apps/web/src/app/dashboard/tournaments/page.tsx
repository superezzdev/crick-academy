import React from "react";
import { Metadata } from "next";
import { getTournamentsList } from "@/lib/data";
import { TournamentsListView } from "@/components/dashboard/tournaments-list-view";

export const metadata: Metadata = {
  title: "Tournaments & Leagues | CrickAcademy",
  description:
    "Academy tournament schedule, live ongoing leagues, upcoming championships, fixture results, and player performance leaderboards."
};

export default function TournamentsPage() {
  const tournaments = getTournamentsList();

  return <TournamentsListView initialTournaments={tournaments} />;
}
