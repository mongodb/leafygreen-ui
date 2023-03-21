import React, { useMemo, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { RowData } from '@tanstack/react-table';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { cellContentContainerStyles } from '../Cell/Cell.styles';
import InternalRowBase from '../Row/InternalRowBase';

import {
  baseStyles,
  expandedContentStyles,
  expandedContentTransitionStyles,
} from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContent = <T extends RowData>({
  row,
}: ExpandedContentProps<T>) => {

  const contentRef = useRef<HTMLDivElement>(null)
  const isExpanded = row.getIsExpanded();
  const content =
    row?.original?.renderExpandedContent &&
    row?.original?.renderExpandedContent(row);

  const { theme } = useDarkMode()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contentHeight = useMemo(() => contentRef.current ? contentRef.current.clientHeight : 0, [content])

  return (
    <InternalRowBase>
      <td
        colSpan={row?.getVisibleCells().length}
        className={cx(
          baseStyles,
        )}
      >
        <Transition in={isExpanded} timeout={0}>
          {state => (
            <div
              data-state={state}
              className={cx(
                cellContentContainerStyles,
                expandedContentStyles[theme],
                expandedContentTransitionStyles(contentHeight)[state],
              )}>
              <div ref={contentRef}>
                {content}
              </div>
            </div>
          )}
        </Transition>
      </td>
    </InternalRowBase >
  );
};

export default ExpandedContent;
