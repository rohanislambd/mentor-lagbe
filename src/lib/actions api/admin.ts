import { protectedMutation } from "../common/protecdapi";
import { ApprovalStatus, UserRole } from "../../../teype/tuitiontype";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type { ApprovalStatus, UserRole };

export const updateTuitionApprovalStatus = async (
  id: string,
  status: ApprovalStatus
) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

  const api = `${baseUrl}/alltuitions/${id}/approve`;
  const payload = {
    approvalStatus: status,
  };

  const res = await protectedMutation(api, "PATCH", payload);
  return res.json();
};

export const updateUserRole = async (id: string, role: UserRole) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/admin/users/${id}/role`;
  const payload = { role };

  const res = await protectedMutation(api, "PATCH", payload);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.message || result?.error || "Failed to update user role");
  }
  return result;
};
