import { protectedMutation } from "../common/protecdapi";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface UpdateProfileInput {
  name: string;
  phone?: string;
  bio?: string;
  image?: string;
}

export const updateUserProfile = async (data: UpdateProfileInput) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/users/profile`;
  const res = await protectedMutation(api, "PATCH", data);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.message || result?.error || "Failed to update profile");
  }
  return result;
};

export const getCurrentUserProfile = async () => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/users/me`;
  const res = await protectedMutation(api, "GET");
  if (!res.ok) return null;
  return res.json();
};
