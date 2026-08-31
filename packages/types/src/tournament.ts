import type { Student } from "./student";
import type { PlayerPerformance } from "./performance";

export type TournamentStatus =
  | "UPCOMING"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export interface Tournament {
  id: string;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  status: TournamentStatus | string;
  location?: string | null;
  format?: string | null; // e.g. "T20 Knockout", "Super League 15-Overs"
  description?: string | null;
  bannerUrl?: string | null;
  championTeam?: string | null;
  runnerUpTeam?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type MatchResult =
  | "WON"
  | "LOST"
  | "DRAW"
  | "TIED"
  | "ABANDONED"
  | "PENDING";

export interface Match {
  id: string;
  tournamentId: string;
  opponent: string;
  date: Date | string;
  venue?: string | null;
  result?: MatchResult | string | null;
  homeTeamName?: string | null;
  awayTeamName?: string | null;
  homeScore?: string | null; // e.g. "168/4 (20.0 ov)"
  awayScore?: string | null; // e.g. "150/8 (20.0 ov)"
  summary?: string | null; // e.g. "Thunderbolts XI won by 18 runs"
  stage?: string | null; // e.g. "Grand Final", "Semi-Final 1", "League Round 2"
  playerOfTheMatchId?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface MatchWithTournament extends Match {
  tournament?: Tournament;
}

export interface TournamentTeam {
  id: string;
  tournamentId: string;
  name: string;
  shortName: string;
  color: string; // e.g. "#0B3D2E", "#C1121F", "#E8C468", "#2563EB"
  captainId: string;
  viceCaptainId?: string;
  playerIds: string[];
  students?: Student[];
  captain?: Student;
}

export interface TournamentFixture extends Match {
  homeTeam?: TournamentTeam;
  awayTeam?: TournamentTeam;
  playerOfTheMatch?: Student;
  performances?: (PlayerPerformance & { student?: Student })[];
}

export interface TournamentDetailed extends Tournament {
  teams: TournamentTeam[];
  matches: TournamentFixture[];
  totalTeams: number;
  completedMatchesCount: number;
  totalMatchesCount: number;
}

