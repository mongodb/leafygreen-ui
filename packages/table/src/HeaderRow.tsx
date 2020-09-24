import React from 'react';

export type HeaderRowProps = React.ComponentPropsWithoutRef<'tr'>;
function HeaderRow({ children, className, ...rest }: HeaderRowProps) {
  return (
    <tr {...rest} className={className} data-testid="leafygreen-ui-header-row">
      {children}
    </tr>
  );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
