import { authClient } from "../auth-client"

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const getToken = async() => {
    const {data} = await  authClient.token();
     const token = data?.token
     return token;
}


export const authFetch =async (api: string) => {
    const token = await getToken();
    const res = await fetch(api, {
          headers:{
            authorization: `Bearer ${token}`
        }
    })
    return res;

}


export const protectedMutation = async (api: string, method: string, data?: unknown) =>{
    const token = await getToken()
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