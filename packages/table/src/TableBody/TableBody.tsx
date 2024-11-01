import React from 'react';

import { useTableContext } from '../TableContext';

import { TableBodyProps } from './TableBody.types';

const TableBody = ({ children, ...rest }: TableBodyProps) => {
  // @ts-ignore
  const { isVirtual, length, start, end, totalSize } = useTableContext();

  let paddingTop = 0;
  let paddingBottom = 0;

  if (isVirtual) {
    paddingTop = length > 0 ? start || 0 : 0;
    document.documentElement.style.setProperty(
      '--virtual-padding-top',
      `${paddingTop}px`,
    );
    paddingBottom = length > 0 ? totalSize - (end || 0) : 0;
    document.documentElement.style.setProperty(
      '--virtual-padding-bottom',
      `${paddingBottom}px`,
    );
  }

  return (
    <>
      {paddingTop > 0 && (
        <tbody>
          <tr aria-hidden>
            <td style={{ paddingTop: 'var(--virtual-padding-top)' }} />
          </tr>
        </tbody>
      )}
      <tbody {...rest}>{children}</tbody>
      {paddingBottom > 0 && (
        <tbody>
          <tr aria-hidden>
            <td style={{ paddingTop: 'var(--virtual-padding-bottom)' }} />
          </tr>
        </tbody>
      )}
    </>
  );
};

TableBody.displayName = 'TableBody';

export default TableBody;
