import React from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PortalControlProps } from '@leafygreen-ui/popover';

export type SearchResultsMenuProps = Omit<
  HTMLElementProps<'ul', HTMLUListElement>,
  'children'
> &
  PortalControlProps & {
    refEl: React.RefObject<HTMLElement>;
    open?: boolean;
    children: React.ReactElement | Array<React.ReactElement>;
  };
