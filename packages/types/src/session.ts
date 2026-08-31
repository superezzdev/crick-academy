export interface NetSession {
  id: string;
  date: Date | string;
  time: string; // e.g. "06:30 AM - 08:30 AM"
  capacity: number;
  feeAmount: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface SessionRegistration {
  id: string;
  sessionId: string;
  studentId: string;
  paid: boolean;
  registeredAt?: Date | string;
}

export interface NetSessionWithDetails extends NetSession {
  registrationsCount?: number;
  availableSlots?: number;
  isFull?: boolean;
}
