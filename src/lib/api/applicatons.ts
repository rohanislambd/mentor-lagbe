import { getTokenServer } from "../common/getTokenServer";
import { TuitionApplication } from "../../../teype/tuitiontype";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getStudentApplications = async (): Promise<TuitionApplication[]> => {
  try {
    const token = await getTokenServer();
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

    const headers: Record<string, string> = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}/applications`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch student applications:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || data?.result || [];
  } catch (error) {
    console.error("Get Student Applications Error:", error);
    return [];
  }
};
