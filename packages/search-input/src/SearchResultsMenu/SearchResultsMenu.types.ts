import React, { ComponentPropsWithoutRef } from 'react';

import { PortalControlProps } from '@leafygreen-ui/popover';

export type SearchResultsMenuProps = ComponentPropsWithoutRef<'ul'> &
  PortalControlProps & {
    refEl: React.RefObject<HTMLElement>;
    open?: boolean;
  };
