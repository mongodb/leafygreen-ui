import { ReactElement, ReactNode, ReactText } from 'react';

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

  if (hasChildren(node)) {
    return getNodeTextContent(node.props.children);
  }

  return '';
}

function hasChildren(item?: any): item is ReactElement {
  return item && typeof item === 'object' && item.props;
}

function isText(item?: any): item is ReactText {
  return typeof item === 'string' || typeof item === 'number';
}
