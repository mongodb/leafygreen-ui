import React, { PropsWithChildren, useEffect } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../TableContext/TableContext';

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
const HeaderCell = <T extends unknown>({
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
      setColumnAlignments((oldAlignments?: SortStates) => {
        return {
          ...oldAlignments,
          [cellIndex]: align,
        };
      });
  }, [cellIndex, align, setColumnAlignments]);

  return (
    <th
      className={cx(
        baseStyles,
        {
          // cx boolean should ensure header.getSize() is not undefined
          // @ts-expect-error
          [setWidth(header?.getSize())]: !!header?.getSize(),
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
          />
        )}
      </div>
    </th>
  );
};

export default HeaderCell;
