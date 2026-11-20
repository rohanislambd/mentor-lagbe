import { protectedMutation } from "../common/protecdapi";
import { CreateApplicationInput } from "../../../teype/tuitiontype";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createApplication = async (data: CreateApplicationInput) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/applications`;
  const res = await protectedMutation(api, "POST", data);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.message || result?.error || "Failed to submit application");
  }
  return result;
};
