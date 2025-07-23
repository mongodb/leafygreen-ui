import { FlatTokenObject } from '../../renderingPlugin.types';
import { generateKindClassName } from '../generateKindClassName/generateKindClassName';
import { mergeStringsIntoString } from '../mergeStringsIntoString/mergeStringsIntoString';

/**
 * Maps over the merged lines and checks if the line contains any of the keywords. If it does, it splits the line by the keyword and returns a new entity with a custom kind.
 *
 * E.g.
 *
 * ```js
 * keywords: { '_hello': 'custom' }
 * ```
 *
 * ```js
 * ['_hello world hi', {}, 'bye _hello'] => [{ kind: 'lg-highlight-custom', children: ['_hello'] }, 'world ', 'hi', {}, 'bye', { kind: 'lg-highlight-custom', children: ['_hello'] }]
 * ```
 */
export const lineWithKeywords = (
  line: Array<string | FlatTokenObject>,
  customKeyWords: Record<string, string>,
) => {
  const mergedLines = mergeStringsIntoString(line);

  return mergedLines
    .map((segment: string | FlatTokenObject) => {
      if (typeof segment === 'string') {
        // Creates a regex pattern to match all keywords
        // E.g. /(testing|api|username)/g
        const keywordPattern = new RegExp(
          `(${Object.keys(customKeyWords).join('|')})`,
          'g',
        );

        // Return unchanged if no keywords found
        if (!keywordPattern.test(segment)) {
          return segment;
        }

        // Split the line by the keywords
        const splitContentByKeywords = segment
          .split(keywordPattern)
          .filter(Boolean); // Remove empty strings

        // Map over the split content and return a new entity with a custom kind if the keyword is found
        return splitContentByKeywords.map(str =>
          customKeyWords[str]
            ? {
                kind: generateKindClassName([customKeyWords[str]]),
                children: [str],
              }
            : str,
        );
      }

      return segment;
    })
    .flat();
};
