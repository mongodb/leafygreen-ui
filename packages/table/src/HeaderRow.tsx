import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import { useTableContext, Types } from './TableContext';

const thStyles = css`
  width: 40px;
  border-width: 0 1px 3px 1px;
  border-color: ${uiColors.gray.light2};
  border-style: solid;
`;

const innerDivStyles = css`
  display: flex;
  justify-content: center;
`;

export interface HeaderRowProps extends React.ComponentPropsWithoutRef<'tr'> {
  indeterminate?: boolean;
  selectable?: boolean;
}

function HeaderRow({ children, className, ...rest }: HeaderRowProps) {
  const {
    state: { selectable, headerCheckState, headerIndeterminate },
    dispatch,
  } = useTableContext();

  const handleChange = () => {
    dispatch({
      type: Types.ToggleHeaderCheckedState,
      payload: undefined,
    });
  };

  let checkColSpan = false;

  React.Children.forEach(children, child => {
    if (!child) {
      return null;
    }

    if ((child as React.ReactElement).props?.colSpan) {
      // if there is a colspan on a header row, we skip
      // adding a checkbox to the selectable table
      // so that tables can have multiple header rows
      // without multiple checkboxes
      checkColSpan = true;
    }
  });

  return (
    <tr {...rest} className={className} data-testid="leafygreen-ui-header-row">
      {selectable && !checkColSpan && (
        <th className={thStyles}>
          <div className={innerDivStyles}>
            <Checkbox
              checked={headerCheckState}
              indeterminate={headerIndeterminate}
              onChange={handleChange}
            />
          </div>
        </th>
      )}
      {children}
    </tr>
  );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
