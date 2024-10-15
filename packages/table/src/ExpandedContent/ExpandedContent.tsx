import React, { useRef } from 'react';
import { RowData } from '@tanstack/react-table';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { cellTransitionContainerStyles } from '../Cell/Cell.styles';
import { LGIDS } from '../constants';
import InternalRowBase from '../Row/InternalRowBase';
import { useTableContext } from '../TableContext';

import { baseStyles, expandedContentStyles } from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';
import { MemoizedExpandedContent } from './MemoizedExpandedContent';

const ExpandedContent = <T extends RowData>({
  row,
  ...rest
}: ExpandedContentProps<T>) => {
  const { measureElement } = useTableContext();
  // const contentRef = useRef<HTMLDivElement>(null);

  const content =
    row.original.renderExpandedContent &&
    row.original.renderExpandedContent(row);

  const { theme } = useDarkMode();

  // const contentHeight = useMemo(
  //   () => (contentRef.current ? contentRef.current.clientHeight : 0),
  //   // Lint flags `content` as an unnecessary dependency, but we want to update `contentHeight` when the value of `content` changes
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [content],
  // );

  return (
    // <InternalRowBase
    //   {...rest}
    //   ref={node => {
    //     // TODO: fix me
    //     // This gets the dynamic size of the element
    //     if (measureElement) measureElement(node);
    //   }}
    // >
    //   <td
    //     colSpan={row.getVisibleCells().length}
    //     className={cx(baseStyles)}
    //     data-lgid={LGIDS.cell}
    //   >
    //     <div
    //       className={cx(
    //         cellTransitionContainerStyles,
    //         expandedContentStyles[theme],
    //       )}
    //     >
    //       <div ref={contentRef}>{content}</div>
    //     </div>
    //   </td>
    // </InternalRowBase>
    <MemoizedExpandedContent
      row={row}
      content={content}
      measureElement={measureElement}
      theme={theme}
      isExpanded={row.getIsExpanded()}
      // isParentExpanded={
      //   row.getParentRow() ? row.getParentRow()?.getIsExpanded() : false
      // }
      {...rest}
    />
  );
};

ExpandedContent.displayName = 'ExpandedContent';

export default ExpandedContent;
