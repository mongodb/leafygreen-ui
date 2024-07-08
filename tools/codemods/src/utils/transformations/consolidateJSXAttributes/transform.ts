import type { API, FileInfo } from 'jscodeshift';

import {
  consolidateJSXAttributes,
  ConsolidateJSXAttributesOptions,
} from '../consolidateJSXAttributes';

type TransformerOptions = ConsolidateJSXAttributesOptions & {
  componentName: string;
};

/**
 * Example transformer function to consolidate props
 *
 * @param file the file to transform
 * @param jscodeshiftOptions an object containing at least a reference to the jscodeshift library
 * @param options an object containing options to pass to the transform function
 * @returns Either the modified file or the original file
 */
export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: TransformerOptions,
) {
  const source = j(file.source);

  const {
    propToRemove,
    propToUpdate,
    propMapping,
    propToRemoveType,
    componentName,
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
