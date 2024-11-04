import React, { ForwardedRef } from 'react';
import { RowData } from '@tanstack/react-table';

import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getCellContainerStyles } from '../Cell/Cell.styles';
import { LGIDS } from '../constants';
import InternalRowBase from '../Row/InternalRowBase';
import { useVirtualTableContext } from '../TableContext';

import { baseStyles, expandedContentStyles } from './ExpandedContent.styles';
import {
  ExpandedContentComponentType,
  ExpandedContentProps,
} from './ExpandedContent.types';

const ExpandedContentWithRef = <T extends RowData>(
  { row, virtualRow, ...rest }: ExpandedContentProps<T>,
  ref: ForwardedRef<HTMLTableRowElement>,
) => {
  const { measureElement } = useVirtualTableContext();

  const content =
    row.original.renderExpandedContent &&
    row.original.renderExpandedContent(row);

  const { theme } = useDarkMode();

  // eslint-disable-next-line no-console
  // console.log(`🍉rerender🍉 ExpandedContent: ${row.id}`);

  return (
    <InternalRowBase
      {...rest}
      ref={useMergeRefs([ref, measureElement])}
      data-index={virtualRow ? virtualRow!.index : ''}
    >
      <td
        //TODO: does not work with grid
        colSpan={row.getVisibleCells().length}
        className={cx(baseStyles)}
        data-lgid={LGIDS.cell}
      >
        <div
          className={cx(getCellContainerStyles(), expandedContentStyles[theme])}
        >
          <div>{content}</div>
        </div>
      </td>
    </InternalRowBase>
  );
};

// FIXME: Try to avoid asserting
export const ExpandedContent = React.forwardRef(
  ExpandedContentWithRef,
) as ExpandedContentComponentType;

ExpandedContent.displayName = 'ExpandedContent';

export default ExpandedContent;
