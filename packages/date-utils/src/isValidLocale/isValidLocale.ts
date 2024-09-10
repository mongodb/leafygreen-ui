/**
 * Returns whether the provided string is a valid Intl.Locale string
 */
export function isValidLocale(str?: string): str is string {
  if (!str) return false;

  try {
    new Intl.Locale(str);
  } catch (error) {
    return false;
  }

  return true;
}
