import { PaymentTransaction } from "../../../teype/paymettype";
import { getTokenServer } from "../common/getTokenServer";

export type { PaymentTransaction };

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


/**
 * Server-side function to fetch all payments/transactions from the backend
 * Endpoint: GET /payments
 */
export const getAllPayments = async (): Promise<PaymentTransaction[]> => {
  try {
    const token = await getTokenServer();
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";

    const headers: Record<string, string> = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}/payments`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch payments:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || data?.result || [];
  } catch (error) {
    console.error("Get All Payments Error:", error);
    return [];
  }
};

export const getPayments = getAllPayments;
