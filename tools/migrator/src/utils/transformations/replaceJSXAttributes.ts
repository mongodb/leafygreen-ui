import type { ASTPath } from 'jscodeshift';
import type core from 'jscodeshift';

import { getJSXAttributes } from './getJSXAttributes';

export interface ReplaceJSXAttributesType {
  j: core.JSCodeshift;
  element: ASTPath<any>;
  propName: string;
  newPropName: string;
  newPropValue?:
    | string
    | {
        [key: string]: string;
      };
}

/**
 * `replaceJSXAttributes` can replace both the name and value of an attribute.
 *
 * e.g:
 * ```tsx
 * propName: prop
 * newPropName: newProp
 *
 * Before:
 * <MyComponent prop='hey' />
 * After:
 * <MyComponent newProp='hey' />
 * -----------------------------------
 * propName: prop
 * newPropName: prop
 * newPropValue: {hey: 'hey new', bye: 'bye new`}
 *
 * Before:
 * <MyComponent prop='hey' />
 * After:
 * <MyComponent prop='hey new' />
 * ```
 */
export function replaceJSXAttributes({
  j,
  element,
  propName,
  newPropName,
  newPropValue,
}: ReplaceJSXAttributesType) {
  // returns a Collection(Array) of NodePaths that we loop through.
  // Each attribute is a NodePath
  return getJSXAttributes(j, element, propName).forEach(attribute => {
    attribute.node.name.name = newPropName;

    if (!newPropValue) {
      return;
    }

    j(attribute)
      .find(j.StringLiteral)
      .forEach(literal => {
        const isStringLiteral = typeof newPropValue === 'string';

        if (isStringLiteral) {
          literal.node.value = newPropValue;
          return;
        }

        const value = literal.node.value;

        if (value in newPropValue) {
          literal.node.value = newPropValue[value];
        }
      });
  });
}
