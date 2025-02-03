import React, { ForwardedRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useRowContext } from '../Row/RowContext';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';
import { LGRowData } from '../useLeafyGreenTable';

import { getCellEllipsisStyles, getCellStyles } from './Cell.styles';
import {
  InternalCellWithRTComponentType,
  InternalCellWithRTProps,
} from './Cell.types';
import InternalCellBase from './InternalCellBase';

/**
 * @internal
 */
const InternalCellWithRTForwardRef = <T extends LGRowData>(
  {
    children,
    className,
    contentClassName,
    align,
    cell,
    overrideTruncation = false,
    ...rest
  }: InternalCellWithRTProps<T>,
  ref: ForwardedRef<HTMLTableCellElement>,
) => {
  const { disabled, isExpanded, isExpandable, depth, toggleExpanded } =
    useRowContext();
  const { isSelectable, shouldTruncate = true } = useTableContext();
  const isFirstCell = (cell && cell.column.getIsFirstColumn()) || false;

  return (
    <InternalCellBase
      className={cx(
        getCellStyles(depth, isExpandable, isSelectable),
        className,
      )}
      // TS error is ignored (and not expected) as it doesn't show up locally but interrupts build
      // @ts-ignore Cell types need to be extended or declared in the react-table namespace
      align={align || cell?.column.columnDef?.align}
      ref={ref}
      {...rest}
    >
      {isFirstCell && isExpandable && (
        <ToggleExpandedIcon
          isExpanded={isExpanded!}
          toggleExpanded={toggleExpanded!}
          disabled={disabled}
        />
      )}
      <div
        className={getCellEllipsisStyles({
          shouldTruncate,
          overrideTruncation,
        })}
      >
        {children}
      </div>
    </InternalCellBase>
  );
};

// React.forwardRef can only work with plain function types, i.e. types with a single call signature and no other members.
// Asserts that `InternalCellWithRT` is of type `InternalCellWithRTComponentType` which works with generics
export const InternalCellWithRT = React.forwardRef(
  InternalCellWithRTForwardRef,
) as InternalCellWithRTComponentType;

InternalCellWithRT.displayName = 'InternalCellWithRT';

export default InternalCellWithRT;
