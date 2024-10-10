import React, { ReactElement } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

export type SearchResultsMenuProps = HTMLElementProps<
  'ul',
  HTMLUListElement
> & {
  refEl: React.RefObject<HTMLElement>;
  open?: boolean;
  footerSlot?: ReactElement;
};
