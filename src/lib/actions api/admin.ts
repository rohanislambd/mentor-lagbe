import { protectedMutation } from "../common/protecdapi";
import { ApprovalStatus } from "../../../teype/tuitiontype";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type { ApprovalStatus };

export const updateTuitionApprovalStatus = async (
  id: string,
  status: ApprovalStatus
) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

  const api = `${baseUrl}/alltuitions/${id}/approve`
  const payload = {
    approvalStatus: status,
  };

  const res = await protectedMutation(api, "PATCH", payload)
   return res.json()
};
