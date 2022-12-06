import React from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface HeaderRowProps extends HTMLElementProps<'tr'> {}

export type HeaderRowElement = React.ReactComponentElement<typeof HeaderRow>;

function HeaderRow({ children, className, ...rest }: HeaderRowProps) {
  return (
    <tr {...rest} className={className} data-testid="leafygreen-ui-header-row">
      {children}
    </tr>
  );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
