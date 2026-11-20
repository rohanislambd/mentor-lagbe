import { getTokenServer } from "../common/getTokenServer";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAdminAllTuitions = async () => {
  try {
   
    const token = await getTokenServer();
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

    const headers: Record<string, string> = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}/admin/tuitions`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch admin tuitions:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Get Admin All Tuitions Error:", error);
    return [];
  }
};



export const getAdminAllUsers = async () => {
  try {
    const token = await getTokenServer();
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

    const headers: Record<string, string> = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}/admin/users`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch admin users:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Get Admin All Users Error:", error);
    return [];
  }
}