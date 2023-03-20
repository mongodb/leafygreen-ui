import React, { PropsWithChildren } from 'react';

import ToggleExpandedIcon, { ToggleExpandedIconProps } from '../ToggleExpandedIcon';
import { RowData } from '..';

import FirstCell from './FirstCell';
import { CellProps } from '.';

const ExpandingCell = <T extends RowData>({
  children,
  toggleExpanded,
  isExpanded,
  ...rest
}: PropsWithChildren<CellProps<T> & ToggleExpandedIconProps>) => {
  return (
    <FirstCell {...rest}>
      <ToggleExpandedIcon
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
      />
      {children}
    </FirstCell>
  );
};

export default ExpandingCell;
