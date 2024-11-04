import React from 'react';
import { RowData } from '@tanstack/react-table';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getCellContainerStyles } from '../Cell/Cell.styles';
import { LGIDS } from '../constants';
import InternalRowBase from '../Row/InternalRowBase';
import { useVirtualTableContext } from '../TableContext';

import { baseStyles, expandedContentStyles } from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContent = <T extends RowData>({
  row,
  virtualRow,
  ...rest
}: ExpandedContentProps<T>) => {
  const { measureElement } = useVirtualTableContext();

  const content =
    row.original.renderExpandedContent &&
    row.original.renderExpandedContent(row);

  const { theme } = useDarkMode();

  // eslint-disable-next-line no-console
  console.log(`🍉rerender🍉 ExpandedContent: ${row.id}`);

  return (
    <InternalRowBase
      {...rest}
      ref={node => {
        // TODO: fix me
        // This gets the dynamic size of the element
        if (measureElement) measureElement(node);
      }}
      data-index={virtualRow ? virtualRow!.index : ''}
    >
      <td
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

ExpandedContent.displayName = 'ExpandedContent';

export default ExpandedContent;
