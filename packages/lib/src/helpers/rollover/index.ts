/**
 * Returns value if it is between lower & upper bounds (inclusive).
 * Returns the difference between value & relevant bound if outside the bounds
 *
 * e.g.:
 * `rollover(6, 1, 5) // 1`
 * `rollover(0, 1, 5) // 5`
 */
export const rollover = (
  value: number,
  lowerBound: number,
  upperBound: number,
): number => {
  const range = upperBound - lowerBound;

  if (value > upperBound) {
    const diff = value - upperBound - 1;
    return lowerBound + (diff % range);
  } else if (value < lowerBound) {
    const diff = lowerBound - value - 1;
    return upperBound - (diff % range);
  }

  return value;
};
