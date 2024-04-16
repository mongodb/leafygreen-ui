import type { Collection } from 'jscodeshift';

export function renamePropsValue(
  source: Collection<any>,
  componentName: string,
  props: { [from: string]: string },
) {
  source.findJSXElements(componentName)?.forEach(element => {
    // each attribute/prop on the component
    element.node.openingElement.attributes?.forEach(node =>
      updateNode(node, props),
    );
  });

  return source;

  function updateNode(node: any, props: { [from: string]: string }) {
    const nodePropName = node.name.name;
    const nodeType = node.type;

    // Checks if the from prop matches the node prop
    const isFromProp = (prop: unknown): prop is keyof typeof props =>
      Object.keys(props).includes(prop as string);

    if (!(nodeType === 'JSXAttribute' && isFromProp(nodePropName))) {
      return node;
    }

    node.name.name = props[nodePropName];
    return node;
  }
}
