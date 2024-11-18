import React from 'react';
import { RowData } from '@tanstack/react-table';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDS } from '../constants';
import InternalRowBase from '../Row/InternalRowBase';
import { useTableContext } from '../TableContext';

import {
  baseStyles,
  expandedContentThemeStyles,
} from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContent = <T extends RowData>({
  row,
  virtualRow,
  ...rest
}: ExpandedContentProps<T>) => {
  const { virtualTable } = useTableContext();

  const content =
    row.original.renderExpandedContent &&
    row.original.renderExpandedContent(row);

  const { theme } = useDarkMode();

  return (
    <InternalRowBase
      {...rest}
      ref={node => {
        // TODO: fix me
        // This gets the dynamic size of the element
        if (virtualTable) virtualTable.measureElement(node);
      }}
      data-index={virtualRow ? virtualRow!.index : ''}
    >
      <td
        colSpan={row.getVisibleCells().length}
        className={cx(baseStyles)}
        data-lgid={LGIDS.cell}
      >
        <div className={expandedContentThemeStyles[theme]}>
          <div>{content}</div>
        </div>
      </td>
    </InternalRowBase>
  );
};

ExpandedContent.displayName = 'ExpandedContent';

export default ExpandedContent;
