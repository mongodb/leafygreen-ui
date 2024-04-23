// TODO: figure out correct types
import type { ASTNode, ASTPath, JSXAttribute, Options } from 'jscodeshift';
import type core from 'jscodeshift';

export interface ConsolidateJSXAttributesOptions extends Options {
  j: core.JSCodeshift;
  element: ASTPath<any>;
  propToRemove: string;
  propToUpdate: string;
  propMapping: { [value: string]: string };
  fromPropType?: 'string' | 'boolean';
}

// https://astexplorer.net/#/gist/9aa98b850fc7004100e1c13915fd147b/25313acbbef360bf7ca503db3bd9cb2d3d335ce3
/**
 * `consolidateJSXAttributes` takes in two props to consolidate, a `propToRemove` and a `propToUpdate`. The `propToRemove` is removed and the `propToUpdate` is updated based on the value provided in `propMapping`.
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
 * ```
 *
 */
export function consolidateJSXAttributes({
  j,
  element,
  propToRemove,
  propToUpdate,
  propMapping,
  fromPropType,
}: ConsolidateJSXAttributesOptions) {
  const isFromPropABoolean = fromPropType === 'boolean';

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
  const fromProp: ASTPath<JSXAttribute> = allAttributesWithoutSpread.find(
    (attribute: ASTPath<JSXAttribute>) => attribute.name.name === propToRemove,
  );

  // Finds the propToUpdate from the list of attributes
  const toProp: ASTPath<JSXAttribute> = allAttributesWithoutSpread.find(
    (attribute: ASTPath<JSXAttribute>) => attribute.name.name === propToUpdate,
  );

  // If the propToRemove does not exist then return the source without any changes
  if (!fromProp) return;

  // finds the index of the propToRemove so that we can use it to remove it from the array of attributes
  const attributeToRemoveIndex = allAttributes.indexOf(fromProp);

  const removePropToRemove = () =>
    allAttributes.splice(attributeToRemoveIndex, 1);

  // find the new value that propToUpdate should be updated with
  const newValueMapping =
    propMapping[getFromPropValue(isFromPropABoolean, fromProp)];

  // if fromProp value is not in the mapping then remove that item from the atributes and return
  if (!newValueMapping) {
    removePropToRemove();
    return;
  }

  // if the propToUpdate does not exist and there is a spread operator then return early since we don't know if the propToUpdate could be inside the spread
  if (!toProp && hasSpreadOperator) {
    //TODO: add comment in file that this has to be done manually
    // insertJSXComment(j, element, 'Please update manually');
    return;
  }

  // if the propToUpdate does not exist then we update the propToRemove
  if (!toProp) {
    // remove the propToRemove
    removePropToRemove();

    // Create a new prop for propToUpdate
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
  if (toProp) {
    j(toProp)
      .find(j.StringLiteral)
      .forEach(literal => {
        literal.node.value = newValueMapping;
        removePropToRemove();
        return;
      });
  }
}

/**
 *
 * @param isFromPropABoolean
 * @returns
 */
const getFromPropValue = (
  isFromPropABoolean: boolean,
  fromProp: ASTPath<JSXAttribute>,
) => {
  let fromPropValue;
  const expressionType: string = fromProp.value?.type;
  const isStringLiteralType = expressionType === 'StringLiteral';
  const isFromPropABooleanType =
    expressionType === 'JSXExpressionContainer' ||
    fromProp.value === null ||
    fromProp.value === undefined;

  if (isFromPropABoolean) {
    if (isFromPropABooleanType) {
      fromPropValue =
        // @ts-expect-error: not sure why it says expression does not exist on type 'JSXAttribute'.
        fromProp.value === null ? true : fromProp?.value?.expression.value;
      return fromPropValue.toString();
    }

    return;
  }

  if (isStringLiteralType) {
    fromPropValue = fromProp.value?.value;
    return fromPropValue;
  }
};
