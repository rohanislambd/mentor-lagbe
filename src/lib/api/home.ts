const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface HomeTotalUserStats {
  totalTutors?: number;
  totalStudents?: number;
}

/**
 * Server-side function to fetch total tutor and student counts for Home page
 * This is a public endpoint — no auth token required
 * Endpoint: GET /home/totaluser
 */
export const getHomeTotalUsers = async (): Promise<HomeTotalUserStats | null> => {
  try {
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

    const res = await fetch(`${baseUrl}/home/totaluser`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch home total users:", res.status);
      return null;
    }

    const data = await res.json();
    return data?.data || data?.result || data || null;
  } catch (error) {
    console.error("Get Home Total Users Error:", error);
    return null;
  }
};
