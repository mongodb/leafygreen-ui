import React, { ReactElement } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverRenderModeProps } from '@leafygreen-ui/popover';

export type SearchResultsMenuProps = HTMLElementProps<'ul', HTMLUListElement> &
  Omit<PopoverRenderModeProps, 'renderMode'> & {
    refEl: React.RefObject<HTMLElement>;
    open?: boolean;
    footerSlot?: ReactElement;
  };
