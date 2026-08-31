import type { Student } from "./student";
import type { Match } from "./tournament";

export interface PlayerPerformance {
  id: string;
  matchId: string;
  studentId: string;
  runs: number;
  wickets: number;
  catches: number;
  oversBowled?: number | null;
  runsConceded?: number | null;
  ballsFaced?: number | null;
  notes?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface PlayerPerformanceWithRelations extends PlayerPerformance {
  student?: Student;
  match?: Match;
}
