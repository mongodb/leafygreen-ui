import { FlatTokenObject } from '../../renderingPlugin.types';

/**
 * Merge consecutive strings into a single string.
 *
 * E.g.
 * ```js
 * ['_', 'hello ', 'world ', 'hi', {}, 'bye ', '_', 'hello '] => ['_hello world hi', {}, 'bye _hello']
 * ```
 */
export const mergeStringsIntoString = (
  children: Array<string | FlatTokenObject>,
) => {
  return children.reduce(
    (acc: Array<string | FlatTokenObject>, child: string | FlatTokenObject) => {
      const lastItem = acc[acc.length - 1];

      if (typeof child === 'string' && typeof lastItem === 'string') {
        acc[acc.length - 1] = lastItem + child;
      } else {
        acc.push(child);
      }

      return acc;
    },
    [],
  );
};
