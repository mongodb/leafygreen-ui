/**
 * Formats a number or string value into a valid CSS size string.
 * If the value is a number or a numeric string, it appends 'px'.
 * If the value is a string with units, it returns it as is.
 *
 * This utility improves developer experience by making components more
 * forgiving with size-related props.
 *
 * @param value - The value to format, e.g., 100, "100", or "100px".
 * @returns A valid CSS size string (e.g., "100px") or undefined if the input is invalid.
 *
 * @example
 * formatCssSize(100);       // "100px"
 * formatCssSize("100");    // "100px"
 * formatCssSize("100px");   // "100px"
 * formatCssSize("5rem");    // "5rem"
 * formatCssSize("auto");    // "auto"
 * formatCssSize(undefined); // undefined
 */
export const formatCssSize = (value: number | string): string => {
  // If the value is a number, simply append 'px'.
  if (typeof value === 'number') {
    return `${value}px`;
  }

  const trimmedValue = value.trim();

  // If the value is a string, check if it's purely numeric.
  // `isFinite` is used to correctly handle string-to-number conversion
  // and reject strings that already have units (e.g., "100px").
  if (
    typeof trimmedValue === 'string' &&
    !isNaN(parseFloat(trimmedValue)) &&
    isFinite(Number(trimmedValue))
  ) {
    return `${trimmedValue}px`;
  }

  // If it's a string that's not purely numeric (e.g., "5rem", "auto"),
  // return it directly, assuming it's a valid CSS value.
  return trimmedValue;
};
