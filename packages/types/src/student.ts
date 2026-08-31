export type BattingStyle =
  | "RIGHT_HAND"
  | "LEFT_HAND";

export type BowlingStyle =
  | "RIGHT_ARM_FAST"
  | "RIGHT_ARM_MEDIUM"
  | "RIGHT_ARM_SPIN_OFF"
  | "RIGHT_ARM_SPIN_LEG"
  | "LEFT_ARM_FAST"
  | "LEFT_ARM_MEDIUM"
  | "LEFT_ARM_SPIN_ORTHODOX"
  | "LEFT_ARM_SPIN_CHINAMAN"
  | "NONE";

export interface Student {
  id: string;
  name: string;
  photoUrl?: string | null;
  dateOfBirth: Date | string;
  phone: string;
  guardianPhone: string;
  battingStyle: BattingStyle | string;
  bowlingStyle: BowlingStyle | string;
  joinedDate: Date | string;
  batch: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface StudentWithStats extends Student {
  totalRuns?: number;
  totalWickets?: number;
  matchesPlayed?: number;
  pendingFeesCount?: number;
}
