import type { ASTNode, ASTPath, JSXAttribute, JSXElement } from 'jscodeshift';
import type core from 'jscodeshift';

import { MIGRATOR_ERROR } from '../../../constants';
import { insertJSXComment } from '../../jsx';

export interface RemoveJSXAttributesType {
  /**
   *  A reference to the jscodeshift library
   */
  j: core.JSCodeshift;

  /**
   *  The element(component) to transform
   */
  element: ASTPath<JSXElement>;

  /**
   *  The name of the attribute that will be removed from the element
   */
  propName: string;
}

/**
 * `removeJSXAttributes` can remove a value of an attribute(prop).
 *
 * e.g:
 * ```tsx
 * propName: prop
 *
 * Before:
 * <MyComponent prop={false}/>
 * After:
 * <MyComponent />
 * ```
 */
export function removeJSXAttributes({
  j,
  element,
  propName,
}: RemoveJSXAttributesType) {
  const allAttributes = element.value.openingElement?.attributes;

  const hasSpreadOperator = allAttributes?.some(
    (attr: ASTNode) => attr.type !== 'JSXAttribute',
  );

  if (hasSpreadOperator) {
    insertJSXComment(
      j,
      element,
      `${MIGRATOR_ERROR.manualRemove} prop: ${propName}`,
    );
    return;
  }

  const jsxAttributes = allAttributes?.filter(
    (attr: ASTNode) =>
      attr.type === 'JSXAttribute' && attr.name.name === propName,
  );

  if (!jsxAttributes) return;

  jsxAttributes.forEach(attr => {
    const jsxAttribute = attr as JSXAttribute;

    jsxAttribute.name.name = '';
    jsxAttribute.value = null;
  });
}
