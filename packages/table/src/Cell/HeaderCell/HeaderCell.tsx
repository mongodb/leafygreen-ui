import React, { PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../../constants';
import { useTableContext } from '../../TableContext';
import { LGRowData } from '../../useLeafyGreenTable';
import {
  alignmentStyles,
  baseCellStyles,
  cellTransitionContainerStyles,
} from '../Cell.styles';

import SortIcon from './SortIcon/SortIcon';
import {
  getCellPaddingStyles,
  getHeaderCellWidthStyles,
  headerCellContentStyles,
} from './HeaderCell.styles';
import { HeaderCellProps, SortState, SortStates } from './HeaderCell.types';

const HeaderSortState: SortStates = {
  false: SortState.Off,
  asc: SortState.Asc,
  desc: SortState.Desc,
};

/**
 * Component to wrap `<th>` elements for use inside `<thead>` elements.
 */
const HeaderCell = <T extends LGRowData>({
  children,
  className,
  cellIndex,
  header,
  ...rest
}: PropsWithChildren<HeaderCellProps<T>>) => {
  const { isSelectable } = useTableContext();

  let columnName, sortState, onSortIconClick;

  if (header && header.column.getCanSort()) {
    columnName = header.column.columnDef.header as string;
    const headerSortDirection = header.column.getIsSorted().toString();
    sortState = HeaderSortState[headerSortDirection];
    onSortIconClick = header.column.getToggleSortingHandler();
  }

  return (
    <th
      data-lgid={LGIDS.header}
      className={cx(
        baseCellStyles,
        getCellPaddingStyles(isSelectable),
        {
          [getHeaderCellWidthStyles(header?.getSize() ?? 0)]:
            !!header?.getSize(),
        },
        className,
      )}
      scope="col"
      {...rest}
    >
      <div
        className={cx(
          cellTransitionContainerStyles,
          headerCellContentStyles,
          // TS error is ignored (and not expected) as it doesn't show up locally but interrupts build
          // @ts-ignore Header types need to be extended or declared in the react-table namespace
          alignmentStyles(header?.column.columnDef?.align),
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
