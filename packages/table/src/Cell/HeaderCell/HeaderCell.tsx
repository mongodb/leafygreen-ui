import React, { ForwardedRef, PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useTableContext } from '../../TableContext';
import { LGRowData } from '../../useLeafyGreenTable';

import SortIcon from './SortIcon/SortIcon';
import { getHeaderCellState } from './utils/getHeaderCellState';
import {
  getBaseHeaderCellStyles,
  getHeaderCellContentStyles,
} from './HeaderCell.styles';
import { HeaderCellComponentType, HeaderCellProps } from './HeaderCell.types';

/**
 * Component to wrap `<th>` elements for use inside `<thead>` elements.
 */
const HeaderCellWithRef = <T extends LGRowData>(
  {
    children,
    className,
    header,
    align,
    ...rest
  }: PropsWithChildren<HeaderCellProps<T>>,
  ref: ForwardedRef<HTMLTableCellElement>,
) => {
  const { isSelectable, lgIds } = useTableContext();

  const { columnName, sortState, onSortIconClick } = getHeaderCellState(header);

  return (
    <th
      data-lgid={lgIds.header}
      data-testid={lgIds.header}
      className={cx(
        getBaseHeaderCellStyles(header?.getSize() ?? 0, isSelectable),
        className,
      )}
      scope="col"
      ref={ref}
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
            data-testid={lgIds.sortIcon}
            data-lgid={lgIds.sortIcon}
          />
        )}
      </div>
    </th>
  );
};

// React.forwardRef can only work with plain function types, i.e. types with a single call signature and no other members.
// Asserts that `HeaderCell` is of type `HeaderCellComponentType` which works with generics
export const HeaderCell = React.forwardRef(
  HeaderCellWithRef,
) as HeaderCellComponentType;

export default HeaderCell;
