import React, { PropsWithChildren } from 'react';
import InternalCellBase from './InternalCellBase';
import { InternalCellWithVSProps } from './types';

const InternalCellWithVS = <T extends unknown>({
  cell,
  cellIndex,
  toggleExpandedIconProps,
  ...rest
}: PropsWithChildren<InternalCellWithVSProps<T>>) => {

  const shouldRenderArrow = cell?.row.getCanExpand() && cellIndex === 0;

  return (
    <InternalCellBase
      shouldRenderArrow={!!shouldRenderArrow}
      cellIndex={cellIndex}
      toggleExpandedIconProps={{
        isExpanded: cell.row.getIsExpanded(),
        toggleExpanded: cell.row.getToggleExpandedHandler()
      }}
      {...rest}
    />
  );
};

export default InternalCellWithVS;
