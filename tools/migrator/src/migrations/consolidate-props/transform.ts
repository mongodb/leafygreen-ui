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
    fromPropType = 'string',
    componentName = 'MyComponent',
  } = options;

  source.findJSXElements(componentName).forEach(element => {
    consolidateJSXAttributes({
      j,
      element,
      propToRemove,
      propToUpdate,
      propMapping,
      fromPropType,
    });
  });

  return source.toSource();
}
