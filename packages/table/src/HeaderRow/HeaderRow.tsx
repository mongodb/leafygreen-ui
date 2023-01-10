import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import CheckboxCell from '../CheckboxCell/CheckboxCell';
import HeaderCell from '../HeaderCell/HeaderCell';
import { useTableContext } from '../TableContext';
import { HeaderRowProps } from './types';

const HeaderRow = ({
  children,
  ...rest
}: PropsWithChildren<HeaderRowProps>) => {
  const { hasSelectableRows, onSelectAllRows } = useTableContext();
  return (
    <tr {...rest}>
      {hasSelectableRows && (
        <HeaderCell cellIndex={0} columnName="">
          <CheckboxCell
            onChange={onSelectAllRows}
            // todo
            aria-label=""
          />
        </HeaderCell>
      )}
      {React.Children.map(children, (child: ReactNode, index: number) => {
        return React.cloneElement(child as ReactElement, {
          cellIndex: hasSelectableRows ? index + 1 : index,
          ...(child as ReactElement).props,
        });
      })}
    </tr>
  );
};

export default HeaderRow;
