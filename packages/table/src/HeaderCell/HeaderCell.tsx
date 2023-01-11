import { css, cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren, useEffect } from 'react';
import { useTableContext } from '../TableContext';
import SortIcon from './SortIcon/SortIcon';
import { baseStyles, alignmentStyles, contentContainerStyles } from './styles';
import { HeaderCellProps, SortState } from './types';

const HeaderSortState: { [key: string]: SortState } = {
  'false': SortState.Off,
  'asc': SortState.Asc,
  'desc': SortState.Desc,
}

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
    let headerSortDirection = header.column.getIsSorted().toString();
    sortState = HeaderSortState[headerSortDirection];
    onSortIconClick = header.column.getToggleSortingHandler()
  } else {
    columnName = '';
    sortState = SortState.None;
  }

  useEffect(() => {
    setColumnAlignments &&
      cellIndex &&
      align &&
      setColumnAlignments((oldAlignments: any) => {
        return {
          ...oldAlignments,
          [cellIndex]: align,
        };
      });
  }, [cellIndex, align, setColumnAlignments]);

  return (
    <th className={cx(baseStyles, css`width: ${header?.getSize()}px`, className)} {...rest}>
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
