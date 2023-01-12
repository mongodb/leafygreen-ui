import React, { PropsWithChildren } from 'react';
import InternalCellBase from './InternalCellBase';
import { InternalCellWithRTProps } from './Cell.types';

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
      toggleExpandedIconProps={shouldRenderArrow ? {
        isExpanded: cell.row.getIsExpanded(),
        toggleExpanded: cell.row.getToggleExpandedHandler(),
      } : undefined
      }
      {...rest}
    />
  );
};

export default InternalCellWithRT;
