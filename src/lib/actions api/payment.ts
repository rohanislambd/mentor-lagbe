import { protectedMutation } from "../common/protecdapi";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CheckoutSessionResponse {
  url: string;
}

export interface PaymentDetails {
  userEmail?: string;
  userName?: string;
  userRole?: string;
  planName?: string;
  amount?: number;
  currency?: string;
  transactionId?: string;
  stripeSessionId?: string;
  paymentStatus?: string;
  paidAt?: string | Date;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
  alreadyVerified?: boolean;
  payment?: PaymentDetails;
  result?: unknown;
  updateResult?: unknown;
}

/**
 * Calls backend to create a Stripe Checkout Session
 * Endpoint: POST /payments/create-checkout-session
 */
export const createCheckoutSession = async (
  targetPlan?: string
): Promise<CheckoutSessionResponse> => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/payments/create-checkout-session`;

  const res = await protectedMutation(api, "POST", targetPlan ? { targetPlan } : undefined);
  const result = await res.json();

  if (!res.ok || !result?.url) {
    throw new Error(result?.message || result?.error || "Failed to initiate Stripe checkout");
  }

  return result as CheckoutSessionResponse;
};

/**
 * Calls backend to verify a completed Stripe payment
 * Endpoint: POST /payments/checkout-verify
 */
export const verifyPaymentSession = async (
  sessionId: string
): Promise<VerifyPaymentResponse> => {
  try {
    const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
    const api = `${baseUrl}/payments/checkout-verify`;

    const res = await protectedMutation(api, "POST", { sessionId });

    let result: VerifyPaymentResponse = { success: false };
    const text = await res.text();
    try {
      result = JSON.parse(text);
    } catch {
      result = { success: false, message: text || `HTTP ${res.status}: ${res.statusText}` };
    }

    if (!res.ok || result?.success === false) {
      // If the backend says "already verified", it's already recorded in DB successfully
      if (result?.message?.toLowerCase().includes("already verified")) {
        return { ...result, success: true, alreadyVerified: true };
      }
      throw new Error(result?.message || "Payment verification failed");
    }

    return result as VerifyPaymentResponse;
  } catch (error) {
    console.error("[verifyPaymentSession] Error:", error);
    throw error;
  }
};
