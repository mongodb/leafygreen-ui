import React, { useMemo, useRef } from 'react';
import { RowData } from '@tanstack/react-table';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  cellContentTransitionStateStyles,
  cellTransitionContainerStyles,
  disableAnimationStyles,
} from '../Cell/Cell.styles';
import { LGIDS } from '../constants';
import InternalRowBase from '../Row/InternalRowBase';
import { useTableContext } from '../TableContext';
import { getAreAncestorsExpanded } from '../utils/areAncestorsExpanded';

import { baseStyles, expandedContentStyles } from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContent = <T extends RowData>({
  row,
  ...rest
}: ExpandedContentProps<T>) => {
  const { disableAnimations, getParentRow } = useTableContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const areAncestorsExpanded = getAreAncestorsExpanded(row.id, getParentRow);
  const isNestedRow = !!getParentRow?.(row.id);
  const isExpanded =
    row.getIsExpanded() && (!isNestedRow || areAncestorsExpanded);
  const content =
    row.original.renderExpandedContent &&
    row.original.renderExpandedContent(row);

  const { theme } = useDarkMode();

  const contentHeight = useMemo(
    () => (contentRef.current ? contentRef.current.clientHeight : 0),
    // Lint flags `content` as an unnecessary dependency, but we want to update `contentHeight` when the value of `content` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [content],
  );

  return (
    <InternalRowBase {...rest} aria-hidden={!isExpanded}>
      <td
        colSpan={row.getVisibleCells().length}
        className={cx(baseStyles)}
        data-lgid={LGIDS.cell}
      >
        <div
          className={cx(
            cellTransitionContainerStyles,
            { [disableAnimationStyles]: disableAnimations },
            expandedContentStyles[theme],
            cellContentTransitionStateStyles(contentHeight, isExpanded), // TODO: remove this
          )}
        >
          <div ref={contentRef}>{content}</div>
        </div>
      </td>
    </InternalRowBase>
  );
};

ExpandedContent.displayName = 'ExpandedContent';

export default ExpandedContent;
