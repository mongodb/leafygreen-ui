import React, { ReactElement } from 'react';

export type SearchResultsMenuProps = React.ComponentPropsWithRef<'ul'> & {
  refEl: React.RefObject<HTMLElement>;
  open?: boolean;
  footerSlot?: ReactElement;
};
