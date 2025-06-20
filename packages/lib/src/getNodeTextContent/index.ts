import { FunctionComponent, ReactElement, ReactNode, ReactText } from 'react';

/**
 * Returns the text string of a React node
 */
export default function getNodeTextContent(node?: ReactNode): string {
  if (isText(node)) {
    return node.toString().trim();
  }

  if (Array.isArray(node)) {
    return node.map(getNodeTextContent).join(' ').trim();
  }

  if (isReactElement(node)) {
    if (isRendered(node)) {
      return getNodeTextContent(node.props.children);
    }

    const Component = node.type as FunctionComponent<any>;
    return getNodeTextContent(Component(node.props));
  }

  return '';
}

function isReactElement(item?: any): item is ReactElement {
  return item && typeof item === 'object' && item.props;
}

function isRendered(item?: any): boolean {
  return isReactElement(item) && item.props.children;
}

function isText(item?: any): item is ReactText {
  return typeof item === 'string' || typeof item === 'number';
}
