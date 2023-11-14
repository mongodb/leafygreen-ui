/**
 * Returns value if it is between lower & upper bounds (inclusive).
 * Returns the difference between value & relevant bound if outside the bounds
 *
 * e.g.:
 * `rollover(7, 0, 5) // 2`
 * `rollover(-1, 0, 5) // 4`
 */
export const rollover = (
  value: number,
  lowerBound: number,
  upperBound: number,
): number => {
  const range = upperBound - lowerBound;
  if (value > upperBound) {
    const diff = value - upperBound;
    return lowerBound + (diff % range);
  }
  if (value < lowerBound) {
    const diff = lowerBound - value;
    return upperBound - (diff % range);
  }
  return value;
};
