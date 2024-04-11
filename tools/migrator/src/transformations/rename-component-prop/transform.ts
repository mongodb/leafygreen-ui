// @ts-nocheck
import type { API, Collection, core, FileInfo, Options } from 'jscodeshift';

// import {renameProps} from '../../utilities/jsx';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const { componentName, from, to, fromValue, toValue } = options;

  if (!componentName || !from || !to) {
    throw new Error('Missing required options: componentName, from, and to');
  }

  const source = j(file.source);
  const props = { [from]: to };

  renameProps(j, source, componentName, props, fromValue, toValue);

  return source.toSource();
}

export function renameProps(
  j: core.JSCodeshift,
  source: Collection<any>,
  componentName: string,
  props: { [from: string]: string },
  fromValue?: string,
  toValue?: string,
) {
  // const [component, subcomponent] = componentName.split('.');

  // Handle compound components
  // if (component && subcomponent) {
  //   source.find(j.JSXElement).forEach((element) => {
  //     if (
  //       element.node.openingElement.name.type === 'JSXMemberExpression' &&
  //       element.node.openingElement.name.object.type === 'JSXIdentifier' &&
  //       element.node.openingElement.name.object.name === component &&
  //       element.node.openingElement.name.property.name === subcomponent
  //     ) {
  //       element.node.openingElement.attributes?.forEach((node) =>
  //         updateNode(node, props, fromValue, toValue),
  //       );
  //     }
  //   });
  //   return;
  // }

  // Handle basic components
  source.findJSXElements(componentName)?.forEach(element => {
    element.node.openingElement.attributes?.forEach(node =>
      updateNode(node, props, fromValue, toValue),
    );
  });

  return source;

  function updateNode(
    node: any,
    props: { [from: string]: string },
    fromValue?: string,
    toValue?: string,
  ) {
    const isFromProp = (prop: unknown): prop is keyof typeof props =>
      Object.keys(props).includes(prop as string);

    if (!(node.type === 'JSXAttribute' && isFromProp(node.name.name))) {
      return node;
    }

    node.name.name = props[node.name.name];
    if (fromValue && node.value.value !== fromValue) return node;
    node.value = j.stringLiteral(toValue ?? node.value.value);
    return node;
  }
}
