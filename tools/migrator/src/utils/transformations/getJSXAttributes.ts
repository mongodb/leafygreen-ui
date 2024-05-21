import type { ASTPath } from 'jscodeshift';
import type core from 'jscodeshift';

// https://astexplorer.net/#/gist/0735cadf00b74e764defef5f75c6d044/219778bcf6c39ff47dbe4483c4ae619fb8caab45
/**
 *  Loops through each prop on the element and returns the specified prop
 *
 * @param j A reference to the jscodeshift library
 * @param element The element to search for a specific prop
 * @param propName Prop name to find on the element
 * @returns Returns a collection with the node-path of the specified attribute(prop)
 */
export function getJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  propName: string,
) {
  // Targeting the openingElement directly targets only the parent element rather than all of its children elements e.g j(element). We do this to avoid selecting children that might have props names identical to the parent element.
  const elementCollection = j(element.value.openingElement);
  return elementCollection.find(j.JSXAttribute).filter(attribute => {
    return attribute.value.name.name === propName;
  });
}
