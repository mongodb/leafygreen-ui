import React, { PropsWithChildren } from 'react';
import { InternalCellWithRTProps } from './Cell.types';
import InternalCellBase from './InternalCellBase';

const InternalCellWithRT = <T extends unknown>({
  cell,
  cellIndex,
  toggleExpandedIconProps,
  ...rest
}: PropsWithChildren<InternalCellWithRTProps<T>>) => {
  const shouldRenderArrow = cell?.row.getCanExpand() && cellIndex === 0;

  return (
    <InternalCellBase
      cellIndex={cellIndex}
      toggleExpandedIconProps={
        shouldRenderArrow
          ? {
              isExpanded: cell.row.getIsExpanded(),
              toggleExpanded: cell.row.getToggleExpandedHandler(),
            }
          : undefined
      }
      {...rest}
    />
  );
};

export default InternalCellWithRT;
