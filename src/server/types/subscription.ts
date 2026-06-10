export type SubscriptionStatus = 'pending' | 'active' | 'expired' | 'canceled';

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  pricePerMonth: number | null;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
}
