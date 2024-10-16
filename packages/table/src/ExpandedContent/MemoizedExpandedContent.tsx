// @ts-nocheck
import React, { useRef } from 'react';
import { RowData } from '@tanstack/react-table';

import { css, cx } from '@leafygreen-ui/emotion';

// import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { cellTransitionContainerStyles } from '../Cell/Cell.styles';
import { LGIDS } from '../constants';
import InternalRowBase from '../Row/InternalRowBase';

import { baseStyles, expandedContentStyles } from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContainer = <T extends RowData>({
  row,
  theme,
  measureElement,
  content,
  isExpanded,
  ...rest
}: ExpandedContentProps<T>) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // const contentHeight = useMemo(
  //   () => (contentRef.current ? contentRef.current.clientHeight : 0),
  //   // Lint flags `content` as an unnecessary dependency, but we want to update `contentHeight` when the value of `content` changes
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [content],
  // );

  console.log(`🍉rerender🍉 ExpandedContent: ${row.id}`);

  return (
    <InternalRowBase
      {...rest}
      ref={node => {
        // TODO: fix me
        // This gets the dynamic size of the element
        if (measureElement) measureElement(node);
      }}
      className={cx({
        [css`
          /* display: none; */
          color: red;

          > td div {
            height: 0;
            overflow: hidden;
            min-height: 0;
          }
        `]: isExpanded === false,
      })}
      data-expanded={isExpanded}
    >
      <td
        colSpan={row.getVisibleCells().length}
        className={cx(baseStyles)}
        data-lgid={LGIDS.cell}
      >
        <div
          className={cx(
            cellTransitionContainerStyles,
            expandedContentStyles[theme],
          )}
        >
          <div ref={contentRef}>{content}</div>
        </div>
      </td>
    </InternalRowBase>
  );
};

ExpandedContainer.displayName = 'ExpandedContainer';

export default ExpandedContainer;

const arePropsEqual = (prevProps, nextProps) => {
  const prevIsExpanded = prevProps.isExpanded;
  const nextIsExpanded = nextProps.isExpanded;

  // const prevIsParentExpanded = prevProps.isParentExpanded;
  // const nextIsParentExpanded = nextProps.isParentExpanded;

  const equal = prevIsExpanded === nextIsExpanded;
  return equal;
};

export const MemoizedExpandedContent = React.memo(
  ExpandedContainer,
  arePropsEqual,
);
