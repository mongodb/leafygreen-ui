import { cx } from '@leafygreen-ui/emotion';
import { consoleOnce } from '@leafygreen-ui/lib';
import React, { PropsWithChildren, useEffect } from 'react';
import { useTableContext } from '../TableContext';
import SortIcon from './SortIcon/SortIcon';
import { baseStyles, alignmentStyles, contentContainerStyles } from './styles';
import { HeaderCellProps } from './types';

const HeaderCell = ({
  children,
  className,
  align,
  sortState,
  onSortIconClick,
  columnName,
  cellIndex,
  ...rest
}: PropsWithChildren<HeaderCellProps>) => {
  const { setColumnAlignments } = useTableContext();

  const isMissingOneSortProp = () => {
    return (!sortState && onSortIconClick) || (!onSortIconClick && sortState);
  };

  if (isMissingOneSortProp()) {
    consoleOnce.warn();
  }

  useEffect(() => {
    setColumnAlignments &&
      cellIndex &&
      align &&
      setColumnAlignments(oldAlignments => {
        return {
          ...oldAlignments,
          [cellIndex]: align,
        };
      });
  }, [cellIndex, align, setColumnAlignments]);

  return (
    <th className={cx(baseStyles, className)} {...rest}>
      <div className={cx(contentContainerStyles, alignmentStyles(align))}>
        {children}
        {/* There will be a console warning if only one of the props is provided to the component */}
        {sortState && onSortIconClick && (
          <SortIcon
            sortState={sortState}
            onSortIconClick={onSortIconClick}
            columnName={columnName}
          />
        )}
      </div>
    </th>
  );
};

export default HeaderCell;
