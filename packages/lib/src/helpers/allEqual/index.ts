/**
 * Utility function that checks if the values in an array are all equal
 *
 *
 * @param arr `Array<any>`
 * @returns boolean
 */
export function allEqual<T>(arr: Array<T>): boolean {
  return new Set(arr).size == 1;
}
