import React, { useRef } from 'react';

import { useTableContext } from '../TableContext';

import { useVirtualScrollPadding } from './utils/useVirtualScrollPadding';
import { paddingBottomStyles, paddingTopStyles } from './TableBody.styles';
import { TableBodyProps } from './TableBody.types';

const TableBody = ({ children, ...rest }: TableBodyProps) => {
  const { isVirtual, virtualTable } = useTableContext();

  const { paddingTop, paddingBottom } = useVirtualScrollPadding(
    isVirtual,
    virtualTable,
  );

  const topRef = useRef<HTMLTableCellElement | null>(null);
  const bottomRef = useRef<HTMLTableCellElement | null>(null);

  if (isVirtual) {
    topRef.current &&
      topRef.current.style.setProperty(
        '--virtual-padding-top',
        `${paddingTop}px`,
      );
    bottomRef.current &&
      bottomRef.current.style.setProperty(
        '--virtual-padding-bottom',
        `${paddingBottom}px`,
      );
  }

  return (
    <>
      {/* As the user scrolls down, the paddingTop grows bigger, creating the effect of virtual scrolling */}
      {paddingTop > 0 && (
        <tbody>
          <tr aria-hidden>
            <td ref={topRef} className={paddingTopStyles} />
          </tr>
        </tbody>
      )}
      <tbody {...rest}>{children}</tbody>
      {/* As the user scrolls down, the paddingBottom gets smaller, creating the effect of virtual scrolling */}
      {paddingBottom > 0 && (
        <tbody>
          <tr aria-hidden>
            <td ref={bottomRef} className={paddingBottomStyles} />
          </tr>
        </tbody>
      )}
    </>
  );
};

TableBody.displayName = 'TableBody';

export default TableBody;
