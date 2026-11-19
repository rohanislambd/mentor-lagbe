import { getTokenServer } from "../common/getTokenServer";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getMyTuitions = async () => {
  try {
    const token = await getTokenServer();

    const res = await fetch(`${BASE_URL}/tuitions/my-tuitions`, {
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

