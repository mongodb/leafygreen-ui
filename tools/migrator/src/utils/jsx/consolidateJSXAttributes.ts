// TODO: figure out correct types
import type { ASTNode, ASTPath, Options } from 'jscodeshift';
import type core from 'jscodeshift';

export interface ConsolidateJSXAttributesOptions extends Options {
  j: core.JSCodeshift;
  element: ASTPath<any>;
  propToRemove: string;
  propToUpdate: string;
  propMapping: { [value: string]: string };
  fromPropType?: 'string' | 'boolean';
}

export function consolidateJSXAttributes({
  j,
  element,
  propToRemove,
  propToUpdate,
  propMapping,
  fromPropType,
}: ConsolidateJSXAttributesOptions) {
  const isBoolean = fromPropType === 'boolean';

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
  const fromProp = allAttributesWithoutSpread.find(
    (attribute: ASTPath) => attribute.name.name === propToRemove,
  );

  // Finds the propToUpdate from the list of attributes
  const toProp = allAttributesWithoutSpread.find(
    (attribute: ASTPath) => attribute.name.name === propToUpdate,
  );

  // If the propToRemove does not exist then return the source without any changes
  if (!fromProp) return;

  // finds the index of the propToRemove so that we can use it to remove it from the array of attributes
  const index = allAttributes.indexOf(fromProp);

  const getFromPropValue = (isBoolean: boolean) => {
    let fromPropValue;

    if (isBoolean) {
      fromPropValue =
        fromProp.value === null ? true : fromProp.value.expression.value;
      return fromPropValue.toString();
    }
    fromPropValue = fromProp.value.value;
    return fromPropValue;
  };

  // find the new value that propToUpdate should be updated with
  const newValueMapping = propMapping[getFromPropValue(isBoolean)];

  // if fromProp value is not in the mapping then remove that item from the atributes and return
  if (!newValueMapping) {
    allAttributes.splice(index, 1);
    return;
  }

  // if the propToUpdate does not exist and there is a spread operator then return early since we don't know if the propToUpdate could be inside the spread
  if (!toProp && hasSpreadOperator) {
    //TODO: add comment in file that this has to be done manually
    return;
  }

  // if the propToUpdate does not exist then we update the propToRemove
  if (!toProp) {
    // Update the name
    fromProp.name.name = propToUpdate;

    // if its a boolean then turn the value into a string literal
    if (isBoolean) {
      fromProp.value = j.stringLiteral(newValueMapping);
      return;
    }

    // update the value
    fromProp.value.value = newValueMapping;
    return;
  }

  // update the value of the propToUpdate
  toProp.value.value = newValueMapping;
  // remove propToRemove
  allAttributes.splice(index, 1);
  return;
}

// https://astexplorer.net/#/gist/9aa98b850fc7004100e1c13915fd147b/9be21f72145f1f031aeb01987412eb28975ef8bf
// https://astexplorer.net/#/gist/9aa98b850fc7004100e1c13915fd147b/56e8c3f652937d28ce1873a7f0067b336b6b8417
// https://astexplorer.net/#/gist/9aa98b850fc7004100e1c13915fd147b/6b6e838a9101d665373a00d2d81a2f0c072ee8de
