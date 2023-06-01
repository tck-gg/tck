/**
 * Checks if a string is formatted like an email.
 * @param email The email to check.
 * @returns Whether the string is an email.
 */
export function isValidEmail(email: string) {
  const results = email.match(/^\S+@\S+\.\S+$/);
  return results !== null;
}
