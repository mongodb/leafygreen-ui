import React, { forwardRef, useRef } from 'react';

import { useTableContext } from '../TableContext';
import { useVirtualTableContext } from '../TableContext/VirtualTableContext';

import { paddingBottomStyles, paddingTopStyles } from './TableBody.styles';
import { TableBodyProps } from './TableBody.types';

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, ...rest }: TableBodyProps, fwdRef) => {
    const { isVirtual } = useTableContext();
    const {
      numOfVirtualItems = 0,
      startOfFirstVirtualItem = 0,
      endOfLastVirtualItem = 0,
      totalSizOfVirtualTable = 0,
    } = useVirtualTableContext();

    const topRef = useRef<HTMLTableCellElement | null>(null);
    const bottomRef = useRef<HTMLTableCellElement | null>(null);

    let paddingTop = 0;
    let paddingBottom = 0;

    if (isVirtual) {
      paddingTop = numOfVirtualItems > 0 ? startOfFirstVirtualItem || 0 : 0;
      topRef.current &&
        topRef.current.style.setProperty(
          '--virtual-padding-top',
          `${paddingTop}px`,
        );
      paddingBottom =
        numOfVirtualItems > 0
          ? totalSizOfVirtualTable - (endOfLastVirtualItem || 0)
          : 0;
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
        <tbody ref={fwdRef} {...rest}>
          {children}
        </tbody>
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
  },
);

TableBody.displayName = 'TableBody';

export default TableBody;
