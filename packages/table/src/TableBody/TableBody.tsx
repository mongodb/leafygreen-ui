import React, { Fragment, useMemo } from 'react';

import { Polymorph } from '@leafygreen-ui/polymorphic';

import { useTableContext } from '../TableContext/TableContext';

import { TableBodyProps } from './TableBody.types';

const TableBody = ({ children, ...rest }: TableBodyProps) => {
  let paddingTop = 0;
  let paddingBottom = 0;

  const { table } = useTableContext();
  const areSomeRowsExpandable = table?.getCanSomeRowsExpand();

  const bodyAs = useMemo(
    () => (areSomeRowsExpandable ? Fragment : 'tbody'),
    [areSomeRowsExpandable],
  );

  if (table && table.virtualRows) {
    const { virtualRows, totalSize } = table;
    paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    paddingBottom =
      virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0;
  }

  return (
    <Polymorph as={bodyAs} {...rest}>
      {/* As the user scrolls down, the paddingTop grows bigger, creating the effect of virtual scrolling */}
      {paddingTop > 0 && (
        <tr aria-hidden>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {children}
      {/* As the user scrolls down, the paddingBottom gets smaller, creating the effect of virtual scrolling */}
      {paddingBottom > 0 && (
        <tr aria-hidden>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </Polymorph>
  );
};

TableBody.displayName = 'TableBody';

export default TableBody;
