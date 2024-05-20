import type { API, FileInfo } from 'jscodeshift';

import { getJSXAttributes } from '../../transformations';

import { insertJSXComment } from './insertJSXComment';

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
