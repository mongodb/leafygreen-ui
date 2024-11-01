import React from 'react';

import { useTableContext } from '../TableContext';

import { TableBodyProps } from './TableBody.types';

const TableBody = ({ children, ...rest }: TableBodyProps) => {
  const { isVirtual, length, start, end, totalSize } = useTableContext();

  let paddingTop = 0;
  let paddingBottom = 0;

  if (isVirtual) {
    paddingTop = length > 0 ? start || 0 : 0;
    paddingBottom = length > 0 ? totalSize - (end || 0) : 0;
  }

  return (
    <>
      {paddingTop > 0 && (
        <tr aria-hidden>
          <td style={{ paddingTop: `${paddingTop}px` }} />
        </tr>
      )}
      <tbody {...rest}>{children}</tbody>
      {paddingBottom > 0 && (
        <tr aria-hidden>
          <td style={{ paddingTop: `${paddingBottom}px` }} />
        </tr>
      )}
    </>
  );
};

TableBody.displayName = 'TableBody';

export default TableBody;
