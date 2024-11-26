import React, { ForwardedRef, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';

import { LGIDS } from '../../constants';
import { useTableContext } from '../../TableContext';
import { LGRowData } from '../../useLeafyGreenTable';
import { forwardRefWithGenerics } from '../../utils/genericHelpers';

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
const HeaderCell = forwardRefWithGenerics(function HeaderCell<
  T extends LGRowData,
>(
  {
    children,
    className,
    header,
    align,
    ...rest
  }: PropsWithChildren<HeaderCellProps<T>>,
  ref: ForwardedRef<HTMLTableCellElement>,
) {
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
            data-testid="lg-table-sort-icon-button"
            data-lgid={LGIDS.sortIcon}
          />
        )}
      </div>
    </th>
  );
});

export default HeaderCell;

// @ts-expect-error
HeaderCell.propTypes = {
  header: PropTypes.object,
} as any; // avoid inferred types from interfering;
