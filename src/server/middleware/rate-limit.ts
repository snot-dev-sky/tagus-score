import type { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../constants/errorCodes';

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS = 100;

/**
 * In-memory sliding-window rate limiter keyed by formId.
 * Limits public form submissions to MAX_SUBMISSIONS per formId per hour.
 *
 * NOTE: state is per-process — it resets on restart and is not shared across
 * instances. Sufficient for the MVP; move to Redis for multi-instance prod.
 */
const submissions = new Map<string, number[]>();

export function formSubmissionRateLimit(req: Request, res: Response, next: NextFunction) {
  const formId = req.params.formId;
  if (!formId) {
    return next();
  }

  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const recent = (submissions.get(formId) ?? []).filter((ts) => ts > windowStart);

  if (recent.length >= MAX_SUBMISSIONS) {
    submissions.set(formId, recent);
    return res.status(429).json({
      error: 'Too many submissions, please try again later',
      errorCode: ErrorCodes.Form.RATE_LIMITED,
    });
  }

  recent.push(now);
  submissions.set(formId, recent);
  next();
}
