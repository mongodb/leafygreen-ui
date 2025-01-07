import React, { ForwardedRef } from 'react';
import { RowData } from '@tanstack/react-table';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDS } from '../constants';
import InternalRowBase from '../Row/InternalRowBase';
import { useTableContext } from '../TableContext';

import {
  baseStyles,
  expandedContentThemeStyles,
} from './ExpandedContent.styles';
import {
  ExpandedContentComponentType,
  ExpandedContentProps,
} from './ExpandedContent.types';

const ExpandedContentWithRef = <T extends RowData>(
  { row, virtualRow, ...rest }: ExpandedContentProps<T>,
  ref: ForwardedRef<HTMLTableRowElement>,
) => {
  const { virtualTable } = useTableContext();

  const content =
    row.original.renderExpandedContent &&
    row.original.renderExpandedContent(row);

  const { theme } = useDarkMode();

  return (
    <InternalRowBase
      {...rest}
      ref={useMergeRefs([ref, virtualTable?.measureElement])}
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

// React.forwardRef can only work with plain function types, i.e. types with a single call signature and no other members.
// This assertion has an interface that restores the original function signature to work with generics.
export const ExpandedContent = React.forwardRef(
  ExpandedContentWithRef,
) as ExpandedContentComponentType;

ExpandedContent.displayName = 'ExpandedContent';

export default ExpandedContent;

ExpandedContent.propTypes = {
  row: PropTypes.object,
  virtualRow: PropTypes.object,
} as any; // avoid inferred types from interfering
