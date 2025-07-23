import type { API, FileInfo } from 'jscodeshift';

import { getJSXAttributes } from '../getJSXAttributes';

import { insertJSXComment } from './insertJSXComment';

/**
 * Example transformer function to add comments above or below a line of code. This function is only used for testing purposes.
 *
 * @param file The file to transform
 * @param jscodeshiftOptions an object containing at least a reference to the jscodeshift library
 * @returns The modified code
 */
export default function transformer(file: FileInfo, { jscodeshift: j }: API) {
  const source = j(file.source);

  source.findJSXElements('MyComponent').forEach(element => {
    return getJSXAttributes(j, element, 'prop').forEach(el => {
      // @ts-expect-error value does exist
      const position = el.value.value?.value;
      insertJSXComment(j, element, 'testing comment', position);
    });
  });

  return source.toSource();
}
