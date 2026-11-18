import { getTokenServer } from "../common/getTokenServer";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getMyTuitions = async () => {
   const token = await getTokenServer()
  const res = await fetch(`${BASE_URL}/tuitions/my-tuitions`, {
     headers: {
        authorization: `Bearer ${token}`
     }
  })
  return res.json();
};



