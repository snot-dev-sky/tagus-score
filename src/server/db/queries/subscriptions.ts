import { query, type Queryable } from '../index';
import type { Subscription } from '../../types';

export async function createPendingSubscription(executor?: Queryable): Promise<Subscription> {
  const { rows } = await query<Subscription>(
    `INSERT INTO subscriptions (status, price_per_month)
     VALUES ('pending', NULL)
     RETURNING id, status, price_per_month AS "pricePerMonth", start_date AS "startDate",
               end_date AS "endDate", created_at AS "createdAt"`,
    [],
    executor,
  );
  return rows[0];
}
