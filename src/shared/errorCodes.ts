/**
 * Error codes returned by the API as `errorCode` in error response bodies,
 * so the client can react to specific failures (e.g. show a custom message).
 *
 * Format: ERR_SSSEE
 * - SSS: 3-digit service code (e.g. 001 = Auth), incremented as new services are added
 * - EE:  2-digit error code, specific to that service
 */
export const ErrorCodes = {
  // 001 - Auth
  Auth: {
    INVALID_CREDENTIALS: 'ERR_00101',
    USE_GOOGLE_LOGIN: 'ERR_00102',
    MISSING_FIELDS: 'ERR_00103',
    INVALID_EMAIL_FORMAT: 'ERR_00104',
  },
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
