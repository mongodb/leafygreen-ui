import React from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * @deprecated
 */
export interface HeaderRowProps extends HTMLElementProps<'tr'> {}

/**
 * @deprecated
 */
export type HeaderRowElement = React.ReactComponentElement<typeof HeaderRow>;

/**
 * @deprecated
 */
function HeaderRow({ children, className, ...rest }: HeaderRowProps) {
  return (
    <tr {...rest} className={className} data-testid="leafygreen-ui-header-row">
      {children}
    </tr>
  );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
