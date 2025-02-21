import { isString } from '../helpers';

/**
 * Generates a space-separated string of CSS class names based on an array of kinds.
 * Each kind is prefixed with a specified prefix, unless it already has the prefix.
 * If a kind contains dots, it splits the kind and applies the prefix to each part.
 *
 * @param kinds - An array of strings or mixed types that will be filtered to include only non-empty strings
 * @param prefix - Optional prefix for the generated class names. Defaults to 'lg-highlight-'
 * @returns A space-separated string of CSS class names
 * @example
 * generateKindClassName(['type', 'keyword']) // Returns "lg-highlight-type lg-highlight-keyword"
 * generateKindClassName(['class.name']) // Returns "lg-highlight-class lg-highlight-name"
 * generateKindClassName(['lg-highlight-existing']) // Returns "lg-highlight-existing"
 */

export function generateKindClassName(
  kinds: Array<any>,
  prefix = 'lg-highlight-',
): string {
  return kinds
    .filter((str): str is string => isString(str) && str.length > 0)
    .map(kind => {
      // Sometimes, a kind will have run through this function before.
      // This ensures we don't duplicate prefixes.
      if (kind.startsWith(prefix)) {
        return kind;
      }

      const classes = kind
        .split('.')
        .map(k => `${prefix}${k}`)
        .join(' ');

      return classes;
    })
    .join(' ');
}
