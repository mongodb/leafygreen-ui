import { cx } from '@leafygreen-ui/emotion';
import { consoleOnce } from '@leafygreen-ui/lib';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import ToggleExpandIcon from '../ToggleExpandedIcon/ToggleExpandedIcon';
import InternalCellBase from './InternalCellBase';
import { alignmentStyles, baseStyles, depthPadding, cellContentContainerStyles } from './styles';
import { InternalCellWithoutVSProps } from './types';

const InternalCellWithoutVS = ({
  toggleExpandedIconProps,
  shouldRenderArrow: shouldRenderArrowProp,
  cellIndex,
  ...rest
}: PropsWithChildren<InternalCellWithoutVSProps>) => {
  const shouldRenderArrow = cellIndex === 0 && !!toggleExpandedIconProps

  return (
    <>
      <InternalCellBase
        cellIndex={cellIndex}
        shouldRenderArrow={!!shouldRenderArrow}
        toggleExpandedIconProps={toggleExpandedIconProps}
        {...rest}
      />
    </>
  );
};

export default InternalCellWithoutVS;
