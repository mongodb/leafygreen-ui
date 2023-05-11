import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

import { HeaderCell } from '../../Cell';

import { HeaderRowProps } from './HeaderRow.types';

const HeaderRow = ({
  children,
  ...rest
}: PropsWithChildren<HeaderRowProps>) => {
  return (
    <tr {...rest}>
      {React.Children.map(children, (child: ReactNode, index: number) => {
        return (
          <HeaderCell {...(child as ReactElement).props} cellIndex={index} />
        );
      })}
    </tr>
  );
};

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
