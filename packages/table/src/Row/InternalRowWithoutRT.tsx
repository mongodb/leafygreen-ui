import React, { ReactElement, ReactNode } from 'react';
import InternalCellBase from '../Cell/InternalCellBase';
import InternalRowBase from './InternalRowBase';
import { InternalRowBaseProps } from './Row.types';

const InternalRowWithoutRT = ({ children, ...rest }: InternalRowBaseProps) => {
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
