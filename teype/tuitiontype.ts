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
  createdAt?: string | Date;
}

export type CreateTuitionInput = Omit<Tuition, "_id" | "createdAt">;
