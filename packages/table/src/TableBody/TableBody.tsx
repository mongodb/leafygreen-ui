import React, { PropsWithChildren } from 'react';
import { TableBodyProps } from './types';

const TableBody = ({
  children,
  table,
  ...rest
}: PropsWithChildren<TableBodyProps>) => {
  let paddingTop = 0;
  let paddingBottom = 0;

  if (table) {
    const { virtualRows, totalSize } = table;

    paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    paddingBottom =
      virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0;
  }

  return (
    <tbody {...rest}>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {children}
      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
