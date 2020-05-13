import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { useTableContext } from './Context';

const thStyles = css`
  width: 40px;
  border-width: 0px 1px 3px 1px;
  border-color: ${uiColors.gray.light2};
  border-style: solid;
`;

const innerDivStyles = css`
  display: flex;
  justify-content: center;
`;

const stickyHeader = css`
  position: sticky;
`;

export interface HeaderRowProps extends React.ComponentPropsWithoutRef<'tr'> {
  sticky?: boolean;
  indeterminate?: boolean;
  selectable?: boolean;
}

function HeaderRow({
  sticky = false,
  selectable: selectableProp = false,
  indeterminate,
  children,
  className,
  ...rest
}: HeaderRowProps) {
  const { state, dispatch } = useTableContext();
  const { selectable, mainCheckState } = state;

  React.useEffect(() => {
    if (selectableProp) {
      dispatch({
        type: 'IS_SELECTABLE_TABLE',
        payload: selectableProp,
      });
    }
  }, [selectableProp]);

  const handleChange = () => {
    dispatch({
      type: 'SWITCH_CHECKMARK',
    });
  };

  return (
    <tr {...rest} className={cx({ [stickyHeader]: sticky }, className)}>
      {selectable && (
        <th className={thStyles}>
          <div className={innerDivStyles}>
            <Checkbox
              checked={mainCheckState}
              indeterminate={indeterminate}
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
