import type { API, FileInfo } from 'jscodeshift';

import { replaceJSXAttributes } from '../../../utils/jsx/replaceJSXAttributes';

export default function transformer(file: FileInfo, { jscodeshift: j }: API) {
  const componentName = 'MyComponent';
  const from = 'prop';
  const newValue = 'newPropValue';

  const source = j(file.source);

  source.findJSXElements(componentName).forEach(element => {
    replaceJSXAttributes(j, element, from, from, newValue);
  });

  return source.toSource();
}
