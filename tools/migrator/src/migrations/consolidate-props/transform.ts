import type { API, FileInfo } from 'jscodeshift';

import {
  consolidateJSXAttributes,
  ConsolidateJSXAttributesOptions,
} from '../../utils/transformations';

type TransformerOptions = ConsolidateJSXAttributesOptions & {
  componentName: string;
};

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: TransformerOptions,
) {
  const source = j(file.source);

  const {
    propToRemove = 'propToRemove',
    propToUpdate = 'propToUpdate',
    propMapping = {
      value2: 'value3',
    },
    propToRemoveType = 'string',
    componentName = 'MyComponent',
  } = options;

  // Check if the element is on the page
  const elements = source.findJSXElements(componentName);

  // If there are no elements then return the original file
  if (elements.length === 0) return file.source;

  elements.forEach(element => {
    consolidateJSXAttributes({
      j,
      element,
      propToRemove,
      propToUpdate,
      propMapping,
      propToRemoveType,
    });
  });

  return source.toSource();
}
