export interface PaymentTransaction {
  _id?: string;
  userEmail: string;
  userName?: string;
  userRole?: string;
  planName?: string;
  amount: number;
  currency?: string;
  transactionId?: string;
  stripeSessionId?: string;
  paymentStatus?: string;
  paidAt?: string | Date;
  createdAt?: string | Date;
}