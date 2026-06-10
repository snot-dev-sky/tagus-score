export type SubscriptionStatus = 'pending' | 'active' | 'expired' | 'canceled';

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  price_per_month: number | null;
  start_date: Date;
  end_date: Date | null;
  created_at: Date;
}
