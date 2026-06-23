import { isValidDistrict } from '../constants/districts';

const CONTACT_REGEX = /^\d{9}$/;

export function validateContact(contact?: string): boolean {
  if (!contact) {
    return false;
  }
  return CONTACT_REGEX.test(contact);
}

export function validateBudget(budget?: unknown): boolean {
  return typeof budget === 'number' && Number.isInteger(budget) && budget > 0;
}

export function validateDistrict(district?: string): boolean {
  if (!district) {
    return false;
  }
  return isValidDistrict(district);
}

export function validateLeadType(type?: unknown): type is string[] {
  return (
    Array.isArray(type) &&
    type.length > 0 &&
    type.every((t) => typeof t === 'string' && t.trim().length > 0)
  );
}

export function isNonEmptyString(value?: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
