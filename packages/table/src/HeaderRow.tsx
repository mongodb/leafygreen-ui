import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import { useTableContext, Types } from './TableContext';
import Cell from './Cell';
import Centered from './Centered';

const thStyles = css`
  width: 40px;
  border-width: 0 1px 3px 1px;
  border-color: ${uiColors.gray.light2};
  border-style: solid;
`;

export interface HeaderRowProps extends React.ComponentPropsWithoutRef<'tr'> {
  indeterminate?: boolean;
  selectable?: boolean;
}

function HeaderRow({ children, className, ...rest }: HeaderRowProps) {
  const {
    state: { selectable, headerCheckState },
    dispatch,
  } = useTableContext();

  const handleChange = () => {
    dispatch({
      type: Types.ToggleHeaderCheckedState,
    });
  };

  let checkColSpan = false;

  React.Children.forEach(children, child => {
    if (!child) {
      return null;
    }

    if (React.isValidElement(child) && child.props.colSpan) {
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
          <Cell>
            <Centered horizontal vertical>
              <Checkbox
                checked={headerCheckState.checked}
                indeterminate={headerCheckState.indeterminate}
                onChange={handleChange}
              />
            </Centered>
          </Cell>
        </th>
      )}
      {children}
    </tr>
  );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
