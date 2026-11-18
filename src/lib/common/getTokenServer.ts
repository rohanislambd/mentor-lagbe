import { headers } from "next/headers";
import { auth } from "../auth";
import { authClient } from "../auth-client";

export const getTokenServer = async () => {
  const data = await auth.api.getToken({
    headers: await headers(),
  });
  return data?.token;
};


// Server Component (সার্ভার সাইডে): এখানে ব্রাউজার বা window থাকে না। সার্ভারে authClient.token() কল করলে সে ইউজারের ব্রাউজার কুকি (session cookie) পায় না। কুকি না পাওয়ার কারণে Better-Auth ইউজারের কোনো সেশন খুঁজে পায় না এবং data আসে null, ফলে token হয়ে যায় undefined (বা Bearer undefined)।