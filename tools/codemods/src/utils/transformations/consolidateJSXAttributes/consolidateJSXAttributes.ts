import type { ASTNode, ASTPath, JSXAttribute, Options } from 'jscodeshift';
import type core from 'jscodeshift';

import { MIGRATOR_ERROR } from '../../../constants';
import { insertJSXComment } from '../../jsx/insertJSXComment/insertJSXComment';

export interface ConsolidateJSXAttributesOptions extends Options {
  /**
   *  A reference to the jscodeshift library
   */
  j: core.JSCodeshift;

  /**
   *  The element(component) to transform
   */
  element: ASTPath<any>;

  /**
   *  The prop to remove on the element
   */
  propToRemove: string;

  /**
   *  The prop to update on the element
   */
  propToUpdate: string;

  /**
   *  A map of values that will be used to update the value of `propToUpdate`
   */
  propMapping: { [value: string]: string };

  /**
   *  Whether the `propToRemove` is a string or boolean
   */
  propToRemoveType?: 'string' | 'boolean';
}

// https://astexplorer.net/#/gist/9aa98b850fc7004100e1c13915fd147b/25313acbbef360bf7ca503db3bd9cb2d3d335ce3
/**
 * `consolidateJSXAttributes` takes in two attributes(props) to consolidate, a `propToRemove` and a `propToUpdate`. The `propToRemove` is removed and the `propToUpdate` is updated based on the value provided in `propMapping`.
 *
 * e.g:
 * ```tsx
 * propToRemove: disabled
 * propToUpdate: state
 * propMapping: {'true': 'disabled'}
 *
 * Before:
 * <MyComponent disabled={true} state='valid' />
 * After:
 * <MyComponent state='disabled' />
 * -----------------------------------
 * Before:
 * <MyComponent disabled state='valid' />
 * After:
 * <MyComponent state='disabled' />
 * -----------------------------------
 * Before:
 * <MyComponent disabled={false} state='valid' />
 * After:
 * <MyComponent state='valid' />
 * -----------------------------------
 * Before:
 * <MyComponent disabled={true} />
 * After:
 * <MyComponent state='disabled' />
 * ```
 *
 */
export function consolidateJSXAttributes({
  j,
  element,
  propToRemove,
  propToUpdate,
  propMapping,
  propToRemoveType,
}: ConsolidateJSXAttributesOptions) {
  const isPropToRemoveABoolean = propToRemoveType === 'boolean';

  // gets all the props on the elements opening tag
  const allAttributes = element.node.openingElement.attributes;

  // checks if the there is a spread operator
  const hasSpreadOperator = allAttributes.some(
    (attribute: ASTNode) => attribute.type !== 'JSXAttribute',
  );

  // removes the spread operator from the rest of the attributes
  const allAttributesWithoutSpread = allAttributes.filter(
    (attribute: ASTNode) => attribute.type === 'JSXAttribute',
  );

  // Finds the propToRemove from the list of attributes
  const _propToRemove: ASTPath<JSXAttribute> = allAttributesWithoutSpread.find(
    (attribute: ASTPath<JSXAttribute>) => attribute.name.name === propToRemove,
  );

  // Finds the propToUpdate from the list of attributes
  const _propToUpdate: ASTPath<JSXAttribute> = allAttributesWithoutSpread.find(
    (attribute: ASTPath<JSXAttribute>) => attribute.name.name === propToUpdate,
  );

  // If the propToRemove does not exist then return the source without any changes
  if (!_propToRemove) return;

  // finds the index of the propToRemove so that we can use it to remove it from the array of attributes
  const attributeToRemoveIndex = allAttributes.indexOf(_propToRemove);

  const removePropToRemove = () =>
    allAttributes.splice(attributeToRemoveIndex, 1);

  // find the new value that propToUpdate should be updated with
  const newValueMapping =
    propMapping[getPropToRemoveValue(isPropToRemoveABoolean, _propToRemove)];

  // if fromProp value is not in the mapping then remove that item from the atributes and return
  if (!newValueMapping) {
    removePropToRemove();
    return;
  }

  // if the propToUpdate does not exist and there is a spread operator then return early since we don't know if the propToUpdate could be inside the spread
  if (!_propToUpdate && hasSpreadOperator) {
    insertJSXComment(j, element, MIGRATOR_ERROR.manual);
    return;
  }

  // if the propToUpdate does not exist then we update the propToRemove
  if (!_propToUpdate) {
    // remove the propToRemove
    removePropToRemove();

    // Creates a new stringLiteral node
    const attributeValueNode = j.stringLiteral(newValueMapping);
    // Create a new jsxAttribute node with the attribute name and value
    const newAttribute = j.jsxAttribute(
      j.jsxIdentifier(propToUpdate),
      attributeValueNode,
    );
    // Add the new attribute to the opening element
    element.node.openingElement.attributes.push(newAttribute);
    return;
  }

  // If the propToUpdate does exist then update the value
  if (_propToUpdate) {
    j(_propToUpdate)
      .find(j.StringLiteral)
      .forEach(literal => {
        literal.node.value = newValueMapping;
        removePropToRemove();
        return;
      });
  }
}

/**
 *  This function checks whether the propToRemove is a string or a boolean and returns that value as a string.
 *
 * @param isPropToRemoveABoolean
 * @returns string
 */
const getPropToRemoveValue = (
  isPropToRemoveABoolean: boolean,
  propToRemove: ASTPath<JSXAttribute>,
) => {
  let propToRemoveValue;
  const expressionType: string = propToRemove.value?.type;
  const isString = expressionType === 'StringLiteral';
  const isBoolean =
    expressionType === 'JSXExpressionContainer' ||
    propToRemove.value === null ||
    propToRemove.value === undefined;

  if (isPropToRemoveABoolean) {
    if (isBoolean) {
      propToRemoveValue =
        propToRemove.value === null
          ? true
          : // @ts-expect-error: unsure why it says expression does not exist on type 'JSXAttribute'.
            propToRemove?.value?.expression.value;
      return propToRemoveValue.toString();
    }
  }

  if (isString) {
    propToRemoveValue = propToRemove.value?.value;
    return propToRemoveValue;
  }

  return '';
};
