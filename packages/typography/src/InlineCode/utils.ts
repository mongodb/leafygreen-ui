import { isValidElement } from 'react';

import { getNodeTextContent } from '@leafygreen-ui/lib';

export const getChildrenLength = (children: any): number => {
  if (typeof children === 'string') {
    return children.match(/./gu)?.length ?? 0;
  } else if (
    Array.isArray(children) &&
    children.every(child => typeof child === 'string')
  ) {
    return children.join('').match(/./gu)?.length ?? 0;
  } else if (isValidElement(children)) {
    const text = getNodeTextContent(children);
    return text.match(/./gu)?.length ?? 0;
  }

  return 0;
};
