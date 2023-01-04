import { cx } from '@leafygreen-ui/emotion';
import { consoleOnce } from '@leafygreen-ui/lib';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import ToggleExpandIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';
import InternalCellBase from './InternalCellBase';
import { alignmentStyles, baseStyles, depthPadding, cellContentContainerStyles } from './styles';
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
