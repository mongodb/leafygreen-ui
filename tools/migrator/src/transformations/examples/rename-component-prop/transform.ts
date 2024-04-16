import type { API, FileInfo } from 'jscodeshift';

import { replaceJSXAttributes } from '../../../utils/jsx/replaceJSXAttributes';

export default function transformer(file: FileInfo, { jscodeshift: j }: API) {
  const componentName = 'MyComponent';
  const from = 'prop';
  const to = 'newProp';

  const source = j(file.source);

  source.findJSXElements(componentName).forEach(element => {
    replaceJSXAttributes(j, element, from, to);
  });

  return source.toSource();
}
