import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import React, { Fragment, ReactElement, ReactNode } from 'react';
import InternalCellBase from '../Cell/InternalCellBase';
import InternalRowBase from './InternalRowBase';
import { InternalRowBaseProps } from './Row.types';

const InternalRowWithoutRT = <T extends unknown>({
  children,
  ...rest
}: InternalRowBaseProps) => {

  return (
    <InternalRowBase {...rest}>
      {React.Children.map(children, (child: ReactNode, index: number) => {
        return React.createElement(InternalCellBase, {
          ...(child as ReactElement)?.props,
          cellIndex: index,
        });
      })}
    </InternalRowBase>
  );
};

export default InternalRowWithoutRT;
