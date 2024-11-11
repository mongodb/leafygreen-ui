import React, { PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../../constants';
import { useTableContext } from '../../TableContext';
import { LGRowData } from '../../useLeafyGreenTable';

import SortIcon from './SortIcon/SortIcon';
import { getHeaderCellState } from './utils/getHeaderCellState';
import {
  getBaseHeaderCellStyles,
  getHeaderCellContentStyles,
} from './HeaderCell.styles';
import { HeaderCellProps } from './HeaderCell.types';

/**
 * Component to wrap `<th>` elements for use inside `<thead>` elements.
 */
const HeaderCell = <T extends LGRowData>({
  children,
  className,
  cellIndex,
  header,
  align,
  ...rest
}: PropsWithChildren<HeaderCellProps<T>>) => {
  const { isSelectable } = useTableContext();

  const { columnName, sortState, onSortIconClick } = getHeaderCellState(header);

  return (
    <th
      data-lgid={LGIDS.header}
      className={cx(
        getBaseHeaderCellStyles(header?.getSize() ?? 0, isSelectable),
        className,
      )}
      scope="col"
      {...rest}
    >
      <div
        className={cx(
          // TS error is ignored (and not expected) as it doesn't show up locally but interrupts build
          // @ts-ignore Header types need to be extended or declared in the react-table namespace
          getHeaderCellContentStyles(align || header?.column.columnDef?.align),
        )}
      >
        {children}
        {sortState && onSortIconClick && (
          <SortIcon
            sortState={sortState}
            onSortIconClick={onSortIconClick}
            aria-label={`Sort by ${columnName}`}
            data-testid="lg-table-sort-icon-button"
            data-lgid={LGIDS.sortIcon}
          />
        )}
      </div>
    </th>
  );
};

export default HeaderCell;
