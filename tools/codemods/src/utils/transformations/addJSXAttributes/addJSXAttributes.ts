import type { ASTNode, ASTPath, JSXAttribute } from 'jscodeshift';
import type core from 'jscodeshift';

import { MIGRATOR_ERROR } from '../../../constants';
import { insertJSXComment } from '../../jsx';

export interface AddJSXAttributesType {
  /**
   *  A reference to the jscodeshift library
   */
  j: core.JSCodeshift;

  /**
   *  The element(component) to transform
   */
  element: ASTPath<any>;

  /**
   *  The name of the prop that will be added to the element
   */
  propName: string;

  /**
   *  The new value of the prop. This can either be a string, number, boolean, or null.
   */
  propValue: string | number | boolean | null;
}

/**
 * `addJSXAttributes` can add a value of an attribute(prop).
 *
 * e.g:
 * ```tsx
 * propName: prop
 * propValue: false
 *
 * Before:
 * <MyComponent />
 * After:
 * <MyComponent prop={false} />
 * -----------------------------------
 * propName: prop
 * propValue: 'hey'
 *
 * Before:
 * <MyComponent />
 * After:
 * <MyComponent prop="hey" />
 * ```
 */
export function addJSXAttributes({
  j,
  element,
  propName,
  propValue,
}: AddJSXAttributesType) {
  const allAttributes = element.node.openingElement.attributes;

  const hasSpreadOperator = allAttributes.some(
    (attr: ASTNode) => attr.type !== 'JSXAttribute',
  );

  const allAttributesWithoutSpread = allAttributes.filter(
    (attr: ASTNode) => attr.type === 'JSXAttribute',
  );

  const foundAttribute: ASTPath<JSXAttribute> = allAttributesWithoutSpread.find(
    (attribute: ASTPath<JSXAttribute>) => attribute.name.name === propName,
  );

  if (foundAttribute) {
    return;
  }

  if (hasSpreadOperator) {
    insertJSXComment(j, element, MIGRATOR_ERROR.manualAdd);
    return;
  }

  const isPropValueString = typeof propValue === 'string';
  const attrValueNode = isPropValueString
    ? j.stringLiteral(propValue)
    : j.jsxExpressionContainer(j.literal(propValue));
  const newAttribute = j.jsxAttribute(j.jsxIdentifier(propName), attrValueNode);
  allAttributes.push(newAttribute);
}
