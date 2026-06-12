const PASSWORD_MIN_LENGTH = 8;

export function validateEmail(email?: string): boolean {
  if (!email) {
    return false;
  }

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
}

export function validatePassword(password?: string): boolean {
  if (!password) {
    return false;
  }
  return password.length >= PASSWORD_MIN_LENGTH;
}

export function missingLoginFields(email?: string, password?: string): boolean {
  return !email || !password;
}

export function missingSignupFields(email?: string, password?: string, name?: string): boolean {
  return !email || !password || !name;
}
