/**
 * Determines if a string has multiple lines. This is determined by the presence of a newline character
 * @param string
 * @returns boolean
 */
export function hasMultipleLines(string: string): boolean {
  return string.trim().includes('\n');
}
