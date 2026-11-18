import { authClient } from "../auth-client";

export const getTokenClient = async() => {
    const {data} = await  authClient.token();
     const token = data?.token 
     return token;
}





// Client Component ("use client"-এ): ব্রাউজারে যখন কোড চলে, তখন authClient.token() ব্রাউজারের কুকি নিজে থেকেই সাথে নিয়ে সার্ভারে রিকোয়েস্ট পাঠায়। তাই authClient.token() ক্লায়েন্টে ঠিকমতো কাজ করে 

