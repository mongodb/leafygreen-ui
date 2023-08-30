/** Returns whether the provided value is some form of zero value */
export const isZeroLike = (val: any) =>
  !val || isNaN(val) || ['', '0', '00', 0].includes(val);
