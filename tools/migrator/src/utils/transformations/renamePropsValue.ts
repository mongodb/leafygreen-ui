import type { Collection } from 'jscodeshift';

export function renamePropsValue(
  source: Collection<any>,
  componentName: string,
  propName: string,
  fromValue: string,
  toValue: string,
) {
  source.findJSXElements(componentName)?.forEach(element => {
    // each attribute/prop on the component
    element.node.openingElement.attributes?.forEach(node =>
      updateNode(node, propName, fromValue, toValue),
    );
  });

  return source;

  function updateNode(
    node: any,
    propName: string,
    fromValue: string,
    toValue: string,
  ) {
    const nodePropName = node.name.name;
    const nodePropValue = node.value.value;
    const nodeType = node.type;

    // Checks if the from prop matches the node prop
    const isFromProp = (prop: string) => prop === nodePropName;

    if (!(nodeType === 'JSXAttribute' && isFromProp(nodePropName))) {
      return node;
    }

    // check if the fromValue matches the current value
    if (fromValue && nodePropValue !== fromValue) return node;

    // check value type?

    node.value = toValue;
    return node;
  }
}
