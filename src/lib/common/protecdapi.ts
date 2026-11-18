import { getTokenClient } from "./getTokenClient";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;




export const protectedMutation = async (api: string, method: string, data?: unknown) =>{
    const token = await getTokenClient()
     const res = await fetch(api,{

         method: method,
        headers: {
             "Content-Type": "application/json",
              authorization: `Bearer ${token}`
        },
        body: data ? JSON.stringify(data) : null 
     })
     return res;
}



