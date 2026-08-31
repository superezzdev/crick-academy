import {
  PrismaClient,
  BattingStyle,
  BowlingStyle,
  PaymentStatus,
  PaymentType,
  TournamentStatus,
  MatchResult
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🏏 Starting CrickAcademy database seed...\n");

  // =========================================================================
  // 0. CLEANUP EXISTING DATA (Reverse FK order)
  // =========================================================================
  console.log("🧹 Cleaning up existing records...");
  await prisma.playerPerformance.deleteMany();
  await prisma.match.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.sessionRegistration.deleteMany();
  await prisma.netSession.deleteMany();
  await prisma.feePayment.deleteMany();
  await prisma.student.deleteMany();
  console.log("✓ Existing database cleaned successfully.\n");

  // =========================================================================
  // 1. STUDENTS (18 Students across 3 Batches, Ages 10-17, Varied Disciplines)
  // =========================================================================
  console.log("👤 Seeding 18 Students...");

  interface StudentSeedInput {
    id: string;
    name: string;
    photoUrl?: string;
    dateOfBirth: string;
    phone: string;
    guardianPhone: string;
    battingStyle: BattingStyle;
    bowlingStyle: BowlingStyle;
    joinedDate: string;
    batch: "Morning Batch" | "Evening Batch" | "Weekend Batch";
  }

  const studentsData: StudentSeedInput[] = [
    // --- Morning Batch (6 Students) ---
    {
      id: "stud_aarav_sharma",
      name: "Aarav Sharma",
      dateOfBirth: "2010-04-14T00:00:00.000Z", // 16 yrs old
      phone: "+91 98201 44101",
      guardianPhone: "+91 98201 44100",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_FAST,
      joinedDate: "2024-01-15T00:00:00.000Z",
      batch: "Morning Batch"
    },
    {
      id: "stud_rohan_varma",
      name: "Rohan Varma",
      dateOfBirth: "2011-06-20T00:00:00.000Z", // 15 yrs old
      phone: "+91 98201 55202",
      guardianPhone: "+91 98201 55200",
      battingStyle: BattingStyle.LEFT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_SPIN_OFF,
      joinedDate: "2024-03-01T00:00:00.000Z",
      batch: "Morning Batch"
    },
    {
      id: "stud_devendra_rao",
      name: "Devendra Rao",
      dateOfBirth: "2009-02-18T00:00:00.000Z", // 17 yrs old
      phone: "+91 98201 66303",
      guardianPhone: "+91 98201 66300",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.LEFT_ARM_SPIN_ORTHODOX,
      joinedDate: "2023-09-12T00:00:00.000Z",
      batch: "Morning Batch"
    },
    {
      id: "stud_yashodhan_kulkarni",
      name: "Yashodhan Kulkarni",
      dateOfBirth: "2010-08-11T00:00:00.000Z", // 16 yrs old
      phone: "+91 98201 77404",
      guardianPhone: "+91 98201 77400",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_FAST,
      joinedDate: "2024-05-10T00:00:00.000Z",
      batch: "Morning Batch"
    },
    {
      id: "stud_ishaan_nair",
      name: "Ishaan Nair",
      dateOfBirth: "2012-01-25T00:00:00.000Z", // 14 yrs old
      phone: "+91 98201 88505",
      guardianPhone: "+91 98201 88500",
      battingStyle: BattingStyle.LEFT_HAND,
      bowlingStyle: BowlingStyle.NONE, // Pure Batsman
      joinedDate: "2024-07-20T00:00:00.000Z",
      batch: "Morning Batch"
    },
    {
      id: "stud_dhruv_patel",
      name: "Dhruv Patel",
      dateOfBirth: "2011-10-03T00:00:00.000Z", // 14 yrs old
      phone: "+91 98201 99606",
      guardianPhone: "+91 98201 99600",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_MEDIUM,
      joinedDate: "2024-02-14T00:00:00.000Z",
      batch: "Morning Batch"
    },

    // --- Evening Batch (6 Students) ---
    {
      id: "stud_kabir_singh",
      name: "Kabir Singh",
      dateOfBirth: "2013-05-12T00:00:00.000Z", // 13 yrs old
      phone: "+91 98331 11707",
      guardianPhone: "+91 98331 11700",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.NONE, // Top order Bat
      joinedDate: "2025-06-10T00:00:00.000Z",
      batch: "Evening Batch"
    },
    {
      id: "stud_vihaan_deshmukh",
      name: "Vihaan Deshmukh",
      dateOfBirth: "2014-03-19T00:00:00.000Z", // 12 yrs old
      phone: "+91 98331 22808",
      guardianPhone: "+91 98331 22800",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_SPIN_LEG,
      joinedDate: "2025-04-05T00:00:00.000Z",
      batch: "Evening Batch"
    },
    {
      id: "stud_reyansh_iyer",
      name: "Reyansh Iyer",
      dateOfBirth: "2012-09-28T00:00:00.000Z", // 13 yrs old
      phone: "+91 98331 33909",
      guardianPhone: "+91 98331 33900",
      battingStyle: BattingStyle.LEFT_HAND,
      bowlingStyle: BowlingStyle.LEFT_ARM_MEDIUM,
      joinedDate: "2025-01-15T00:00:00.000Z",
      batch: "Evening Batch"
    },
    {
      id: "stud_advait_chatterjee",
      name: "Advait Chatterjee",
      dateOfBirth: "2015-07-14T00:00:00.000Z", // 11 yrs old
      phone: "+91 98331 44010",
      guardianPhone: "+91 98331 44000",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_SPIN_OFF,
      joinedDate: "2025-08-01T00:00:00.000Z",
      batch: "Evening Batch"
    },
    {
      id: "stud_samar_sen",
      name: "Samar Sen",
      dateOfBirth: "2013-11-22T00:00:00.000Z", // 12 yrs old
      phone: "+91 98331 55111",
      guardianPhone: "+91 98331 55100",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_FAST,
      joinedDate: "2025-03-10T00:00:00.000Z",
      batch: "Evening Batch"
    },
    {
      id: "stud_tanmay_joshi",
      name: "Tanmay Joshi",
      dateOfBirth: "2016-04-08T00:00:00.000Z", // 10 yrs old
      phone: "+91 98331 66212",
      guardianPhone: "+91 98331 66200",
      battingStyle: BattingStyle.LEFT_HAND,
      bowlingStyle: BowlingStyle.NONE, // Junior bat
      joinedDate: "2025-09-01T00:00:00.000Z",
      batch: "Evening Batch"
    },

    // --- Weekend Batch (6 Students) ---
    {
      id: "stud_aditya_patil",
      name: "Aditya Patil",
      dateOfBirth: "2009-09-15T00:00:00.000Z", // 16 yrs old
      phone: "+91 98700 11313",
      guardianPhone: "+91 98700 11300",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_MEDIUM,
      joinedDate: "2024-04-12T00:00:00.000Z",
      batch: "Weekend Batch"
    },
    {
      id: "stud_pranav_mukhopadhyay",
      name: "Pranav Mukhopadhyay",
      dateOfBirth: "2010-03-30T00:00:00.000Z", // 16 yrs old
      phone: "+91 98700 22414",
      guardianPhone: "+91 98700 22400",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.LEFT_ARM_FAST,
      joinedDate: "2024-08-20T00:00:00.000Z",
      batch: "Weekend Batch"
    },
    {
      id: "stud_aniket_bhat",
      name: "Aniket Bhat",
      dateOfBirth: "2011-12-05T00:00:00.000Z", // 14 yrs old
      phone: "+91 98700 33515",
      guardianPhone: "+91 98700 33500",
      battingStyle: BattingStyle.LEFT_HAND,
      bowlingStyle: BowlingStyle.LEFT_ARM_SPIN_CHINAMAN,
      joinedDate: "2024-11-01T00:00:00.000Z",
      batch: "Weekend Batch"
    },
    {
      id: "stud_shaurya_gupta",
      name: "Shaurya Gupta",
      dateOfBirth: "2012-04-17T00:00:00.000Z", // 14 yrs old
      phone: "+91 98700 44616",
      guardianPhone: "+91 98700 44600",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_SPIN_LEG,
      joinedDate: "2025-02-18T00:00:00.000Z",
      batch: "Weekend Batch"
    },
    {
      id: "stud_siddharth_menon",
      name: "Siddharth Menon",
      dateOfBirth: "2014-08-24T00:00:00.000Z", // 12 yrs old
      phone: "+91 98700 55717",
      guardianPhone: "+91 98700 55700",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.NONE, // Wicketkeeper-batsman
      joinedDate: "2025-05-15T00:00:00.000Z",
      batch: "Weekend Batch"
    },
    {
      id: "stud_manan_trivedi",
      name: "Manan Trivedi",
      dateOfBirth: "2016-02-10T00:00:00.000Z", // 10 yrs old
      phone: "+91 98700 66818",
      guardianPhone: "+91 98700 66800",
      battingStyle: BattingStyle.RIGHT_HAND,
      bowlingStyle: BowlingStyle.RIGHT_ARM_MEDIUM,
      joinedDate: "2026-01-10T00:00:00.000Z",
      batch: "Weekend Batch"
    }
  ];

  const createdStudents = await Promise.all(
    studentsData.map((s) =>
      prisma.student.create({
        data: {
          id: s.id,
          name: s.name,
          dateOfBirth: new Date(s.dateOfBirth),
          phone: s.phone,
          guardianPhone: s.guardianPhone,
          battingStyle: s.battingStyle,
          bowlingStyle: s.bowlingStyle,
          joinedDate: new Date(s.joinedDate),
          batch: s.batch
        }
      })
    )
  );

  console.log(`✓ Seeded ${createdStudents.length} students across 3 batches.\n`);

  // =========================================================================
  // 2. FEE PAYMENTS (Last 3 Months: June, July, August 2026 - ₹1500/month)
  // Distribution: 38 PAID (~70.4%), 11 OVERDUE (~20.4%), 5 UNPAID (~9.3%) = 54 records
  // =========================================================================
  console.log("💳 Seeding 3-Month Fee Payment History (54 records)...");

  interface FeeSeedConfig {
    studentId: string;
    june: { status: PaymentStatus; paidOn?: string; method?: string; proofUrl?: string };
    july: { status: PaymentStatus; paidOn?: string; method?: string; proofUrl?: string };
    august: { status: PaymentStatus; paidOn?: string; method?: string; proofUrl?: string };
  }

  // Define payment behavior profiles for each of the 18 students:
  // 1. Regular prompt payers (9 students -> 27 PAID)
  // 2. Consistent payers with August pending (4 students -> 8 PAID, 4 UNPAID)
  // 3. Paid June, July & August overdue (3 students -> 3 PAID, 6 OVERDUE)
  // 4. Chronic overdue defaulter (1 student -> 3 OVERDUE)
  // 5. June/July overdue, August unpaid (1 student -> 2 OVERDUE, 1 UNPAID)
  // Total: 27+8+3 = 38 PAID (70.4%), 6+3+2 = 11 OVERDUE (20.4%), 4+1 = 5 UNPAID (9.3%)

  const feeConfigs: FeeSeedConfig[] = [
    // 1. Aarav Sharma (Timely UPI payer) - 3 PAID
    {
      studentId: "stud_aarav_sharma",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-03T10:15:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260603/9820144101" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-02T14:20:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260702/9820144101" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-04T09:45:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260804/9820144101" }
    },
    // 2. Rohan Varma (NetBanking / UPI) - 3 PAID
    {
      studentId: "stud_rohan_varma",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-05T11:30:00.000Z", method: "BANK_TRANSFER", proofUrl: "NEFT/HDFC/20260605/881920" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-04T16:00:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260704/552021" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-05T12:10:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260805/552022" }
    },
    // 3. Yashodhan Kulkarni (Cash / UPI) - 3 PAID
    {
      studentId: "stud_yashodhan_kulkarni",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-04T18:00:00.000Z", method: "CASH", proofUrl: "REC-2026-06-044" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-03T17:30:00.000Z", method: "UPI", proofUrl: "UPI/Paytm/20260703/774041" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-03T18:15:00.000Z", method: "UPI", proofUrl: "UPI/Paytm/20260803/774042" }
    },
    // 4. Ishaan Nair (Card / UPI) - 3 PAID
    {
      studentId: "stud_ishaan_nair",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-01T10:00:00.000Z", method: "CARD", proofUrl: "POS/VISA/20260601/399182" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-01T09:30:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260701/885051" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-02T11:20:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260802/885052" }
    },
    // 5. Vihaan Deshmukh (UPI) - 3 PAID
    {
      studentId: "stud_vihaan_deshmukh",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-05T15:40:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260605/228081" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-05T13:10:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260705/228082" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-04T16:50:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260804/228083" }
    },
    // 6. Reyansh Iyer (Bank Transfer / UPI) - 3 PAID
    {
      studentId: "stud_reyansh_iyer",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-02T11:00:00.000Z", method: "BANK_TRANSFER", proofUrl: "IMPS/ICICI/20260602/990182" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-03T10:15:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260703/339091" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-05T14:40:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260805/339092" }
    },
    // 7. Aditya Patil (Cash / UPI) - 3 PAID
    {
      studentId: "stud_aditya_patil",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-04T12:00:00.000Z", method: "CASH", proofUrl: "REC-2026-06-089" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-04T17:25:00.000Z", method: "UPI", proofUrl: "UPI/BHIM/20260704/113131" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-01T10:30:00.000Z", method: "UPI", proofUrl: "UPI/BHIM/20260801/113132" }
    },
    // 8. Pranav Mukhopadhyay (UPI) - 3 PAID
    {
      studentId: "stud_pranav_mukhopadhyay",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-03T16:20:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260603/224141" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-05T19:00:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260705/224142" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-03T11:45:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260803/224143" }
    },
    // 9. Siddharth Menon (Cheque / UPI) - 3 PAID
    {
      studentId: "stud_siddharth_menon",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-06T12:00:00.000Z", method: "CHEQUE", proofUrl: "CHQ/SBIN/491024" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-02T15:10:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260702/557171" },
      august: { status: PaymentStatus.PAID, paidOn: "2026-08-04T17:00:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260804/557172" }
    },

    // --- 4 Students: June & July PAID, August UNPAID (8 PAID, 4 UNPAID) ---
    // 10. Devendra Rao
    {
      studentId: "stud_devendra_rao",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-04T09:15:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260604/663031" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-05T11:00:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260705/663032" },
      august: { status: PaymentStatus.UNPAID }
    },
    // 11. Kabir Singh
    {
      studentId: "stud_kabir_singh",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-05T14:30:00.000Z", method: "CASH", proofUrl: "REC-2026-06-112" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-03T16:45:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260703/117071" },
      august: { status: PaymentStatus.UNPAID }
    },
    // 12. Advait Chatterjee
    {
      studentId: "stud_advait_chatterjee",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-02T13:10:00.000Z", method: "UPI", proofUrl: "UPI/Paytm/20260602/440101" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-04T18:20:00.000Z", method: "UPI", proofUrl: "UPI/Paytm/20260704/440102" },
      august: { status: PaymentStatus.UNPAID }
    },
    // 13. Aniket Bhat
    {
      studentId: "stud_aniket_bhat",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-04T10:00:00.000Z", method: "BANK_TRANSFER", proofUrl: "NEFT/AXIS/20260604/449102" },
      july: { status: PaymentStatus.PAID, paidOn: "2026-07-05T12:30:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260705/335151" },
      august: { status: PaymentStatus.UNPAID }
    },

    // --- 3 Students: June PAID, July OVERDUE, August OVERDUE (3 PAID, 6 OVERDUE) ---
    // 14. Dhruv Patel
    {
      studentId: "stud_dhruv_patel",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-05T16:00:00.000Z", method: "UPI", proofUrl: "UPI/GPay/20260605/996061" },
      july: { status: PaymentStatus.OVERDUE },
      august: { status: PaymentStatus.OVERDUE }
    },
    // 15. Samar Sen
    {
      studentId: "stud_samar_sen",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-03T11:20:00.000Z", method: "CASH", proofUrl: "REC-2026-06-078" },
      july: { status: PaymentStatus.OVERDUE },
      august: { status: PaymentStatus.OVERDUE }
    },
    // 16. Shaurya Gupta
    {
      studentId: "stud_shaurya_gupta",
      june: { status: PaymentStatus.PAID, paidOn: "2026-06-01T15:10:00.000Z", method: "UPI", proofUrl: "UPI/PhonePe/20260601/446161" },
      july: { status: PaymentStatus.OVERDUE },
      august: { status: PaymentStatus.OVERDUE }
    },

    // --- 1 Student: Chronic Overdue Defaulter (3 OVERDUE) ---
    // 17. Tanmay Joshi
    {
      studentId: "stud_tanmay_joshi",
      june: { status: PaymentStatus.OVERDUE },
      july: { status: PaymentStatus.OVERDUE },
      august: { status: PaymentStatus.OVERDUE }
    },

    // --- 1 Student: June & July OVERDUE, August UNPAID (2 OVERDUE, 1 UNPAID) ---
    // 18. Manan Trivedi
    {
      studentId: "stud_manan_trivedi",
      june: { status: PaymentStatus.OVERDUE },
      july: { status: PaymentStatus.OVERDUE },
      august: { status: PaymentStatus.UNPAID }
    }
  ];

  const months = [
    { key: "june" as const, dueDate: "2026-06-05T23:59:59.000Z" },
    { key: "july" as const, dueDate: "2026-07-05T23:59:59.000Z" },
    { key: "august" as const, dueDate: "2026-08-05T23:59:59.000Z" }
  ];

  let paidCount = 0;
  let overdueCount = 0;
  let unpaidCount = 0;

  for (const cfg of feeConfigs) {
    for (const m of months) {
      const monthData = cfg[m.key];
      if (monthData.status === PaymentStatus.PAID) paidCount++;
      if (monthData.status === PaymentStatus.OVERDUE) overdueCount++;
      if (monthData.status === PaymentStatus.UNPAID) unpaidCount++;

      await prisma.feePayment.create({
        data: {
          studentId: cfg.studentId,
          amount: 1500.0,
          dueDate: new Date(m.dueDate),
          status: monthData.status,
          paidOn: monthData.paidOn ? new Date(monthData.paidOn) : null,
          method: monthData.method || null,
          proofUrl: monthData.proofUrl || null,
          type: PaymentType.MONTHLY
        }
      });
    }
  }

  const totalFees = paidCount + overdueCount + unpaidCount;
  console.log(
    `✓ Seeded ${totalFees} fee records: ${paidCount} PAID (${((paidCount / totalFees) * 100).toFixed(1)}%), ` +
    `${overdueCount} OVERDUE (${((overdueCount / totalFees) * 100).toFixed(1)}%), ` +
    `${unpaidCount} UNPAID (${((unpaidCount / totalFees) * 100).toFixed(1)}%)\n`
  );

  // =========================================================================
  // 3. NET PRACTICE SESSIONS & REGISTRATIONS (2 Upcoming Sessions in Sep 2026)
  // =========================================================================
  console.log("🏏 Seeding 2 Upcoming Net Practice Sessions with Registrations...");

  const session1 = await prisma.netSession.create({
    data: {
      id: "session_20260902_morning",
      date: new Date("2026-09-02T06:30:00.000Z"),
      time: "06:30 AM - 08:30 AM",
      capacity: 12,
      feeAmount: 250.0
    }
  });

  const session2 = await prisma.netSession.create({
    data: {
      id: "session_20260905_evening",
      date: new Date("2026-09-05T16:30:00.000Z"),
      time: "04:30 PM - 06:30 PM",
      capacity: 12,
      feeAmount: 300.0
    }
  });

  // Session 1 Registrations (8 students: 6 paid, 2 unpaid)
  const session1Registrations = [
    { studentId: "stud_aarav_sharma", paid: true },
    { studentId: "stud_rohan_varma", paid: true },
    { studentId: "stud_devendra_rao", paid: true },
    { studentId: "stud_yashodhan_kulkarni", paid: true },
    { studentId: "stud_ishaan_nair", paid: true },
    { studentId: "stud_dhruv_patel", paid: false },
    { studentId: "stud_kabir_singh", paid: true },
    { studentId: "stud_vihaan_deshmukh", paid: false }
  ];

  for (const reg of session1Registrations) {
    await prisma.sessionRegistration.create({
      data: {
        sessionId: session1.id,
        studentId: reg.studentId,
        paid: reg.paid
      }
    });
  }

  // Session 2 Registrations (5 students: 4 paid, 1 unpaid)
  const session2Registrations = [
    { studentId: "stud_aditya_patil", paid: true },
    { studentId: "stud_pranav_mukhopadhyay", paid: true },
    { studentId: "stud_aniket_bhat", paid: true },
    { studentId: "stud_shaurya_gupta", paid: false },
    { studentId: "stud_reyansh_iyer", paid: true }
  ];

  for (const reg of session2Registrations) {
    await prisma.sessionRegistration.create({
      data: {
        sessionId: session2.id,
        studentId: reg.studentId,
        paid: reg.paid
      }
    });
  }

  console.log(`✓ Seeded Net Session 1 (Sep 02, 06:30 AM): ${session1Registrations.length}/12 slots filled`);
  console.log(`✓ Seeded Net Session 2 (Sep 05, 04:30 PM): ${session2Registrations.length}/12 slots filled\n`);

  // =========================================================================
  // 4. TOURNAMENT: "Summer Cup 2026" (Completed, 4 Teams, 3 Matches, Stats)
  // =========================================================================
  console.log("🏆 Seeding Internal Tournament 'Summer Cup 2026' with 3 Matches & Player Stats...");

  const tournament = await prisma.tournament.create({
    data: {
      id: "tourn_summer_cup_2026",
      name: "Summer Cup 2026",
      startDate: new Date("2026-06-15T09:00:00.000Z"),
      endDate: new Date("2026-06-22T18:00:00.000Z"),
      status: TournamentStatus.COMPLETED
    }
  });

  // --- Match 1: Semi-Final 1 (Thunderbolts XI vs Strikers XI) ---
  const match1 = await prisma.match.create({
    data: {
      id: "match_summer_sf1",
      tournamentId: tournament.id,
      opponent: "Strikers XI (Semi-Final 1)",
      date: new Date("2026-06-16T09:30:00.000Z"),
      result: MatchResult.WON // Thunderbolts XI won
    }
  });

  const match1Performances = [
    // Thunderbolts XI
    {
      studentId: "stud_aarav_sharma",
      runs: 62,
      wickets: 1,
      catches: 1,
      notes: "Captain's knock: 62(41) with 7 fours and 2 sixes; took 1/18 in 3 overs"
    },
    {
      studentId: "stud_devendra_rao",
      runs: 14,
      wickets: 4,
      catches: 0,
      notes: "Match-winning spell: 4/16 in 4 overs (orthodox left-arm spin)"
    },
    {
      studentId: "stud_ishaan_nair",
      runs: 38,
      wickets: 0,
      catches: 2,
      notes: "Fluent 38(29); took 2 sharp catches inside the 30-yard circle"
    },
    {
      studentId: "stud_samar_sen",
      runs: 8,
      wickets: 2,
      catches: 1,
      notes: "Clutch death bowling: 2/24 in 3.4 overs"
    },
    {
      studentId: "stud_manan_trivedi",
      runs: 4,
      wickets: 0,
      catches: 0,
      notes: "Youngest player on field; 4*(3) at the death"
    },
    // Strikers XI
    {
      studentId: "stud_rohan_varma",
      runs: 51,
      wickets: 1,
      catches: 0,
      notes: "Fighting half-century 51(36) in run chase; 1/28 with off-spin"
    },
    {
      studentId: "stud_vihaan_deshmukh",
      runs: 18,
      wickets: 2,
      catches: 1,
      notes: "Clean leg-spin variations: 2/22 in 4 overs; 18(14) with bat"
    },
    {
      studentId: "stud_pranav_mukhopadhyay",
      runs: 12,
      wickets: 1,
      catches: 1,
      notes: "Opening pace spell: 1/30 in 4 overs; took a high skier catch"
    },
    {
      studentId: "stud_tanmay_joshi",
      runs: 9,
      wickets: 0,
      catches: 0,
      notes: "Resilient batting resistance: 9(16) balls"
    }
  ];

  for (const perf of match1Performances) {
    await prisma.playerPerformance.create({
      data: {
        matchId: match1.id,
        studentId: perf.studentId,
        runs: perf.runs,
        wickets: perf.wickets,
        catches: perf.catches,
        notes: perf.notes
      }
    });
  }

  // --- Match 2: Semi-Final 2 (Titans XI vs Warriors XI) ---
  const match2 = await prisma.match.create({
    data: {
      id: "match_summer_sf2",
      tournamentId: tournament.id,
      opponent: "Warriors XI (Semi-Final 2)",
      date: new Date("2026-06-18T09:30:00.000Z"),
      result: MatchResult.WON // Titans XI won by 4 wickets
    }
  });

  const match2Performances = [
    // Titans XI
    {
      studentId: "stud_yashodhan_kulkarni",
      runs: 28,
      wickets: 3,
      catches: 1,
      notes: "Fiery fast opening burst: 3/14 in 4 overs; handy 28(18)"
    },
    {
      studentId: "stud_kabir_singh",
      runs: 44,
      wickets: 0,
      catches: 1,
      notes: "Anchored the chase: 44(32) with 5 boundaries"
    },
    {
      studentId: "stud_aditya_patil",
      runs: 22,
      wickets: 1,
      catches: 0,
      notes: "All-round finish: 1/19 in 3 overs; 22*(15) to seal the chase"
    },
    {
      studentId: "stud_advait_chatterjee",
      runs: 6,
      wickets: 2,
      catches: 0,
      notes: "Economical off-spin: 2/18 in 3 overs"
    },
    {
      studentId: "stud_shaurya_gupta",
      runs: 11,
      wickets: 1,
      catches: 1,
      notes: "Key middle-overs wicket with leg-break: 1/21 in 3 overs"
    },
    // Warriors XI
    {
      studentId: "stud_dhruv_patel",
      runs: 35,
      wickets: 1,
      catches: 0,
      notes: "Top scorer for Warriors: 35(26); 1/20 in 3 overs"
    },
    {
      studentId: "stud_reyansh_iyer",
      runs: 42,
      wickets: 0,
      catches: 1,
      notes: "Elegant left-handed strokeplay: 42(30) with 5 fours, 1 six"
    },
    {
      studentId: "stud_aniket_bhat",
      runs: 15,
      wickets: 3,
      catches: 0,
      notes: "Mesmerizing chinaman spell: 3/26 in 4 overs"
    },
    {
      studentId: "stud_siddharth_menon",
      runs: 8,
      wickets: 0,
      catches: 1,
      notes: "Wicketkeeping duties: 1 catch behind the stumps; 8(10)"
    }
  ];

  for (const perf of match2Performances) {
    await prisma.playerPerformance.create({
      data: {
        matchId: match2.id,
        studentId: perf.studentId,
        runs: perf.runs,
        wickets: perf.wickets,
        catches: perf.catches,
        notes: perf.notes
      }
    });
  }

  // --- Match 3: Grand Final (Thunderbolts XI vs Titans XI) ---
  const match3 = await prisma.match.create({
    data: {
      id: "match_summer_final",
      tournamentId: tournament.id,
      opponent: "Titans XI (Grand Final)",
      date: new Date("2026-06-21T14:00:00.000Z"),
      result: MatchResult.WON // Thunderbolts XI won by 18 runs
    }
  });

  const match3Performances = [
    // Thunderbolts XI
    {
      studentId: "stud_aarav_sharma",
      runs: 74,
      wickets: 2,
      catches: 1,
      notes: "Player of the Tournament: 74(46) with 8 fours, 3 sixes; 2/22 in 4 overs"
    },
    {
      studentId: "stud_devendra_rao",
      runs: 19,
      wickets: 3,
      catches: 1,
      notes: "Purple Cap winner: 3/22 in 4 overs (7 total tournament wickets)"
    },
    {
      studentId: "stud_ishaan_nair",
      runs: 31,
      wickets: 0,
      catches: 2,
      notes: "Best Fielder: 31*(22); 2 spectacular diving catches in the deep"
    },
    {
      studentId: "stud_samar_sen",
      runs: 12,
      wickets: 1,
      catches: 0,
      notes: "Fast yorkers in 19th over: 1/25 in 4 overs; 12(9)"
    },
    {
      studentId: "stud_manan_trivedi",
      runs: 5,
      wickets: 0,
      catches: 1,
      notes: "Sliding boundary stop and catch at short third man"
    },
    // Titans XI
    {
      studentId: "stud_yashodhan_kulkarni",
      runs: 36,
      wickets: 2,
      catches: 0,
      notes: "Grand Final fightback: 36(24) with 4 boundaries; 2/28 in 4 overs"
    },
    {
      studentId: "stud_kabir_singh",
      runs: 48,
      wickets: 0,
      catches: 0,
      notes: "Masterful cover-driving: 48(35) with 6 fours"
    },
    {
      studentId: "stud_aditya_patil",
      runs: 25,
      wickets: 1,
      catches: 1,
      notes: "Power-hitting resistance: 25(19) with 2 fours; 1/32 in 3.3 overs"
    },
    {
      studentId: "stud_advait_chatterjee",
      runs: 10,
      wickets: 1,
      catches: 0,
      notes: "Tidy middle spell: 1/24 in 3 overs; 10(8)"
    },
    {
      studentId: "stud_shaurya_gupta",
      runs: 7,
      wickets: 1,
      catches: 0,
      notes: "Trapped top-order bat LBW with flipper: 1/27 in 3 overs"
    }
  ];

  for (const perf of match3Performances) {
    await prisma.playerPerformance.create({
      data: {
        matchId: match3.id,
        studentId: perf.studentId,
        runs: perf.runs,
        wickets: perf.wickets,
        catches: perf.catches,
        notes: perf.notes
      }
    });
  }

  const totalPerformances = match1Performances.length + match2Performances.length + match3Performances.length;
  console.log(`✓ Seeded Tournament Matches & ${totalPerformances} Player Performance records.\n`);

  // =========================================================================
  // 5. TOURNAMENT LEADERBOARD SUMMARY PREVIEW
  // =========================================================================
  console.log("=========================================================");
  console.log("🌟 SUMMER CUP 2026 TOURNAMENT LEADERBOARD PREVIEW");
  console.log("=========================================================");

  const leaderboard = await prisma.playerPerformance.groupBy({
    by: ["studentId"],
    _sum: {
      runs: true,
      wickets: true,
      catches: true
    },
    _count: {
      matchId: true
    }
  });

  const studentsMap = new Map(createdStudents.map((s) => [s.id, s]));

  const sortedByRuns = [...leaderboard].sort((a, b) => (b._sum.runs ?? 0) - (a._sum.runs ?? 0));
  const sortedByWickets = [...leaderboard].sort((a, b) => (b._sum.wickets ?? 0) - (a._sum.wickets ?? 0));
  const sortedByCatches = [...leaderboard].sort((a, b) => (b._sum.catches ?? 0) - (a._sum.catches ?? 0));

  console.log("\n🏏 TOP 5 RUN SCORERS (Orange Cap):");
  sortedByRuns.slice(0, 5).forEach((p, idx) => {
    const student = studentsMap.get(p.studentId);
    console.log(`  ${idx + 1}. ${student?.name.padEnd(22)}: ${p._sum.runs} runs (${p._count.matchId} matches)`);
  });

  console.log("\n🎯 TOP 5 WICKET TAKERS (Purple Cap):");
  sortedByWickets.slice(0, 5).forEach((p, idx) => {
    const student = studentsMap.get(p.studentId);
    console.log(`  ${idx + 1}. ${student?.name.padEnd(22)}: ${p._sum.wickets} wickets (${p._count.matchId} matches)`);
  });

  console.log("\n🧤 TOP 5 FIELDERS (Catches):");
  sortedByCatches.slice(0, 5).forEach((p, idx) => {
    const student = studentsMap.get(p.studentId);
    console.log(`  ${idx + 1}. ${student?.name.padEnd(22)}: ${p._sum.catches} catches (${p._count.matchId} matches)`);
  });

  console.log("\n=========================================================");
  console.log("✅ Seed completed successfully with realistic academy data!");
  console.log("=========================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
