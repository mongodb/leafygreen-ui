import React from 'react';
import { HTMLElementProps } from '@leafygreen-ui/lib';

export type HeaderRowProps = HTMLElementProps<'tr', never>;
function HeaderRow({ children, className, ...rest }: HeaderRowProps) {
  return (
    <tr {...rest} className={className} data-testid="leafygreen-ui-header-row">
      {children}
    </tr>
  );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
