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

// All Tuitions for Admin
export const getAllTuitions = async () => {
  try {
    const { getTokenServer } = await import("../common/getTokenServer");
    const token = await getTokenServer();
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

    const headers: Record<string, string> = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    let res = await fetch(`${baseUrl}/tuitions`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      res = await fetch(`${baseUrl}/tuitions/all`, {
        headers,
        cache: "no-store",
      });
    }

    if (!res.ok) {
      console.error("Failed to fetch all tuitions:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Get All Tuitions Error:", error);
    return [];
  }
};


// browse tuitions 
export const getBrowseTuitions = async (query = "") => {
  try {
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
    const res = await fetch(`${baseUrl}/tuitions?${query}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      console.error("Failed to fetch browse tuitions:", res.status);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Get Browse Tuitions Error:", error);
    return [];
  }
};
