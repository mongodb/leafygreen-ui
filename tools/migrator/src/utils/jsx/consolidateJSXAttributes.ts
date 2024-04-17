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

  // if the propToUpdate does not exist and there is a spread operator then return early since we don't know if the propToUpdate could be inside the spread
  if (!toProp && hasSpreadOperator) {
    // add comment in file that this has to be done manually
    return;
  }

  // finds the index of the propToRemove so that we can use it to remove it from the array of attributes
  const index = allAttributes.indexOf(fromProp);

  // if the the propToRemove is a boolean
  if (fromPropType === 'boolean') {
    const fromPropValue =
      fromProp.value === null ? true : fromProp.value.expression.value;
    const fromPropValueString = fromPropValue.toString();

    const newValMapping = propMapping[fromPropValueString];

    if (newValMapping) {
      if (toProp) {
        toProp.value.value = newValMapping;

        // remove propToRemove if propToUpdate exists
        allAttributes.splice(index, 1);
        return;
      }

      // if propToUpdate does not exist then update the propToRemove
      if (!toProp) {
        fromProp.name.name = propToUpdate;
        fromProp.value = j.stringLiteral(newValMapping);
        return;
      }
    }

    // remove propToRemove if there there are no updates to propToUpdate
    allAttributes.splice(index, 1);
    return;
  }

  // gets the current value of the propToRemove
  const fromPropValue = fromProp.value.value;

  // if fromPropValue is not a string return
  if (typeof fromPropValue !== 'string') return;

  // gets the mapped value for propToUpdate
  const newValueMapping = propMapping[fromPropValue];

  // if there is no mapped value
  if (!newValueMapping) {
    // remove propToRemove
    allAttributes.splice(index, 1);
    return;
  }

  // if the propToUpdate exists
  if (toProp) {
    // update the value
    toProp.value.value = newValueMapping;

    // remove propToRemove
    allAttributes.splice(index, 1);
  }

  // if the propToUpdate does not exist
  if (!toProp) {
    // update the propToRemove
    fromProp.name.name = propToUpdate;
    fromProp.value.value = newValueMapping;
  }
}

// https://astexplorer.net/#/gist/9aa98b850fc7004100e1c13915fd147b/9be21f72145f1f031aeb01987412eb28975ef8bf
// https://astexplorer.net/#/gist/9aa98b850fc7004100e1c13915fd147b/56e8c3f652937d28ce1873a7f0067b336b6b8417
