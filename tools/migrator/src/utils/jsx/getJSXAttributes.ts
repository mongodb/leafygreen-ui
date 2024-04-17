import type { ASTPath } from 'jscodeshift';
import type core from 'jscodeshift';

/**
 *  Loops through each attrubute(prop) on the element and returns
 *
 * @param j
 * @param element The element to search for a specific prop
 * @param attributeName Prop name to find on the element
 * @returns Returns a collection with the node-path of the specified attribute(prop)
 */
export function getJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  // TODO: reword this. Targeting the openingElement directly targets only the parent element rather than all of its children elements e.g j(element). We do this to avoid selecting children that might have props names identical to the parent element.
  const elementCollection = j(element.value.openingElement);
  return elementCollection.find(j.JSXAttribute).filter(attribute => {
    return attribute.value.name.name === attributeName;
  });
}

// https://astexplorer.net/#/gist/0735cadf00b74e764defef5f75c6d044/aa60adfa10fa6c1ca34f59c362dd0fcd42b06c3b
// https://astexplorer.net/#/gist/0735cadf00b74e764defef5f75c6d044/66356f3b047ecaa7fb16794fea5b174e821a765e

// el.forEach(attribute => {
//   //console.log({attribute})
//   // console.log({jAttribute: j(attribute)})
//    j(attribute)
//   .find(j.JSXIdentifier)
//   .replaceWith(j.jsxIdentifier('testing'));

//   j(attribute).find(j.StringLiteral)
//   .forEach((literal) => {
//     //console.log({literal})
//     literal.node.value = 'shaneeza'
//   })
// })

// const el = j(element.value.openingElement).find(j.JSXAttribute).filter((attribute) => {
//   console.log({attribute, name: attribute.value.name.name, jAttribute: j(attribute)})
//   // console.log(attribute.parentPath.node.name.name)
//   const matches = j(attribute)
//     .find(j.JSXIdentifier)
//     .filter((identifier) => {
//       console.log({identifier})
//       return identifier.value.name === 'foo'});
//   //console.log({matches})
//  return Boolean(matches.length);
// });

// const el = j(element.value.openingElement).find(j.JSXAttribute).filter((attribute) => {
//   console.log({attribute, name: attribute.value.name.name, jAttribute: j(attribute)})
//   // console.log(attribute.parentPath.node.name.name)
//   const matches = j(attribute)
//     .find(j.JSXIdentifier)
//     .filter((identifier) => {
//       console.log({identifier})
//       return identifier.value.name === 'foo'});
//   //console.log({matches})
//  return Boolean(matches.length);
// });

// const el = j(element.value.openingElement).find(j.JSXAttribute).forEach((attribute) => {
//   console.log({attribute, name: attribute.value.name.name, jAttribute: j(attribute)})
//   // console.log(attribute.parentPath.node.name.name)
//   j(attribute)
//     .find(j.JSXIdentifier)
//     .filter((identifier) => {
//       console.log({identifier})
//       return identifier.value.name === 'foo'});
//   //console.log({matches})
// });
