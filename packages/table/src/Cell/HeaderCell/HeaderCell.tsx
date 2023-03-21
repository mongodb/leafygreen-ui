import React, { PropsWithChildren, useEffect } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { baseCellStyles } from '../../Cell/Cell.styles';
import { useTableContext } from '../../TableContext/TableContext';
import { LGRowData } from '../../useLeafyGreenTable';

import SortIcon from './SortIcon/SortIcon';
import {
  alignmentStyles,
  baseStyles,
  contentContainerStyles,
  setWidth,
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
  align,
  cellIndex,
  header,
  ...rest
}: PropsWithChildren<HeaderCellProps<T>>) => {
  const { setColumnAlignments } = useTableContext();
  let columnName;
  let sortState;
  let onSortIconClick;

  if (header && header.column.getCanSort()) {
    columnName = header.column.columnDef.header as string;
    const headerSortDirection = header.column.getIsSorted().toString();
    sortState = HeaderSortState[headerSortDirection];
    onSortIconClick = header.column.getToggleSortingHandler();
  } else {
    columnName = '';
    sortState = SortState.None;
  }

  useEffect(() => {
    setColumnAlignments &&
      cellIndex !== undefined &&
      align &&
      setColumnAlignments(prevAlignments => {
        if (prevAlignments) {
          return [...prevAlignments].splice(cellIndex, 1, align);
        }
      });
  }, [cellIndex, align, setColumnAlignments]);

  return (
    <th
      className={cx(
        baseCellStyles,
        {
          [setWidth(header?.getSize() ?? 0)]: !!header?.getSize(),
        },
        className,
      )}
      scope="col"
      {...rest}
    >
      <div className={cx(contentContainerStyles, alignmentStyles(align))}>
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
