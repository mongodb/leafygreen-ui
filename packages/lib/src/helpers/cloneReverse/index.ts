export const cloneReverse = <T extends any>(
  arr?: Array<T>,
): Array<T> | undefined => {
  if (!(arr && Array.isArray(arr))) return;

  const clone = [...arr];
  clone.reverse();
  return clone;
};
