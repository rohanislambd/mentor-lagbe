import { AdminStats } from "../../../teype/admintype";
import { getTokenServer } from "../common/getTokenServer";

export type { AdminStats };

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
};



/**
 * Server-side function to fetch platform statistics for admin dashboard
 * Endpoint: GET /admin/stats
 */
export const getAdminStats = async (): Promise<AdminStats | null> => {
  try {
    const token = await getTokenServer();
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

    const headers: Record<string, string> = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}/admin/stats`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch admin stats:", res.status);
      return null;
    }

    const data = await res.json();
    return data?.data || data?.result || data || null;
  } catch (error) {
    console.error("Get Admin Stats Error:", error);
    return null;
  }
};