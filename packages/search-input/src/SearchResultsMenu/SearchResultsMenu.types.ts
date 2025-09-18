import React, { ReactElement } from 'react';

export type SearchResultsMenuProps = React.ComponentPropsWithoutRef<'ul'> & {
  refEl: React.RefObject<HTMLElement>;
  open?: boolean;
  footerSlot?: ReactElement;
};
