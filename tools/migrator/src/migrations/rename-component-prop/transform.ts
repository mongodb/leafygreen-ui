import type { API, FileInfo } from 'jscodeshift';

import {
  replaceJSXAttributes,
  ReplaceJSXAttributesType,
} from '../../utils/transformations';

type TransformerOptions = ReplaceJSXAttributesType & { componentName: string };

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: TransformerOptions,
) {
  const {
    propName = 'prop',
    newPropName = 'newProp',
    componentName = 'MyComponent',
  } = options;

  const source = j(file.source);

  source.findJSXElements(componentName).forEach(element => {
    replaceJSXAttributes({ j, element, propName, newPropName });
  });

  return source.toSource();
}
