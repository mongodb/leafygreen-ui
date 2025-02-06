/**
 * Returns whether the provided string is a valid Intl.Locale string
 */
export function isValidLocale(localeString?: string): localeString is string {
  if (!localeString) return false;

  try {
    new Intl.Locale(localeString);
  } catch (error) {
    console.error({ localeString }, error);
    return false;
  }

  return true;
}
