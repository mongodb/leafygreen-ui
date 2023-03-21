import React, { ReactElement, ReactNode } from 'react';

import { Cell } from '../Cell';

import InternalRowBase from './InternalRowBase';
import { InternalRowBaseProps } from './Row.types';

/**
 * Renders basic array row data
 */
const InternalRowWithoutRT = ({ children, ...rest }: InternalRowBaseProps) => {
  return (
    <InternalRowBase {...rest}>
      {React.Children.map(children, (child: ReactNode, index: number) => {
        return React.createElement(Cell, {
          ...(child as ReactElement)?.props,
          cellIndex: index,
        });
      })}
    </InternalRowBase>
  );
};

export default InternalRowWithoutRT;
