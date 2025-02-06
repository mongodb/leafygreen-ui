/**
 * Returns whether the provided string is a valid Intl.Locale string
 */
export function isValidLocale(str?: string): str is string {
  if (!str) return false;

  try {
    new Intl.Locale(str);
  } catch (error) {
    console.error(error, `Received ${str}`);
    return false;
  }

  return true;
}
