import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

import { HeaderRowProps } from './HeaderRow.types';

const HeaderRow = ({
  children,
  ...rest
}: PropsWithChildren<HeaderRowProps>) => {
  return (
    <tr {...rest}>
      {React.Children.map(children, (child: ReactNode, index: number) => {
        return React.cloneElement(child as ReactElement, {
          cellIndex: index,
          ...(child as ReactElement).props,
        });
      })}
    </tr>
  );
};

export default HeaderRow;
