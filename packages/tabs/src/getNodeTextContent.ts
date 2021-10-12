import { isEmpty } from 'lodash';
import { ReactChild, ReactPortal } from 'react';

/**
 * Returns the text string of a React node
 */
export function getNodeTextContent(
  node?: ReactChild | ReactPortal | string | Array<ReactChild | ReactPortal>,
): string {
  if (typeof node === 'string') {
    return node.trim();
  }

  if (Array.isArray(node)) {
    return node.map(getNodeTextContent).join(' ').trim();
  }

  if (node && typeof node === 'object' && !isEmpty(node)) {
    return getNodeTextContent(node.props.children);
  }

  return '';
}
