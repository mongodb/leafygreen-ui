/**
 * Checks if the key is a single digit.
 *
 * @param key - The key to check.
 * @returns True if the key is a single digit, false otherwise.
 */
export const isSingleDigitKey = (key: string): boolean => /^[0-9]$/.test(key);
