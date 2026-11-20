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

export const deleteApplication = async (id: string) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/applications/${id}`;
  const res = await protectedMutation(api, "DELETE");
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.message || result?.error || "Failed to cancel application");
  }
  return result;
};
