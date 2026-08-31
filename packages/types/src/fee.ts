export type PaymentStatus = "PAID" | "UNPAID" | "OVERDUE";

export type PaymentType = "MONTHLY" | "MATCH" | "TOURNAMENT";

export type PaymentMethod =
  | "UPI"
  | "CASH"
  | "BANK_TRANSFER"
  | "CARD"
  | "CHEQUE";

export interface FeePayment {
  id: string;
  studentId: string;
  amount: number;
  paidOn?: Date | string | null;
  dueDate: Date | string;
  status: PaymentStatus;
  method?: PaymentMethod | string | null;
  proofUrl?: string | null;
  type: PaymentType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface FeeSummary {
  totalCollected: number;
  totalPending: number;
  totalOverdue: number;
  paidCount: number;
  unpaidCount: number;
  overdueCount: number;
}
