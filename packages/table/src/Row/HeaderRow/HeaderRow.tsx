import React, { forwardRef, PropsWithChildren } from 'react';

import { HeaderRowProps } from './HeaderRow.types';

const HeaderRow = forwardRef<HTMLTableRowElement, HeaderRowProps>(
  ({ children, ...rest }: PropsWithChildren<HeaderRowProps>, fwdRef) => {
    return (
      <tr ref={fwdRef} {...rest}>
        {children}
      </tr>
    );
  },
);

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
