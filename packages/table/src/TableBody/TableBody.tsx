import React, { forwardRef } from 'react';

import { TableBodyProps } from './TableBody.types';

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, ...rest }: TableBodyProps, fwdRef) => {
    return (
      <tbody ref={fwdRef} {...rest}>
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = 'TableBody';

export default TableBody;
