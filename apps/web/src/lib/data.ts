import type {
  Student,
  StudentWithStats,
  FeePayment,
  PaymentStatus,
  NetSession,
  Tournament,
  TournamentStatus,
  Match,
  MatchResult,
  PlayerPerformance,
  TournamentTeam,
  TournamentFixture,
  TournamentDetailed
} from "@crick-academy/types";

export interface StudentFullProfile extends StudentWithStats {
  fees: FeePayment[];
  performances: (PlayerPerformance & {
    match: Match & { tournament: Tournament };
  })[];
  age: number;
}

export interface UpcomingSessionDetail extends NetSession {
  registeredCount: number;
  registeredStudents: {
    student: Student;
    paid: boolean;
  }[];
}

export interface FeeWithStudent extends FeePayment {
  studentName: string;
  studentBatch: string;
  studentPhone: string;
  guardianPhone: string;
}

export interface LeaderboardItemRuns {
  rank: number;
  student: Student;
  teamName: string;
  teamColor: string;
  matches: number;
  innings: number;
  runs: number;
  highestScore: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  notOuts: number;
  isLeader: boolean;
}

export interface LeaderboardItemWickets {
  rank: number;
  student: Student;
  teamName: string;
  teamColor: string;
  matches: number;
  overs: number;
  wickets: number;
  runsConceded: number;
  bestFigures: string;
  economy: number;
  isLeader: boolean;
}

export interface LeaderboardItemCatches {
  rank: number;
  student: Student;
  teamName: string;
  teamColor: string;
  matches: number;
  catches: number;
  stumpings: number;
  runOuts: number;
  isLeader: boolean;
}

export interface TournamentLeaderboardData {
  topRunScorer: LeaderboardItemRuns | null;
  topWicketTaker: LeaderboardItemWickets | null;
  bestCatcher: LeaderboardItemCatches | null;
  batting: LeaderboardItemRuns[];
  bowling: LeaderboardItemWickets[];
  fielding: LeaderboardItemCatches[];
}

// ---------------------------------------------------------------------------
// 1. STUDENTS (18 Students across 3 Batches)
// ---------------------------------------------------------------------------
export const SEED_STUDENTS: Student[] = [
  // --- Morning Batch (6 Students) ---
  {
    id: "stud_aarav_sharma",
    name: "Aarav Sharma",
    dateOfBirth: "2010-04-14T00:00:00.000Z",
    phone: "+91 98201 44101",
    guardianPhone: "+91 98201 44100",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_FAST",
    joinedDate: "2024-01-15T00:00:00.000Z",
    batch: "Morning Batch"
  },
  {
    id: "stud_rohan_varma",
    name: "Rohan Varma",
    dateOfBirth: "2011-06-20T00:00:00.000Z",
    phone: "+91 98201 55202",
    guardianPhone: "+91 98201 55200",
    battingStyle: "LEFT_HAND",
    bowlingStyle: "RIGHT_ARM_SPIN_OFF",
    joinedDate: "2024-03-01T00:00:00.000Z",
    batch: "Morning Batch"
  },
  {
    id: "stud_devendra_rao",
    name: "Devendra Rao",
    dateOfBirth: "2009-02-18T00:00:00.000Z",
    phone: "+91 98201 66303",
    guardianPhone: "+91 98201 66300",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "LEFT_ARM_SPIN_ORTHODOX",
    joinedDate: "2023-09-12T00:00:00.000Z",
    batch: "Morning Batch"
  },
  {
    id: "stud_yashodhan_kulkarni",
    name: "Yashodhan Kulkarni",
    dateOfBirth: "2010-08-11T00:00:00.000Z",
    phone: "+91 98201 77404",
    guardianPhone: "+91 98201 77400",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_FAST",
    joinedDate: "2024-05-10T00:00:00.000Z",
    batch: "Morning Batch"
  },
  {
    id: "stud_ishaan_nair",
    name: "Ishaan Nair",
    dateOfBirth: "2012-01-25T00:00:00.000Z",
    phone: "+91 98201 88505",
    guardianPhone: "+91 98201 88500",
    battingStyle: "LEFT_HAND",
    bowlingStyle: "NONE",
    joinedDate: "2024-07-20T00:00:00.000Z",
    batch: "Morning Batch"
  },
  {
    id: "stud_dhruv_patel",
    name: "Dhruv Patel",
    dateOfBirth: "2011-10-03T00:00:00.000Z",
    phone: "+91 98201 99606",
    guardianPhone: "+91 98201 99600",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_MEDIUM",
    joinedDate: "2024-02-14T00:00:00.000Z",
    batch: "Morning Batch"
  },

  // --- Evening Batch (6 Students) ---
  {
    id: "stud_kabir_singh",
    name: "Kabir Singh",
    dateOfBirth: "2013-05-12T00:00:00.000Z",
    phone: "+91 98331 11707",
    guardianPhone: "+91 98331 11700",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "NONE",
    joinedDate: "2025-06-10T00:00:00.000Z",
    batch: "Evening Batch"
  },
  {
    id: "stud_vihaan_deshmukh",
    name: "Vihaan Deshmukh",
    dateOfBirth: "2014-03-19T00:00:00.000Z",
    phone: "+91 98331 22808",
    guardianPhone: "+91 98331 22800",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_SPIN_LEG",
    joinedDate: "2025-04-05T00:00:00.000Z",
    batch: "Evening Batch"
  },
  {
    id: "stud_reyansh_iyer",
    name: "Reyansh Iyer",
    dateOfBirth: "2012-09-28T00:00:00.000Z",
    phone: "+91 98331 33909",
    guardianPhone: "+91 98331 33900",
    battingStyle: "LEFT_HAND",
    bowlingStyle: "LEFT_ARM_MEDIUM",
    joinedDate: "2025-01-15T00:00:00.000Z",
    batch: "Evening Batch"
  },
  {
    id: "stud_advait_chatterjee",
    name: "Advait Chatterjee",
    dateOfBirth: "2015-07-14T00:00:00.000Z",
    phone: "+91 98331 44010",
    guardianPhone: "+91 98331 44000",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_SPIN_OFF",
    joinedDate: "2025-08-01T00:00:00.000Z",
    batch: "Evening Batch"
  },
  {
    id: "stud_samar_sen",
    name: "Samar Sen",
    dateOfBirth: "2013-11-22T00:00:00.000Z",
    phone: "+91 98331 55111",
    guardianPhone: "+91 98331 55100",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_FAST",
    joinedDate: "2025-03-10T00:00:00.000Z",
    batch: "Evening Batch"
  },
  {
    id: "stud_tanmay_joshi",
    name: "Tanmay Joshi",
    dateOfBirth: "2016-04-08T00:00:00.000Z",
    phone: "+91 98331 66212",
    guardianPhone: "+91 98331 66200",
    battingStyle: "LEFT_HAND",
    bowlingStyle: "NONE",
    joinedDate: "2025-09-01T00:00:00.000Z",
    batch: "Evening Batch"
  },

  // --- Weekend Batch (6 Students) ---
  {
    id: "stud_aditya_patil",
    name: "Aditya Patil",
    dateOfBirth: "2009-09-15T00:00:00.000Z",
    phone: "+91 98700 11313",
    guardianPhone: "+91 98700 11300",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_MEDIUM",
    joinedDate: "2024-04-12T00:00:00.000Z",
    batch: "Weekend Batch"
  },
  {
    id: "stud_pranav_mukhopadhyay",
    name: "Pranav Mukhopadhyay",
    dateOfBirth: "2010-03-30T00:00:00.000Z",
    phone: "+91 98700 22414",
    guardianPhone: "+91 98700 22400",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "LEFT_ARM_FAST",
    joinedDate: "2024-08-20T00:00:00.000Z",
    batch: "Weekend Batch"
  },
  {
    id: "stud_aniket_bhat",
    name: "Aniket Bhat",
    dateOfBirth: "2011-12-05T00:00:00.000Z",
    phone: "+91 98700 33515",
    guardianPhone: "+91 98700 33500",
    battingStyle: "LEFT_HAND",
    bowlingStyle: "LEFT_ARM_SPIN_CHINAMAN",
    joinedDate: "2024-11-01T00:00:00.000Z",
    batch: "Weekend Batch"
  },
  {
    id: "stud_shaurya_gupta",
    name: "Shaurya Gupta",
    dateOfBirth: "2012-04-17T00:00:00.000Z",
    phone: "+91 98700 44616",
    guardianPhone: "+91 98700 44600",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_SPIN_LEG",
    joinedDate: "2025-02-18T00:00:00.000Z",
    batch: "Weekend Batch"
  },
  {
    id: "stud_siddharth_menon",
    name: "Siddharth Menon",
    dateOfBirth: "2014-08-24T00:00:00.000Z",
    phone: "+91 98700 55717",
    guardianPhone: "+91 98700 55700",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "NONE",
    joinedDate: "2025-05-15T00:00:00.000Z",
    batch: "Weekend Batch"
  },
  {
    id: "stud_manan_trivedi",
    name: "Manan Trivedi",
    dateOfBirth: "2016-02-10T00:00:00.000Z",
    phone: "+91 98700 66818",
    guardianPhone: "+91 98700 66800",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "RIGHT_ARM_MEDIUM",
    joinedDate: "2026-01-10T00:00:00.000Z",
    batch: "Weekend Batch"
  }
];

// ---------------------------------------------------------------------------
// 2. FEE PAYMENTS (54 Records for June, July, August 2026 - ₹1500 / month)
// ---------------------------------------------------------------------------
export const SEED_FEES: FeePayment[] = [
  // 1. Aarav Sharma
  { id: "fee_aarav_jun", studentId: "stud_aarav_sharma", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-03T10:15:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260603/9820144101", type: "MONTHLY" },
  { id: "fee_aarav_jul", studentId: "stud_aarav_sharma", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-02T14:20:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260702/9820144101", type: "MONTHLY" },
  { id: "fee_aarav_aug", studentId: "stud_aarav_sharma", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-04T09:45:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260804/9820144101", type: "MONTHLY" },

  // 2. Rohan Varma
  { id: "fee_rohan_jun", studentId: "stud_rohan_varma", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-05T11:30:00.000Z", method: "BANK_TRANSFER", proofUrl: "NEFT/HDFC/20260605/881920", type: "MONTHLY" },
  { id: "fee_rohan_jul", studentId: "stud_rohan_varma", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-04T16:00:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260704/552021", type: "MONTHLY" },
  { id: "fee_rohan_aug", studentId: "stud_rohan_varma", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-05T12:10:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260805/552022", type: "MONTHLY" },

  // 3. Yashodhan Kulkarni
  { id: "fee_yash_jun", studentId: "stud_yashodhan_kulkarni", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-04T18:00:00.000Z", method: "CASH", proofUrl: "REC-2026-06-044", type: "MONTHLY" },
  { id: "fee_yash_jul", studentId: "stud_yashodhan_kulkarni", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-03T17:30:00.000Z", method: "UPI", proofUrl: "UPI/Paytm/20260703/774041", type: "MONTHLY" },
  { id: "fee_yash_aug", studentId: "stud_yashodhan_kulkarni", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-03T18:15:00.000Z", method: "UPI", proofUrl: "UPI/Paytm/20260803/774042", type: "MONTHLY" },

  // 4. Ishaan Nair
  { id: "fee_ishaan_jun", studentId: "stud_ishaan_nair", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-01T10:00:00.000Z", method: "CARD", proofUrl: "POS/VISA/20260601/399182", type: "MONTHLY" },
  { id: "fee_ishaan_jul", studentId: "stud_ishaan_nair", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-01T09:30:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260701/885051", type: "MONTHLY" },
  { id: "fee_ishaan_aug", studentId: "stud_ishaan_nair", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-02T11:20:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260802/885052", type: "MONTHLY" },

  // 5. Vihaan Deshmukh
  { id: "fee_vihaan_jun", studentId: "stud_vihaan_deshmukh", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-05T15:40:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260605/228081", type: "MONTHLY" },
  { id: "fee_vihaan_jul", studentId: "stud_vihaan_deshmukh", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-05T13:10:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260705/228082", type: "MONTHLY" },
  { id: "fee_vihaan_aug", studentId: "stud_vihaan_deshmukh", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-04T16:50:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260804/228083", type: "MONTHLY" },

  // 6. Reyansh Iyer
  { id: "fee_reyansh_jun", studentId: "stud_reyansh_iyer", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-02T11:00:00.000Z", method: "BANK_TRANSFER", proofUrl: "IMPS/ICICI/20260602/990182", type: "MONTHLY" },
  { id: "fee_reyansh_jul", studentId: "stud_reyansh_iyer", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-03T10:15:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260703/339091", type: "MONTHLY" },
  { id: "fee_reyansh_aug", studentId: "stud_reyansh_iyer", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-05T14:40:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260805/339092", type: "MONTHLY" },

  // 7. Aditya Patil
  { id: "fee_aditya_jun", studentId: "stud_aditya_patil", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-04T12:00:00.000Z", method: "CASH", proofUrl: "REC-2026-06-089", type: "MONTHLY" },
  { id: "fee_aditya_jul", studentId: "stud_aditya_patil", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-04T17:25:00.000Z", method: "UPI", proofUrl: "UPI/BHIM/20260704/113131", type: "MONTHLY" },
  { id: "fee_aditya_aug", studentId: "stud_aditya_patil", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-01T10:30:00.000Z", method: "UPI", proofUrl: "UPI/BHIM/20260801/113132", type: "MONTHLY" },

  // 8. Pranav Mukhopadhyay
  { id: "fee_pranav_jun", studentId: "stud_pranav_mukhopadhyay", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-03T16:20:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260603/224141", type: "MONTHLY" },
  { id: "fee_pranav_jul", studentId: "stud_pranav_mukhopadhyay", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-05T19:00:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260705/224142", type: "MONTHLY" },
  { id: "fee_pranav_aug", studentId: "stud_pranav_mukhopadhyay", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-03T11:45:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260803/224143", type: "MONTHLY" },

  // 9. Siddharth Menon
  { id: "fee_sid_jun", studentId: "stud_siddharth_menon", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-06T12:00:00.000Z", method: "CHEQUE", proofUrl: "CHQ/SBIN/491024", type: "MONTHLY" },
  { id: "fee_sid_jul", studentId: "stud_siddharth_menon", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-02T15:10:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260702/557171", type: "MONTHLY" },
  { id: "fee_sid_aug", studentId: "stud_siddharth_menon", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "PAID", paidOn: "2026-08-04T17:00:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260804/557172", type: "MONTHLY" },

  // 10. Devendra Rao (Aug Unpaid)
  { id: "fee_dev_jun", studentId: "stud_devendra_rao", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-04T09:15:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260604/663031", type: "MONTHLY" },
  { id: "fee_dev_jul", studentId: "stud_devendra_rao", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-05T11:00:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260705/663032", type: "MONTHLY" },
  { id: "fee_dev_aug", studentId: "stud_devendra_rao", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "UNPAID", type: "MONTHLY" },

  // 11. Kabir Singh (Aug Unpaid)
  { id: "fee_kabir_jun", studentId: "stud_kabir_singh", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-05T14:30:00.000Z", method: "CASH", proofUrl: "REC-2026-06-112", type: "MONTHLY" },
  { id: "fee_kabir_jul", studentId: "stud_kabir_singh", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-03T16:45:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260703/117071", type: "MONTHLY" },
  { id: "fee_kabir_aug", studentId: "stud_kabir_singh", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "UNPAID", type: "MONTHLY" },

  // 12. Advait Chatterjee (Aug Unpaid)
  { id: "fee_advait_jun", studentId: "stud_advait_chatterjee", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-02T13:10:00.000Z", method: "UPI", proofUrl: "UPI/Paytm/20260602/440101", type: "MONTHLY" },
  { id: "fee_advait_jul", studentId: "stud_advait_chatterjee", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-04T18:20:00.000Z", method: "UPI", proofUrl: "UPI/Paytm/20260704/440102", type: "MONTHLY" },
  { id: "fee_advait_aug", studentId: "stud_advait_chatterjee", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "UNPAID", type: "MONTHLY" },

  // 13. Aniket Bhat (Aug Unpaid)
  { id: "fee_aniket_jun", studentId: "stud_aniket_bhat", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-04T10:00:00.000Z", method: "BANK_TRANSFER", proofUrl: "NEFT/AXIS/20260604/449102", type: "MONTHLY" },
  { id: "fee_aniket_jul", studentId: "stud_aniket_bhat", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "PAID", paidOn: "2026-07-05T12:30:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260705/335151", type: "MONTHLY" },
  { id: "fee_aniket_aug", studentId: "stud_aniket_bhat", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "UNPAID", type: "MONTHLY" },

  // 14. Dhruv Patel (Jul & Aug Overdue)
  { id: "fee_dhruv_jun", studentId: "stud_dhruv_patel", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-05T16:00:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260605/996061", type: "MONTHLY" },
  { id: "fee_dhruv_jul", studentId: "stud_dhruv_patel", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },
  { id: "fee_dhruv_aug", studentId: "stud_dhruv_patel", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },

  // 15. Samar Sen (Jul & Aug Overdue)
  { id: "fee_samar_jun", studentId: "stud_samar_sen", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-03T11:20:00.000Z", method: "CASH", proofUrl: "REC-2026-06-078", type: "MONTHLY" },
  { id: "fee_samar_jul", studentId: "stud_samar_sen", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },
  { id: "fee_samar_aug", studentId: "stud_samar_sen", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },

  // 16. Shaurya Gupta (Jul & Aug Overdue)
  { id: "fee_shaurya_jun", studentId: "stud_shaurya_gupta", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "PAID", paidOn: "2026-06-01T15:10:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260601/446161", type: "MONTHLY" },
  { id: "fee_shaurya_jul", studentId: "stud_shaurya_gupta", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },
  { id: "fee_shaurya_aug", studentId: "stud_shaurya_gupta", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },

  // 17. Tanmay Joshi (All 3 Months Overdue)
  { id: "fee_tanmay_jun", studentId: "stud_tanmay_joshi", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },
  { id: "fee_tanmay_jul", studentId: "stud_tanmay_joshi", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },
  { id: "fee_tanmay_aug", studentId: "stud_tanmay_joshi", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },

  // 18. Manan Trivedi (Jun & Jul Overdue, Aug Unpaid)
  { id: "fee_manan_jun", studentId: "stud_manan_trivedi", amount: 1500, dueDate: "2026-06-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },
  { id: "fee_manan_jul", studentId: "stud_manan_trivedi", amount: 1500, dueDate: "2026-07-05T23:59:59.000Z", status: "OVERDUE", type: "MONTHLY" },
  { id: "fee_manan_aug", studentId: "stud_manan_trivedi", amount: 1500, dueDate: "2026-08-05T23:59:59.000Z", status: "UNPAID", type: "MONTHLY" }
];

// ---------------------------------------------------------------------------
// 3. UPCOMING NET SESSIONS & REGISTRATIONS
// ---------------------------------------------------------------------------
export const SEED_SESSIONS: UpcomingSessionDetail[] = [
  {
    id: "session_20260902_morning",
    date: "2026-09-02T06:30:00.000Z",
    time: "06:30 AM - 08:30 AM",
    capacity: 12,
    feeAmount: 250,
    registeredCount: 8,
    registeredStudents: [
      { student: SEED_STUDENTS.find(s => s.id === "stud_aarav_sharma")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_rohan_varma")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_devendra_rao")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_yashodhan_kulkarni")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_ishaan_nair")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_dhruv_patel")!, paid: false },
      { student: SEED_STUDENTS.find(s => s.id === "stud_kabir_singh")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_vihaan_deshmukh")!, paid: false }
    ]
  },
  {
    id: "session_20260905_evening",
    date: "2026-09-05T16:30:00.000Z",
    time: "04:30 PM - 06:30 PM",
    capacity: 12,
    feeAmount: 300,
    registeredCount: 5,
    registeredStudents: [
      { student: SEED_STUDENTS.find(s => s.id === "stud_aditya_patil")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_pranav_mukhopadhyay")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_aniket_bhat")!, paid: true },
      { student: SEED_STUDENTS.find(s => s.id === "stud_shaurya_gupta")!, paid: false },
      { student: SEED_STUDENTS.find(s => s.id === "stud_reyansh_iyer")!, paid: true }
    ]
  }
];

// ---------------------------------------------------------------------------
// 4. TOURNAMENTS, TEAMS, MATCHES & PLAYER PERFORMANCE STATS
// ---------------------------------------------------------------------------
export const SEED_TOURNAMENTS: Tournament[] = [
  {
    id: "tourn_monsoon_league_2026",
    name: "Monsoon Super League 2026",
    startDate: "2026-08-24T09:00:00.000Z",
    endDate: "2026-09-08T18:00:00.000Z",
    status: "ONGOING",
    format: "15-Overs Super League",
    location: "North Pavilion Ground",
    description: "Fast-paced limited-overs intra-academy league testing aggressive powerplay batting and death-overs execution under challenging conditions.",
    championTeam: null
  },
  {
    id: "tourn_summer_cup_2026",
    name: "Summer Cup 2026",
    startDate: "2026-06-15T09:00:00.000Z",
    endDate: "2026-06-22T18:00:00.000Z",
    status: "COMPLETED",
    format: "T20 Knockout Championship",
    location: "Main Oval Turf Arena",
    description: "Premier annual tournament bringing together all batches in high-octane 20-over knockout action.",
    championTeam: "Thunderbolts XI",
    runnerUpTeam: "Titans XI"
  },
  {
    id: "tourn_autumn_championship_2026",
    name: "Junior Autumn Championship 2026",
    startDate: "2026-09-18T09:00:00.000Z",
    endDate: "2026-09-28T18:00:00.000Z",
    status: "UPCOMING",
    format: "T20 Youth League",
    location: "South Campus Stadium",
    description: "Upcoming youth development championship focusing on match tactical awareness, captaincy, and floodlight fielding discipline.",
    championTeam: null
  }
];

export const SEED_TOURNAMENT = SEED_TOURNAMENTS[1]; // Backward-compatibility

// Base team definitions shared across tournaments
export const ACADEMY_TEAMS = [
  {
    name: "Thunderbolts XI",
    shortName: "THU",
    color: "#0B3D2E", // Pitch Green
    captainId: "stud_aarav_sharma",
    viceCaptainId: "stud_devendra_rao",
    playerIds: [
      "stud_aarav_sharma",
      "stud_devendra_rao",
      "stud_ishaan_nair",
      "stud_samar_sen",
      "stud_manan_trivedi"
    ]
  },
  {
    name: "Titans XI",
    shortName: "TIT",
    color: "#D97706", // Amber / Gold
    captainId: "stud_yashodhan_kulkarni",
    viceCaptainId: "stud_kabir_singh",
    playerIds: [
      "stud_yashodhan_kulkarni",
      "stud_kabir_singh",
      "stud_aditya_patil",
      "stud_advait_chatterjee",
      "stud_shaurya_gupta"
    ]
  },
  {
    name: "Strikers XI",
    shortName: "STR",
    color: "#C1121F", // Leather Red
    captainId: "stud_rohan_varma",
    viceCaptainId: "stud_vihaan_deshmukh",
    playerIds: [
      "stud_rohan_varma",
      "stud_vihaan_deshmukh",
      "stud_pranav_mukhopadhyay",
      "stud_tanmay_joshi"
    ]
  },
  {
    name: "Warriors XI",
    shortName: "WAR",
    color: "#2563EB", // Royal Blue
    captainId: "stud_dhruv_patel",
    viceCaptainId: "stud_reyansh_iyer",
    playerIds: [
      "stud_dhruv_patel",
      "stud_reyansh_iyer",
      "stud_aniket_bhat",
      "stud_siddharth_menon"
    ]
  }
];

export const SEED_MATCHES: Match[] = [
  // --- Summer Cup 2026 (Completed) ---
  {
    id: "match_summer_sf1",
    tournamentId: "tourn_summer_cup_2026",
    opponent: "Strikers XI",
    homeTeamName: "Thunderbolts XI",
    awayTeamName: "Strikers XI",
    stage: "Semi-Final 1",
    date: "2026-06-16T09:30:00.000Z",
    venue: "Main Oval Turf Arena",
    result: "WON",
    homeScore: "164/5 (20.0 ov)",
    awayScore: "142/8 (20.0 ov)",
    summary: "Thunderbolts XI won by 22 runs",
    playerOfTheMatchId: "stud_devendra_rao"
  },
  {
    id: "match_summer_sf2",
    tournamentId: "tourn_summer_cup_2026",
    opponent: "Warriors XI",
    homeTeamName: "Titans XI",
    awayTeamName: "Warriors XI",
    stage: "Semi-Final 2",
    date: "2026-06-18T09:30:00.000Z",
    venue: "Main Oval Turf Arena",
    result: "WON",
    homeScore: "158/6 (19.2 ov)",
    awayScore: "154/7 (20.0 ov)",
    summary: "Titans XI won by 4 wickets",
    playerOfTheMatchId: "stud_yashodhan_kulkarni"
  },
  {
    id: "match_summer_final",
    tournamentId: "tourn_summer_cup_2026",
    opponent: "Titans XI",
    homeTeamName: "Thunderbolts XI",
    awayTeamName: "Titans XI",
    stage: "Grand Final",
    date: "2026-06-21T14:00:00.000Z",
    venue: "Main Oval Turf Arena",
    result: "WON",
    homeScore: "178/4 (20.0 ov)",
    awayScore: "160/9 (20.0 ov)",
    summary: "Thunderbolts XI won by 18 runs",
    playerOfTheMatchId: "stud_aarav_sharma"
  },

  // --- Monsoon Super League 2026 (Ongoing) ---
  {
    id: "match_monsoon_1",
    tournamentId: "tourn_monsoon_league_2026",
    opponent: "Warriors XI",
    homeTeamName: "Thunderbolts XI",
    awayTeamName: "Warriors XI",
    stage: "League Round 1",
    date: "2026-08-26T09:30:00.000Z",
    venue: "North Pavilion Ground",
    result: "WON",
    homeScore: "132/3 (15.0 ov)",
    awayScore: "118/7 (15.0 ov)",
    summary: "Thunderbolts XI won by 14 runs",
    playerOfTheMatchId: "stud_aarav_sharma"
  },
  {
    id: "match_monsoon_2",
    tournamentId: "tourn_monsoon_league_2026",
    opponent: "Titans XI",
    homeTeamName: "Strikers XI",
    awayTeamName: "Titans XI",
    stage: "League Round 1",
    date: "2026-08-29T15:00:00.000Z",
    venue: "North Pavilion Ground",
    result: "WON",
    homeScore: "125/4 (14.2 ov)",
    awayScore: "124/6 (15.0 ov)",
    summary: "Strikers XI won by 6 wickets",
    playerOfTheMatchId: "stud_rohan_varma"
  },
  {
    id: "match_monsoon_3",
    tournamentId: "tourn_monsoon_league_2026",
    opponent: "Strikers XI",
    homeTeamName: "Thunderbolts XI",
    awayTeamName: "Strikers XI",
    stage: "League Round 2",
    date: "2026-09-03T15:30:00.000Z",
    venue: "North Pavilion Ground",
    result: "PENDING",
    summary: "Scheduled Match (Toss at 03:00 PM)"
  },
  {
    id: "match_monsoon_4",
    tournamentId: "tourn_monsoon_league_2026",
    opponent: "Warriors XI",
    homeTeamName: "Titans XI",
    awayTeamName: "Warriors XI",
    stage: "League Round 2",
    date: "2026-09-06T15:30:00.000Z",
    venue: "North Pavilion Ground",
    result: "PENDING",
    summary: "Scheduled Match (Toss at 03:00 PM)"
  },

  // --- Junior Autumn Championship 2026 (Upcoming) ---
  {
    id: "match_autumn_1",
    tournamentId: "tourn_autumn_championship_2026",
    opponent: "Titans XI",
    homeTeamName: "Thunderbolts XI",
    awayTeamName: "Titans XI",
    stage: "Round 1 Opening",
    date: "2026-09-19T09:30:00.000Z",
    venue: "South Campus Stadium",
    result: "PENDING",
    summary: "Scheduled Fixture"
  },
  {
    id: "match_autumn_2",
    tournamentId: "tourn_autumn_championship_2026",
    opponent: "Warriors XI",
    homeTeamName: "Strikers XI",
    awayTeamName: "Warriors XI",
    stage: "Round 1 Clash",
    date: "2026-09-20T09:30:00.000Z",
    venue: "South Campus Stadium",
    result: "PENDING",
    summary: "Scheduled Fixture"
  },
  {
    id: "match_autumn_final",
    tournamentId: "tourn_autumn_championship_2026",
    opponent: "Finalist TBD",
    homeTeamName: "Finalist 1",
    awayTeamName: "Finalist 2",
    stage: "Championship Final",
    date: "2026-09-28T14:00:00.000Z",
    venue: "Main Oval Turf Arena",
    result: "PENDING",
    summary: "Grand Final under floodlights"
  }
];

export const SEED_PERFORMANCES: PlayerPerformance[] = [
  // --- Summer Cup Semi-Final 1 ---
  { id: "p1", matchId: "match_summer_sf1", studentId: "stud_aarav_sharma", runs: 62, wickets: 1, catches: 1, oversBowled: 3, runsConceded: 18, ballsFaced: 41, notes: "Captain's knock: 62(41) with 7 fours and 2 sixes; took 1/18 in 3 overs" },
  { id: "p2", matchId: "match_summer_sf1", studentId: "stud_devendra_rao", runs: 14, wickets: 4, catches: 0, oversBowled: 4, runsConceded: 16, ballsFaced: 12, notes: "Match-winning spell: 4/16 in 4 overs (orthodox left-arm spin)" },
  { id: "p3", matchId: "match_summer_sf1", studentId: "stud_ishaan_nair", runs: 38, wickets: 0, catches: 2, ballsFaced: 29, notes: "Fluent 38(29); took 2 sharp catches inside the 30-yard circle" },
  { id: "p4", matchId: "match_summer_sf1", studentId: "stud_samar_sen", runs: 8, wickets: 2, catches: 1, oversBowled: 3.4, runsConceded: 24, ballsFaced: 6, notes: "Clutch death bowling: 2/24 in 3.4 overs" },
  { id: "p5", matchId: "match_summer_sf1", studentId: "stud_manan_trivedi", runs: 4, wickets: 0, catches: 0, ballsFaced: 3, notes: "Youngest player on field; 4*(3) at the death" },
  { id: "p6", matchId: "match_summer_sf1", studentId: "stud_rohan_varma", runs: 51, wickets: 1, catches: 0, oversBowled: 3, runsConceded: 28, ballsFaced: 36, notes: "Fighting half-century 51(36) in run chase; 1/28 with off-spin" },
  { id: "p7", matchId: "match_summer_sf1", studentId: "stud_vihaan_deshmukh", runs: 18, wickets: 2, catches: 1, oversBowled: 4, runsConceded: 22, ballsFaced: 14, notes: "Clean leg-spin variations: 2/22 in 4 overs; 18(14) with bat" },
  { id: "p8", matchId: "match_summer_sf1", studentId: "stud_pranav_mukhopadhyay", runs: 12, wickets: 1, catches: 1, oversBowled: 4, runsConceded: 30, ballsFaced: 10, notes: "Opening pace spell: 1/30 in 4 overs; took a high skier catch" },
  { id: "p9", matchId: "match_summer_sf1", studentId: "stud_tanmay_joshi", runs: 9, wickets: 0, catches: 0, ballsFaced: 16, notes: "Resilient batting resistance: 9(16) balls" },

  // --- Summer Cup Semi-Final 2 ---
  { id: "p10", matchId: "match_summer_sf2", studentId: "stud_yashodhan_kulkarni", runs: 28, wickets: 3, catches: 1, oversBowled: 4, runsConceded: 14, ballsFaced: 18, notes: "Fiery fast opening burst: 3/14 in 4 overs; handy 28(18)" },
  { id: "p11", matchId: "match_summer_sf2", studentId: "stud_kabir_singh", runs: 44, wickets: 0, catches: 1, ballsFaced: 32, notes: "Anchored the chase: 44(32) with 5 boundaries" },
  { id: "p12", matchId: "match_summer_sf2", studentId: "stud_aditya_patil", runs: 22, wickets: 1, catches: 0, oversBowled: 3, runsConceded: 19, ballsFaced: 15, notes: "All-round finish: 1/19 in 3 overs; 22*(15) to seal the chase" },
  { id: "p13", matchId: "match_summer_sf2", studentId: "stud_advait_chatterjee", runs: 6, wickets: 2, catches: 0, oversBowled: 3, runsConceded: 18, ballsFaced: 8, notes: "Economical off-spin: 2/18 in 3 overs" },
  { id: "p14", matchId: "match_summer_sf2", studentId: "stud_shaurya_gupta", runs: 11, wickets: 1, catches: 1, oversBowled: 3, runsConceded: 21, ballsFaced: 9, notes: "Key middle-overs wicket with leg-break: 1/21 in 3 overs" },
  { id: "p15", matchId: "match_summer_sf2", studentId: "stud_dhruv_patel", runs: 35, wickets: 1, catches: 0, oversBowled: 3, runsConceded: 20, ballsFaced: 26, notes: "Top scorer for Warriors: 35(26); 1/20 in 3 overs" },
  { id: "p16", matchId: "match_summer_sf2", studentId: "stud_reyansh_iyer", runs: 42, wickets: 0, catches: 1, ballsFaced: 30, notes: "Elegant left-handed strokeplay: 42(30) with 5 fours, 1 six" },
  { id: "p17", matchId: "match_summer_sf2", studentId: "stud_aniket_bhat", runs: 15, wickets: 3, catches: 0, oversBowled: 4, runsConceded: 26, ballsFaced: 14, notes: "Mesmerizing chinaman spell: 3/26 in 4 overs" },
  { id: "p18", matchId: "match_summer_sf2", studentId: "stud_siddharth_menon", runs: 8, wickets: 0, catches: 1, ballsFaced: 10, notes: "Wicketkeeping duties: 1 catch behind the stumps; 8(10)" },

  // --- Summer Cup Grand Final ---
  { id: "p19", matchId: "match_summer_final", studentId: "stud_aarav_sharma", runs: 74, wickets: 2, catches: 1, oversBowled: 4, runsConceded: 22, ballsFaced: 46, notes: "Player of the Tournament: 74(46) with 8 fours, 3 sixes; 2/22 in 4 overs" },
  { id: "p20", matchId: "match_summer_final", studentId: "stud_devendra_rao", runs: 19, wickets: 3, catches: 1, oversBowled: 4, runsConceded: 22, ballsFaced: 14, notes: "Purple Cap winner: 3/22 in 4 overs (7 total tournament wickets)" },
  { id: "p21", matchId: "match_summer_final", studentId: "stud_ishaan_nair", runs: 31, wickets: 0, catches: 2, ballsFaced: 22, notes: "Best Fielder: 31*(22); 2 spectacular diving catches in the deep" },
  { id: "p22", matchId: "match_summer_final", studentId: "stud_samar_sen", runs: 12, wickets: 1, catches: 0, oversBowled: 4, runsConceded: 25, ballsFaced: 9, notes: "Fast yorkers in 19th over: 1/25 in 4 overs; 12(9)" },
  { id: "p23", matchId: "match_summer_final", studentId: "stud_manan_trivedi", runs: 5, wickets: 0, catches: 1, ballsFaced: 4, notes: "Sliding boundary stop and catch at short third man" },
  { id: "p24", matchId: "match_summer_final", studentId: "stud_yashodhan_kulkarni", runs: 36, wickets: 2, catches: 0, oversBowled: 4, runsConceded: 28, ballsFaced: 24, notes: "Grand Final fightback: 36(24) with 4 boundaries; 2/28 in 4 overs" },
  { id: "p25", matchId: "match_summer_final", studentId: "stud_kabir_singh", runs: 48, wickets: 0, catches: 0, ballsFaced: 35, notes: "Masterful cover-driving: 48(35) with 6 fours" },
  { id: "p26", matchId: "match_summer_final", studentId: "stud_aditya_patil", runs: 25, wickets: 1, catches: 1, oversBowled: 3.3, runsConceded: 32, ballsFaced: 19, notes: "Power-hitting resistance: 25(19) with 2 fours; 1/32 in 3.3 overs" },
  { id: "p27", matchId: "match_summer_final", studentId: "stud_advait_chatterjee", runs: 10, wickets: 1, catches: 0, oversBowled: 3, runsConceded: 24, ballsFaced: 8, notes: "Tidy middle spell: 1/24 in 3 overs; 10(8)" },
  { id: "p28", matchId: "match_summer_final", studentId: "stud_shaurya_gupta", runs: 7, wickets: 1, catches: 0, oversBowled: 3, runsConceded: 27, ballsFaced: 6, notes: "Trapped top-order bat LBW with flipper: 1/27 in 3 overs" },

  // --- Monsoon League Match 1 (Thunderbolts vs Warriors) ---
  { id: "p29", matchId: "match_monsoon_1", studentId: "stud_aarav_sharma", runs: 58, wickets: 1, catches: 1, oversBowled: 3, runsConceded: 18, ballsFaced: 36, notes: "Captain's 58(36) with 6 fours, 2 sixes; 1/18 in 3 ov" },
  { id: "p30", matchId: "match_monsoon_1", studentId: "stud_ishaan_nair", runs: 28, wickets: 0, catches: 2, ballsFaced: 20, notes: "Quick 28(20); 2 sharp catches at backward point" },
  { id: "p31", matchId: "match_monsoon_1", studentId: "stud_devendra_rao", runs: 12, wickets: 3, catches: 0, oversBowled: 3, runsConceded: 14, ballsFaced: 9, notes: "Tight left-arm spin 3/14 in 3 ov" },
  { id: "p32", matchId: "match_monsoon_1", studentId: "stud_samar_sen", runs: 10, wickets: 2, catches: 0, oversBowled: 3, runsConceded: 22, ballsFaced: 7, notes: "2/22 with effective yorkers" },
  { id: "p33", matchId: "match_monsoon_1", studentId: "stud_manan_trivedi", runs: 4, wickets: 0, catches: 1, ballsFaced: 3, notes: "Direct hit runout from short cover" },
  { id: "p34", matchId: "match_monsoon_1", studentId: "stud_dhruv_patel", runs: 41, wickets: 1, catches: 0, oversBowled: 3, runsConceded: 24, ballsFaced: 29, notes: "Captain's fighting 41(29); 1/24" },
  { id: "p35", matchId: "match_monsoon_1", studentId: "stud_reyansh_iyer", runs: 32, wickets: 0, catches: 1, ballsFaced: 24, notes: "Fluent 32(24) with 4 boundaries" },
  { id: "p36", matchId: "match_monsoon_1", studentId: "stud_aniket_bhat", runs: 8, wickets: 2, catches: 0, oversBowled: 3, runsConceded: 20, ballsFaced: 7, notes: "2/20 with mystery spin" },
  { id: "p37", matchId: "match_monsoon_1", studentId: "stud_siddharth_menon", runs: 6, wickets: 0, catches: 1, ballsFaced: 8, notes: "1 stumping behind wickets" },

  // --- Monsoon League Match 2 (Strikers vs Titans) ---
  { id: "p38", matchId: "match_monsoon_2", studentId: "stud_yashodhan_kulkarni", runs: 34, wickets: 2, catches: 1, oversBowled: 3, runsConceded: 21, ballsFaced: 22, notes: "34(22) with 4 fours; 2/21" },
  { id: "p39", matchId: "match_monsoon_2", studentId: "stud_kabir_singh", runs: 42, wickets: 0, catches: 0, ballsFaced: 30, notes: "Solid 42(30) at top of the order" },
  { id: "p40", matchId: "match_monsoon_2", studentId: "stud_aditya_patil", runs: 18, wickets: 1, catches: 0, oversBowled: 3, runsConceded: 26, ballsFaced: 12, notes: "18(12); 1/26" },
  { id: "p41", matchId: "match_monsoon_2", studentId: "stud_advait_chatterjee", runs: 8, wickets: 1, catches: 0, oversBowled: 3, runsConceded: 22, ballsFaced: 7, notes: "1/22 off-spin" },
  { id: "p42", matchId: "match_monsoon_2", studentId: "stud_shaurya_gupta", runs: 4, wickets: 0, catches: 1, oversBowled: 2, runsConceded: 18, ballsFaced: 5, notes: "1 diving catch" },
  { id: "p43", matchId: "match_monsoon_2", studentId: "stud_rohan_varma", runs: 46, wickets: 2, catches: 0, oversBowled: 3, runsConceded: 19, ballsFaced: 31, notes: "Match winner: 46*(31) & 2/19" },
  { id: "p44", matchId: "match_monsoon_2", studentId: "stud_vihaan_deshmukh", runs: 24, wickets: 2, catches: 1, oversBowled: 3, runsConceded: 20, ballsFaced: 16, notes: "24*(16) finish & 2/20 leg-spin" },
  { id: "p45", matchId: "match_monsoon_2", studentId: "stud_pranav_mukhopadhyay", runs: 16, wickets: 1, catches: 1, oversBowled: 3, runsConceded: 25, ballsFaced: 11, notes: "1/25 pace spell" },
  { id: "p46", matchId: "match_monsoon_2", studentId: "stud_tanmay_joshi", runs: 12, wickets: 0, catches: 0, ballsFaced: 14, notes: "Patient 12(14) in opening stand" }
];

// Helper to compute age from birthdate
export function calculateAge(dobString: Date | string): number {
  const dob = new Date(dobString);
  const now = new Date("2026-08-31T12:00:00.000Z");
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

// ---------------------------------------------------------------------------
// 5. DATA PROVIDER FUNCTIONS
// ---------------------------------------------------------------------------

export function getDashboardScoreboardStats() {
  const totalStudents = SEED_STUDENTS.length; // 18

  const augustPaidFees = SEED_FEES.filter(
    f => f.dueDate.toString().includes("2026-08") && f.status === "PAID"
  );
  const feesCollectedThisMonth = augustPaidFees.reduce((acc, f) => acc + f.amount, 0); // ₹13,500
  const overdueCount = SEED_FEES.filter(f => f.status === "OVERDUE").length; // 11
  const upcomingSessionsCount = SEED_SESSIONS.length; // 2

  return {
    totalStudents,
    feesCollectedThisMonth,
    totalFeesCollectedAllTime: SEED_FEES.filter(f => f.status === "PAID").reduce((a, b) => a + b.amount, 0),
    overdueCount,
    upcomingSessionsCount
  };
}

export function getFeeStatusList(): FeeWithStudent[] {
  const statusPriority: Record<PaymentStatus, number> = {
    OVERDUE: 1,
    UNPAID: 2,
    PAID: 3
  };

  return SEED_FEES.map(fee => {
    const student = SEED_STUDENTS.find(s => s.id === fee.studentId);
    return {
      ...fee,
      studentName: student ? student.name : "Unknown Student",
      studentBatch: student ? student.batch : "General",
      studentPhone: student ? student.phone : "",
      guardianPhone: student ? student.guardianPhone : ""
    };
  }).sort((a, b) => {
    const priorityDiff = statusPriority[a.status] - statusPriority[b.status];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  });
}

export function getUpcomingSessions(): UpcomingSessionDetail[] {
  return SEED_SESSIONS;
}

export function getStudentsList(searchQuery?: string, batchFilter?: string): StudentWithStats[] {
  let list = SEED_STUDENTS.map(student => {
    const studentPerfs = SEED_PERFORMANCES.filter(p => p.studentId === student.id);
    const totalRuns = studentPerfs.reduce((acc, p) => acc + p.runs, 0);
    const totalWickets = studentPerfs.reduce((acc, p) => acc + p.wickets, 0);
    const matchesPlayed = studentPerfs.length;
    const pendingFees = SEED_FEES.filter(
      f => f.studentId === student.id && (f.status === "OVERDUE" || f.status === "UNPAID")
    ).length;

    return {
      ...student,
      totalRuns,
      totalWickets,
      matchesPlayed,
      pendingFeesCount: pendingFees
    };
  });

  if (batchFilter && batchFilter !== "ALL") {
    list = list.filter(s => s.batch.toLowerCase().includes(batchFilter.toLowerCase()));
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.batch.toLowerCase().includes(q) ||
        s.battingStyle.toLowerCase().includes(q) ||
        s.bowlingStyle.toLowerCase().includes(q) ||
        s.phone.includes(q)
    );
  }

  return list;
}

export function getStudentById(id: string): StudentFullProfile | null {
  const student = SEED_STUDENTS.find(s => s.id === id);
  if (!student) return null;

  const fees = SEED_FEES.filter(f => f.studentId === id).sort(
    (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  );

  const studentPerfs = SEED_PERFORMANCES.filter(p => p.studentId === id);
  const totalRuns = studentPerfs.reduce((acc, p) => acc + p.runs, 0);
  const totalWickets = studentPerfs.reduce((acc, p) => acc + p.wickets, 0);
  const matchesPlayed = studentPerfs.length;
  const pendingFees = fees.filter(f => f.status === "OVERDUE" || f.status === "UNPAID").length;

  const performancesWithMatches = studentPerfs.map(perf => {
    const match = SEED_MATCHES.find(m => m.id === perf.matchId) || {
      id: perf.matchId,
      tournamentId: "tourn_summer_cup_2026",
      opponent: "Opponent XI",
      date: "2026-06-15T09:00:00.000Z",
      result: "WON"
    };
    const tournament = SEED_TOURNAMENTS.find(t => t.id === match.tournamentId) || SEED_TOURNAMENTS[0];
    return {
      ...perf,
      match: {
        ...match,
        tournament
      }
    };
  });

  return {
    ...student,
    age: calculateAge(student.dateOfBirth),
    totalRuns,
    totalWickets,
    matchesPlayed,
    pendingFeesCount: pendingFees,
    fees,
    performances: performancesWithMatches
  };
}

// ---------------------------------------------------------------------------
// 6. TOURNAMENT SPECIFIC PROVIDER FUNCTIONS
// ---------------------------------------------------------------------------

export function getTournamentTeams(tournamentId: string): TournamentTeam[] {
  return ACADEMY_TEAMS.map((team, idx) => {
    const captain = SEED_STUDENTS.find(s => s.id === team.captainId);
    const students = team.playerIds
      .map(id => SEED_STUDENTS.find(s => s.id === id))
      .filter((s): s is Student => s !== undefined);

    return {
      id: `team_${tournamentId}_${idx + 1}`,
      tournamentId,
      name: team.name,
      shortName: team.shortName,
      color: team.color,
      captainId: team.captainId,
      viceCaptainId: team.viceCaptainId,
      playerIds: team.playerIds,
      students,
      captain
    };
  });
}

export function getTournamentFixtures(tournamentId: string): TournamentFixture[] {
  const matches = SEED_MATCHES.filter(m => m.tournamentId === tournamentId);
  const teams = getTournamentTeams(tournamentId);

  return matches.map(match => {
    const homeTeam = teams.find(t => t.name === match.homeTeamName);
    const awayTeam = teams.find(t => t.name === match.awayTeamName || t.name === match.opponent);
    const playerOfTheMatch = match.playerOfTheMatchId
      ? SEED_STUDENTS.find(s => s.id === match.playerOfTheMatchId)
      : undefined;

    const performances = SEED_PERFORMANCES
      .filter(p => p.matchId === match.id)
      .map(p => ({
        ...p,
        student: SEED_STUDENTS.find(s => s.id === p.studentId)
      }));

    return {
      ...match,
      homeTeam,
      awayTeam,
      playerOfTheMatch,
      performances
    };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getTournamentsList(statusFilter?: string, searchQuery?: string): TournamentDetailed[] {
  let list = SEED_TOURNAMENTS.map(tournament => {
    const teams = getTournamentTeams(tournament.id);
    const matches = getTournamentFixtures(tournament.id);
    const completedMatchesCount = matches.filter(m => m.result !== "PENDING").length;

    return {
      ...tournament,
      teams,
      matches,
      totalTeams: teams.length,
      completedMatchesCount,
      totalMatchesCount: matches.length
    };
  });

  if (statusFilter && statusFilter !== "ALL") {
    list = list.filter(t => t.status === statusFilter);
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      t =>
        t.name.toLowerCase().includes(q) ||
        (t.location && t.location.toLowerCase().includes(q)) ||
        (t.format && t.format.toLowerCase().includes(q))
    );
  }

  return list.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getTournamentById(id: string): TournamentDetailed | null {
  const tournament = SEED_TOURNAMENTS.find(t => t.id === id);
  if (!tournament) return null;

  const teams = getTournamentTeams(id);
  const matches = getTournamentFixtures(id);
  const completedMatchesCount = matches.filter(m => m.result !== "PENDING").length;

  return {
    ...tournament,
    teams,
    matches,
    totalTeams: teams.length,
    completedMatchesCount,
    totalMatchesCount: matches.length
  };
}

export function getTournamentLeaderboard(tournamentId: string): TournamentLeaderboardData {
  const tournamentMatches = SEED_MATCHES.filter(m => m.tournamentId === tournamentId);
  const matchIds = new Set(tournamentMatches.map(m => m.id));
  const performances = SEED_PERFORMANCES.filter(p => matchIds.has(p.matchId));

  const teams = getTournamentTeams(tournamentId);
  const studentTeamMap = new Map<string, { teamName: string; teamColor: string }>();
  teams.forEach(team => {
    team.playerIds.forEach(pId => {
      studentTeamMap.set(pId, { teamName: team.name, teamColor: team.color });
    });
  });

  // 1. Compute Batting Leaderboard
  const battingAggregates = new Map<string, {
    studentId: string;
    runs: number;
    innings: number;
    highestScore: number;
    fours: number;
    sixes: number;
    ballsFaced: number;
    notOuts: number;
  }>();

  // 2. Compute Bowling Leaderboard
  const bowlingAggregates = new Map<string, {
    studentId: string;
    wickets: number;
    overs: number;
    runsConceded: number;
    bestFiguresWickets: number;
    bestFiguresRuns: number;
    matches: number;
  }>();

  // 3. Compute Fielding Leaderboard
  const fieldingAggregates = new Map<string, {
    studentId: string;
    catches: number;
    matches: number;
  }>();

  performances.forEach(perf => {
    // Batting
    const bCurrent = battingAggregates.get(perf.studentId) || {
      studentId: perf.studentId,
      runs: 0,
      innings: 0,
      highestScore: 0,
      fours: 0,
      sixes: 0,
      ballsFaced: 0,
      notOuts: 0
    };
    bCurrent.runs += perf.runs;
    bCurrent.innings += 1;
    if (perf.runs > bCurrent.highestScore) {
      bCurrent.highestScore = perf.runs;
    }
    // Estimate boundary distribution from notes or runs
    const estSixes = Math.floor(perf.runs / 25);
    const estFours = Math.floor((perf.runs - estSixes * 6) / 5);
    bCurrent.fours += estFours;
    bCurrent.sixes += estSixes;
    bCurrent.ballsFaced += perf.ballsFaced || Math.round(perf.runs * 0.8 + 8);
    battingAggregates.set(perf.studentId, bCurrent);

    // Bowling
    if ((perf.oversBowled && perf.oversBowled > 0) || perf.wickets > 0) {
      const bowCurrent = bowlingAggregates.get(perf.studentId) || {
        studentId: perf.studentId,
        wickets: 0,
        overs: 0,
        runsConceded: 0,
        bestFiguresWickets: 0,
        bestFiguresRuns: 999,
        matches: 0
      };
      bowCurrent.wickets += perf.wickets;
      bowCurrent.overs += perf.oversBowled || 3;
      bowCurrent.runsConceded += perf.runsConceded || (perf.wickets * 7 + 14);
      bowCurrent.matches += 1;

      if (
        perf.wickets > bowCurrent.bestFiguresWickets ||
        (perf.wickets === bowCurrent.bestFiguresWickets &&
          (perf.runsConceded || 20) < bowCurrent.bestFiguresRuns)
      ) {
        bowCurrent.bestFiguresWickets = perf.wickets;
        bowCurrent.bestFiguresRuns = perf.runsConceded || 20;
      }
      bowlingAggregates.set(perf.studentId, bowCurrent);
    }

    // Fielding
    if (perf.catches > 0) {
      const fCurrent = fieldingAggregates.get(perf.studentId) || {
        studentId: perf.studentId,
        catches: 0,
        matches: 0
      };
      fCurrent.catches += perf.catches;
      fCurrent.matches += 1;
      fieldingAggregates.set(perf.studentId, fCurrent);
    }
  });

  // Convert and Sort Batting List
  const battingList: LeaderboardItemRuns[] = Array.from(battingAggregates.values())
    .map(item => {
      const student = SEED_STUDENTS.find(s => s.id === item.studentId)!;
      const teamInfo = studentTeamMap.get(item.studentId) || { teamName: "Academy XI", teamColor: "#0B3D2E" };
      const strikeRate = item.ballsFaced > 0 ? (item.runs / item.ballsFaced) * 100 : 0;

      return {
        rank: 0,
        student,
        teamName: teamInfo.teamName,
        teamColor: teamInfo.teamColor,
        matches: item.innings,
        innings: item.innings,
        runs: item.runs,
        highestScore: item.highestScore,
        fours: item.fours,
        sixes: item.sixes,
        strikeRate: Number(strikeRate.toFixed(1)),
        notOuts: item.notOuts,
        isLeader: false
      };
    })
    .sort((a, b) => b.runs - a.runs)
    .map((item, idx) => ({
      ...item,
      rank: idx + 1,
      isLeader: idx === 0
    }));

  // Convert and Sort Bowling List
  const bowlingList: LeaderboardItemWickets[] = Array.from(bowlingAggregates.values())
    .map(item => {
      const student = SEED_STUDENTS.find(s => s.id === item.studentId)!;
      const teamInfo = studentTeamMap.get(item.studentId) || { teamName: "Academy XI", teamColor: "#0B3D2E" };
      const economy = item.overs > 0 ? item.runsConceded / item.overs : 0;
      const bestFigures = `${item.bestFiguresWickets}/${item.bestFiguresRuns === 999 ? 0 : item.bestFiguresRuns}`;

      return {
        rank: 0,
        student,
        teamName: teamInfo.teamName,
        teamColor: teamInfo.teamColor,
        matches: item.matches,
        overs: Number(item.overs.toFixed(1)),
        wickets: item.wickets,
        runsConceded: item.runsConceded,
        bestFigures,
        economy: Number(economy.toFixed(2)),
        isLeader: false
      };
    })
    .sort((a, b) => {
      if (b.wickets !== a.wickets) return b.wickets - a.wickets;
      return a.economy - b.economy;
    })
    .map((item, idx) => ({
      ...item,
      rank: idx + 1,
      isLeader: idx === 0
    }));

  // Convert and Sort Fielding List
  const fieldingList: LeaderboardItemCatches[] = Array.from(fieldingAggregates.values())
    .map(item => {
      const student = SEED_STUDENTS.find(s => s.id === item.studentId)!;
      const teamInfo = studentTeamMap.get(item.studentId) || { teamName: "Academy XI", teamColor: "#0B3D2E" };

      return {
        rank: 0,
        student,
        teamName: teamInfo.teamName,
        teamColor: teamInfo.teamColor,
        matches: item.matches,
        catches: item.catches,
        stumpings: 0,
        runOuts: 0,
        isLeader: false
      };
    })
    .sort((a, b) => b.catches - a.catches)
    .map((item, idx) => ({
      ...item,
      rank: idx + 1,
      isLeader: idx === 0
    }));

  return {
    topRunScorer: battingList.length > 0 ? battingList[0] : null,
    topWicketTaker: bowlingList.length > 0 ? bowlingList[0] : null,
    bestCatcher: fieldingList.length > 0 ? fieldingList[0] : null,
    batting: battingList,
    bowling: bowlingList,
    fielding: fieldingList
  };
}

export function getTournamentStatsOverview() {
  const tournaments = SEED_TOURNAMENTS;
  const completed = tournaments.filter(t => t.status === "COMPLETED").length;
  const ongoing = tournaments.filter(t => t.status === "ONGOING").length;
  const upcoming = tournaments.filter(t => t.status === "UPCOMING").length;
  const totalMatches = SEED_MATCHES.length;
  const completedMatches = SEED_MATCHES.filter(m => m.result !== "PENDING").length;

  return {
    totalTournaments: tournaments.length,
    completed,
    ongoing,
    upcoming,
    totalMatches,
    completedMatches
  };
}

