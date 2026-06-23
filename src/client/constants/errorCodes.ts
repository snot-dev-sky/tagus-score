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
    EMAIL_ALREADY_EXISTS: 'ERR_00105',
    PASSWORD_TOO_SHORT: 'ERR_00106',
    NO_TOKEN: 'ERR_00107',
    INVALID_TOKEN: 'ERR_00108',
  },
  // 002 - Form (public form submission / validation)
  Form: {
    NOT_FOUND: 'ERR_00201',
    EXPIRED: 'ERR_00202',
    ALREADY_USED: 'ERR_00203',
    MISSING_FIELDS: 'ERR_00204',
    INVALID_EMAIL: 'ERR_00205',
    INVALID_CONTACT: 'ERR_00206',
    INVALID_BUDGET: 'ERR_00207',
    INVALID_DISTRICT: 'ERR_00208',
    INVALID_TYPE: 'ERR_00209',
    RATE_LIMITED: 'ERR_00210',
    SUBMIT_FAILED: 'ERR_00211',
    LOOKUP_FAILED: 'ERR_00212',
  },
  // 004 - Lead
  Lead: {
    FETCH_FAILED: 'ERR_00401',
    INVALID_PAGINATION: 'ERR_00402',
    NOT_FOUND: 'ERR_00403',
  },
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
