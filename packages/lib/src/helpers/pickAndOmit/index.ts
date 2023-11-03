import omit from 'lodash/omit';
import pick from 'lodash/pick';

/**
 * Returns an array of 2 objects,
 * first, the result of calling `_.pick`,
 * second, the result of calling `_.omit`
 *
 * e.g.
 * ```js
 * const obj = { a: 'A', b: 'B', c: 'C', d: 'D' }
 * pickAndOmit(obj, ['a', 'b']) // [{a: "A", b: "B"}, {c: "C", d: "D"}]
 * ```
 */
export const pickAndOmit = <T extends object, K extends keyof T>(
  object: T,
  keys: Array<K>,
): [Pick<T, K>, Omit<T, K>] => {
  const picked = pick(object, keys);
  const omitted = omit(object, keys);

  return [picked, omitted];
};
