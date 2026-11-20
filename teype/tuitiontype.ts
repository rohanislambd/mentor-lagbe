export type TuitionMode = "Online" | "Offline";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Tuition {
  _id?: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: TuitionMode;
  location: string;
  monthlyFee: number;
  daysPerWeek: number | string;
  bannerImage: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: ApprovalStatus;
  isActive: boolean;
}

export type CreateTuitionInput = Omit<Tuition, "_id">;
export type UpdateTuitionInput = Partial<CreateTuitionInput>;

export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface TuitionApplication {
  _id?: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorName?: string;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote?: string;
  status: ApplicationStatus;
  appliedAt?: string | Date;
  appiedAt?: string | Date;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateApplicationInput = Omit<TuitionApplication, "_id" | "createdAt" | "updatedAt">;
