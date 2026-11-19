const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMyTuitions = async () => {
  try {
    const { getTokenServer } = await import("../common/getTokenServer");
    const token = await getTokenServer();
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

    const res = await fetch(`${baseUrl}/tuitions/my-tuitions`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch tuitions:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Get My Tuitions Error:", error);
    return [];
  }
};

// Single Tuition Details
export const getTuitonDetailById = async (id: string) => {
  try {
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
    const res = await fetch(`${baseUrl}/tuitions/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch tuition:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Get Tuition Detail Error:", error);
    return null;
  }
};
