export interface AdminStats {
  totalUsers?: number;
  totalStudents?: number;
  totalTutors?: number;
  totalTuitions?: number;
  pendingTuitions?: number;
  approvedTuitions?: number;
  totalApplications?: number;
  totalPayments?: number;
  totalRevenue?: number;
  [key: string]: unknown;
}