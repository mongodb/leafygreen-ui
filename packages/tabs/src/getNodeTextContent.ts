import { ReactChild } from 'react';

/**
 * Returns the text string of a React node
 */
export function getNodeTextContent(
  node?: ReactChild | string | Array<ReactChild>,
): string {
  if (typeof node === 'string') return node.trim();

  if (node instanceof Array)
    return node.map(getNodeTextContent).join(' ').trim();

  if (node && typeof node === 'object') {
    return getNodeTextContent(node.props.children);
  }

  return '';
}
