import type { ASTPath } from 'jscodeshift';
import type core from 'jscodeshift';

import { getJSXAttributes } from './getJSXAttributes';

export interface ReplaceJSXAttributesType {
  j: core.JSCodeshift;
  element: ASTPath<any>;
  attributeName: string;
  newAttributeName: string;
  newAttributeValue?:
    | string
    | {
        [key: string]: string;
      };
}

/**
 *
 * @param j
 * @param element
 * @param attributeName
 * @param newAttributeName
 * @param newAttributeValue
 * @returns
 */
export function replaceJSXAttributes({
  j,
  element,
  attributeName,
  newAttributeName,
  newAttributeValue,
}: ReplaceJSXAttributesType) {
  // returns a Collection(Array) of NodePaths that we loop through.
  // Each attribute is a NodePath
  return getJSXAttributes(j, element, attributeName).forEach(attribute => {
    attribute.node.name.name = newAttributeName;

    if (!newAttributeValue) {
      return;
    }

    j(attribute)
      .find(j.StringLiteral)
      .forEach(literal => {
        const isStringLiteral = typeof newAttributeValue === 'string';

        if (isStringLiteral) {
          literal.node.value = newAttributeValue;
          return;
        }

        const value = literal.node.value;

        if (value in newAttributeValue) {
          literal.node.value = newAttributeValue[value];
        }
      });
  });
}
