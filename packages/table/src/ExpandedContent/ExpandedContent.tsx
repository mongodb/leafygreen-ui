import React, { useMemo, useRef } from 'react';
import AnimateHeight from 'react-animate-height';
import { Transition } from 'react-transition-group';
import { RowData } from '@tanstack/react-table';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { cellContentContainerStyles } from '../Cell/Cell.styles';
import InternalRowBase from '../Row/InternalRowBase';
import { useTableContext } from '../TableContext/TableContext';
import { getAreAncestorsExpanded } from '../utils/areAncestorsExpanded';

import {
  baseStyles,
  expandedContentStyles,
  expandedContentTransitionStyles,
} from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContent = <T extends RowData>({
  row,
  ...rest
}: ExpandedContentProps<T>) => {
  const { getParentRow } = useTableContext();
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const areAncestorsExpanded = getAreAncestorsExpanded(row.id, getParentRow);
  const isNestedRow = !!getParentRow?.(row.id);
  const isExpanded =
    row.getIsExpanded() && (!isNestedRow || areAncestorsExpanded);
  const content =
    row.original.renderExpandedContent &&
    row.original.renderExpandedContent(row);

  const { theme } = useDarkMode();

  return (
    <InternalRowBase {...rest}>
      <td colSpan={row.getVisibleCells().length} className={cx(baseStyles)}>
        <AnimateHeight
          duration={transitionDuration.default}
          easing="ease-in-out"
          height={isExpanded ? 'auto' : 0}
          ref={transitionRef}
        >
          <div
            className={cx(
              cellContentContainerStyles,
              expandedContentStyles[theme],
              // expandedContentTransitionStyles(contentHeight)[state],
            )}
          >
            <div>{content}</div>
          </div>
        </AnimateHeight>
      </td>
    </InternalRowBase>
  );
};

ExpandedContent.displayName = 'ExpandedContent';

export default ExpandedContent;
