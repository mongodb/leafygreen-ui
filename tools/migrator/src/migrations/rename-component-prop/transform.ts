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

  // Check if the element is on the page
  const elements = source.findJSXElements(componentName);

  // If there are not elements then return the original file
  if (elements.length === 0) return file.source;

  elements.forEach(element => {
    replaceJSXAttributes({ j, element, propName, newPropName });
  });

  return source.toSource();
}
