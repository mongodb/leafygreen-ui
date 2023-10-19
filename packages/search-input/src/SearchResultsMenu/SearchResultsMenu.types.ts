import React, { ReactElement } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PortalControlProps } from '@leafygreen-ui/popover';

export type SearchResultsMenuProps = HTMLElementProps<'ul', HTMLUListElement> &
  PortalControlProps & {
    refEl: React.RefObject<HTMLElement>;
    open?: boolean;
    footerSlot?: ReactElement;
  };
