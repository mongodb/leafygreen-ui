import React, { PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../../TableContext';
import { LGRowData } from '../../useLeafyGreenTable';
import {
  alignmentStyles,
  baseCellStyles,
  cellTransitionContainerStyles,
  getCellPadding,
} from '../Cell.styles';

import SortIcon from './SortIcon/SortIcon';
import {
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
  const { table } = useTableContext();

  const isFirstCell = cellIndex === 0;
  const isSelectable = !!table && !!table.hasSelectableRows;

  let columnName, sortState, onSortIconClick;

  if (header && header.column.getCanSort()) {
    columnName = header.column.columnDef.header as string;
    const headerSortDirection = header.column.getIsSorted().toString();
    sortState = HeaderSortState[headerSortDirection];
    onSortIconClick = header.column.getToggleSortingHandler();
  }

  return (
    <th
      className={cx(
        baseCellStyles,
        {
          [getCellPadding({ depth: 0, isExpandable: false, isSelectable })]:
            isFirstCell,
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
          />
        )}
      </div>
    </th>
  );
};

export default HeaderCell;
