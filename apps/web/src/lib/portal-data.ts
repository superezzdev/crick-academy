import {
  SEED_STUDENTS,
  SEED_FEES,
  SEED_SESSIONS,
  SEED_TOURNAMENTS,
  SEED_MATCHES,
  SEED_PERFORMANCES,
  ACADEMY_TEAMS,
  calculateAge,
  type StudentFullProfile,
  type UpcomingSessionDetail
} from "./data";
import type { Student, FeePayment, Match, Tournament, PlayerPerformance } from "@crick-academy/types";

export interface StudentTournamentContribution {
  teamName: string;
  teamShortName: string;
  teamColor: string;
  roleInTeam: string; // e.g. "Team Captain", "Vice Captain", "Lead All-Rounder", "Opening Bowler"
  isCaptain: boolean;
  isViceCaptain: boolean;
  teammatesCount: number;
  matchesPlayedInTournament: number;
  teamMatchesWon: number;
  teamMatchesLost: number;
  standoutPerformances: {
    matchId: string;
    opponent: string;
    stage: string;
    date: string;
    runs: number;
    wickets: number;
    catches: number;
    ballsFaced?: number | null;
    oversBowled?: number | null;
    runsConceded?: number | null;
    notes?: string | null;
    isMotm: boolean;
    title: string;
  }[];
  currentStanding: {
    rank: number;
    points: number;
    netRunRate: string;
    status: string;
  };
  upcomingFixture?: {
    opponent: string;
    date: string;
    venue: string;
    stage: string;
  };
}

export interface StudentCareerSummary {
  totalRuns: number;
  highestScore: number;
  fifties: number;
  innings: number;
  ballsFaced: number;
  strikeRate: number;
  totalWickets: number;
  oversBowled: number;
  runsConceded: number;
  economy: number;
  bestBowling: string;
  totalCatches: number;
  matchesPlayed: number;
  motmAwards: number;
  winRate: number;
}

export interface StudentPortalSession extends UpcomingSessionDetail {
  isRegistered: boolean;
  isPaid: boolean;
  coachName: string;
  focusArea: string;
  pitchType: string;
}

export interface StudentPortalData {
  student: StudentFullProfile;
  careerSummary: StudentCareerSummary;
  tournamentContribution: StudentTournamentContribution;
  sessions: StudentPortalSession[];
  pendingFeesTotal: number;
  lastFeePaidDate?: string;
}

// ---------------------------------------------------------------------------
// 1. GET FULL PORTAL DATA FOR A GIVEN STUDENT
// ---------------------------------------------------------------------------
export function getStudentPortalData(studentId: string): StudentPortalData | null {
  const student = SEED_STUDENTS.find((s) => s.id === studentId);
  if (!student) return null;

  const fees = SEED_FEES.filter((f) => f.studentId === studentId).sort(
    (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  );

  const studentPerfs = SEED_PERFORMANCES.filter((p) => p.studentId === studentId);

  const performancesWithMatches = studentPerfs.map((perf) => {
    const match = SEED_MATCHES.find((m) => m.id === perf.matchId) || {
      id: perf.matchId,
      tournamentId: "tourn_summer_cup_2026",
      opponent: "Opponent XI",
      date: "2026-06-15T09:00:00.000Z",
      result: "WON"
    };
    const tournament =
      SEED_TOURNAMENTS.find((t) => t.id === match.tournamentId) || SEED_TOURNAMENTS[0];
    return {
      ...perf,
      match: {
        ...match,
        tournament
      }
    };
  });

  const totalRuns = studentPerfs.reduce((acc, p) => acc + (p.runs || 0), 0);
  const totalWickets = studentPerfs.reduce((acc, p) => acc + (p.wickets || 0), 0);
  const totalCatches = studentPerfs.reduce((acc, p) => acc + (p.catches || 0), 0);
  const matchesPlayed = studentPerfs.length;
  const pendingFees = fees.filter((f) => f.status === "OVERDUE" || f.status === "UNPAID");
  const pendingFeesTotal = pendingFees.reduce((acc, f) => acc + f.amount, 0);

  const paidFees = fees.filter((f) => f.status === "PAID" && f.paidOn);
  const lastFeePaidDate = paidFees.length > 0 && paidFees[0]?.paidOn ? new Date(paidFees[0].paidOn).toISOString() : undefined;

  // Career calculations
  const highestScore = studentPerfs.reduce((max, p) => Math.max(max, p.runs || 0), 0);
  const fifties = studentPerfs.filter((p) => (p.runs || 0) >= 50).length;
  const ballsFaced = studentPerfs.reduce((acc, p) => acc + (p.ballsFaced || (p.runs ? Math.round(p.runs * 0.8) : 0)), 0);
  const strikeRate = ballsFaced > 0 ? Math.round((totalRuns / ballsFaced) * 1000) / 10 : 120.0;

  const oversBowled = studentPerfs.reduce((acc, p) => acc + (p.oversBowled || (p.wickets ? 3 : 0)), 0);
  const runsConceded = studentPerfs.reduce((acc, p) => acc + (p.runsConceded || (p.wickets ? p.wickets * 12 : 0)), 0);
  const economy = oversBowled > 0 ? Math.round((runsConceded / oversBowled) * 10) / 10 : 6.5;

  let bestWickets = 0;
  let bestRunsConceded = 999;
  studentPerfs.forEach((p) => {
    if ((p.wickets || 0) > bestWickets) {
      bestWickets = p.wickets || 0;
      bestRunsConceded = p.runsConceded || 20;
    } else if ((p.wickets || 0) === bestWickets && (p.runsConceded || 999) < bestRunsConceded && bestWickets > 0) {
      bestRunsConceded = p.runsConceded || 20;
    }
  });

  const bestBowling = bestWickets > 0 ? `${bestWickets}/${bestRunsConceded}` : "-";

  // Calculate matches won where this student played
  const matchesWonCount = performancesWithMatches.filter((p) => p.match.result === "WON").length;
  const winRate = matchesPlayed > 0 ? Math.round((matchesWonCount / matchesPlayed) * 100) : 100;

  // MOTM awards
  const motmAwards = SEED_MATCHES.filter((m) => m.playerOfTheMatchId === studentId).length;

  const fullStudentProfile: StudentFullProfile = {
    ...student,
    age: calculateAge(student.dateOfBirth),
    totalRuns,
    totalWickets,
    matchesPlayed,
    pendingFeesCount: pendingFees.length,
    fees,
    performances: performancesWithMatches
  };

  const careerSummary: StudentCareerSummary = {
    totalRuns,
    highestScore,
    fifties,
    innings: matchesPlayed,
    ballsFaced,
    strikeRate,
    totalWickets,
    oversBowled,
    runsConceded,
    economy,
    bestBowling,
    totalCatches,
    matchesPlayed,
    motmAwards,
    winRate
  };

  // Tournament Contribution & Team
  const tournamentContribution = getStudentTournamentContribution(studentId);

  // Net sessions
  const sessions = getStudentPortalSessions(studentId);

  return {
    student: fullStudentProfile,
    careerSummary,
    tournamentContribution,
    sessions,
    pendingFeesTotal,
    lastFeePaidDate
  };
}

// ---------------------------------------------------------------------------
// 2. GET STUDENT TOURNAMENT CONTRIBUTION
// ---------------------------------------------------------------------------
export function getStudentTournamentContribution(studentId: string): StudentTournamentContribution {
  // Find which team student belongs to
  const team = ACADEMY_TEAMS.find((t) => t.playerIds.includes(studentId)) || {
    name: "Thunderbolts XI",
    shortName: "THU",
    color: "#0B3D2E",
    captainId: "stud_aarav_sharma",
    viceCaptainId: "stud_devendra_rao",
    playerIds: ["stud_aarav_sharma"]
  };

  const isCaptain = team.captainId === studentId;
  const isViceCaptain = team.viceCaptainId === studentId;

  let roleInTeam = "Squad All-Rounder";
  if (isCaptain) {
    roleInTeam = "Team Captain 🎖️";
  } else if (isViceCaptain) {
    roleInTeam = "Vice-Captain ⭐";
  } else {
    const student = SEED_STUDENTS.find((s) => s.id === studentId);
    if (student?.bowlingStyle && student.bowlingStyle !== "NONE") {
      roleInTeam = student.battingStyle === "LEFT_HAND" ? "Left-Arm Specialist" : "Pace / Spin Bowler";
    } else {
      roleInTeam = "Top-Order Batsman";
    }
  }

  // Find standout performances for this student
  const studentPerfs = SEED_PERFORMANCES.filter((p) => p.studentId === studentId);
  const standoutPerformances = studentPerfs.map((p) => {
    const match = SEED_MATCHES.find((m) => m.id === p.matchId);
    const isMotm = match?.playerOfTheMatchId === studentId;
    let title = `${p.runs} runs`;
    if (p.wickets && p.wickets > 0) {
      title += ` & ${p.wickets} wickets`;
    }
    if (isMotm) {
      title = `🏆 Player of the Match: ${title}`;
    }

    return {
      matchId: p.matchId,
      opponent: match?.opponent || "Rival XI",
      stage: match?.stage || "Tournament Match",
      date: match?.date ? new Date(match.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "June 2026",
      runs: p.runs || 0,
      wickets: p.wickets || 0,
      catches: p.catches || 0,
      ballsFaced: p.ballsFaced,
      oversBowled: p.oversBowled,
      runsConceded: p.runsConceded,
      notes: p.notes || undefined,
      isMotm,
      title
    };
  });

  // Calculate team wins / matches
  const teamMatches = SEED_MATCHES.filter(
    (m) => m.homeTeamName === team.name || m.awayTeamName === team.name
  );
  const teamMatchesWon = teamMatches.filter((m) => m.result === "WON" && (m.homeTeamName === team.name || m.awayScore)).length || 2;
  const teamMatchesLost = teamMatches.filter((m) => m.result === "LOST").length || 0;

  // Next fixture
  const upcomingMatch = SEED_MATCHES.find(
    (m) => m.result === "PENDING" && (m.homeTeamName === team.name || m.awayTeamName === team.name)
  );

  return {
    teamName: team.name,
    teamShortName: team.shortName,
    teamColor: team.color,
    roleInTeam,
    isCaptain,
    isViceCaptain,
    teammatesCount: team.playerIds.length,
    matchesPlayedInTournament: studentPerfs.length,
    teamMatchesWon,
    teamMatchesLost,
    standoutPerformances,
    currentStanding: {
      rank: 1,
      points: 6,
      netRunRate: "+1.425",
      status: "Qualified for Super 4 Stage"
    },
    upcomingFixture: upcomingMatch
      ? {
          opponent: upcomingMatch.homeTeamName === team.name ? upcomingMatch.awayTeamName || "Strikers XI" : upcomingMatch.homeTeamName || "Opponent XI",
          date: new Date(upcomingMatch.date).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
          }),
          venue: upcomingMatch.venue || "Main Oval Turf Arena",
          stage: upcomingMatch.stage || "League Stage"
        }
      : undefined
  };
}

// ---------------------------------------------------------------------------
// 3. GET NET SESSIONS FOR STUDENT
// ---------------------------------------------------------------------------
export function getStudentPortalSessions(studentId: string): StudentPortalSession[] {
  const coachMap: Record<string, { coach: string; focus: string; pitch: string }> = {
    session_20260902_morning: {
      coach: "Coach Vikram Rathour (Ex-Ranji Trophy)",
      focus: "Pace Bowling Technique & Slip Catching Reflexes",
      pitch: "Turf Pitch #1 (Fast & Bouncy)"
    },
    session_20260905_evening: {
      coach: "Coach Rajesh Sharma (Level 3 High Performance)",
      focus: "Spin Variations, Drift Control & Power Hitting in Death Overs",
      pitch: "Astro Net #3 (Turn & Grip)"
    }
  };

  const extraSessions: StudentPortalSession[] = [
    {
      id: "session_20260908_morning",
      date: "2026-09-08T06:30:00.000Z",
      time: "06:30 AM - 08:30 AM",
      capacity: 12,
      feeAmount: 300,
      registeredCount: 9,
      registeredStudents: [],
      isRegistered: false,
      isPaid: false,
      coachName: "Coach Vikram Rathour",
      focusArea: "Match Simulation: Setting Fields & Chasing 8 RPO Targets",
      pitchType: "Main Turf Match Strip"
    },
    {
      id: "session_20260912_weekend",
      date: "2026-09-12T07:00:00.000Z",
      time: "07:00 AM - 09:30 AM",
      capacity: 14,
      feeAmount: 350,
      registeredCount: 6,
      registeredStudents: [],
      isRegistered: false,
      isPaid: false,
      coachName: "Coach Amit Mishra & Fitness Trainer",
      focusArea: "High Catching, Direct Hit Drills & High-Intensity Conditioning",
      pitchType: "Outdoor Practice Ground A"
    }
  ];

  const baseSessions: StudentPortalSession[] = SEED_SESSIONS.map((sess) => {
    const regEntry = sess.registeredStudents.find((r) => r.student.id === studentId);
    const meta = coachMap[sess.id] || {
      coach: "Senior Academy Coach",
      focus: "Specialist Skills & Batting Form",
      pitch: "Turf Pitch"
    };

    return {
      ...sess,
      isRegistered: !!regEntry,
      isPaid: regEntry ? regEntry.paid : false,
      coachName: meta.coach,
      focusArea: meta.focus,
      pitchType: meta.pitch
    };
  });

  return [...baseSessions, ...extraSessions];
}

// ---------------------------------------------------------------------------
// 4. GROUPED STUDENTS FOR ROLE SWITCHER
// ---------------------------------------------------------------------------
export function getAllStudentsGrouped() {
  const morning = SEED_STUDENTS.filter((s) => s.batch === "Morning Batch");
  const evening = SEED_STUDENTS.filter((s) => s.batch === "Evening Batch");
  const weekend = SEED_STUDENTS.filter((s) => s.batch === "Weekend Batch");

  return [
    { batchName: "Morning Batch (Elite Senior)", students: morning },
    { batchName: "Evening Batch (Junior Squad)", students: evening },
    { batchName: "Weekend Batch (Development Squad)", students: weekend }
  ];
}
