import type { ASTPath } from 'jscodeshift';
import type core from 'jscodeshift';

import { getJSXAttributes } from '../../jsx';

export interface ReplaceJSXAttributesType {
  /**
   *  A reference to the jscodeshift library
   */
  j: core.JSCodeshift;

  /**
   *  The element(component) to transform
   */
  element: ASTPath<any>;

  /**
   *  The name of the prop that will be replaced on the element
   */
  propName: string;

  /**
   *  The new name of the prop
   */
  newPropName: string;

  /**
   *  The new value of the prop. This can either be a string or a map of values.
   */
  newPropValue?:
    | string
    | {
        [key: string]: string;
      };
}

/**
 * `replaceJSXAttributes` can replace both the name and value of an attribute(prop).
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

        const currentPropValue = literal.node.value;

        if (currentPropValue in newPropValue) {
          literal.node.value = newPropValue[currentPropValue];
        }
      });
  });
}
