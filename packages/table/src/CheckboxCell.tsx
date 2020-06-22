import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';
import { useTableContext, Types } from './TableContext';

const flexStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CheckboxCellProps extends React.ComponentPropsWithoutRef<'td'> {
  checked?: boolean;
  disabled?: boolean;
  index?: number;
}

function CheckboxCell({
  children,
  className,
  disabled,
  index,
}: CheckboxCellProps) {
  const {
    state: { headerCheckState },
    dispatch,
  } = useTableContext();
  const [checked, setChecked] = React.useState(headerCheckState);

  const handleChange = () => {
    setChecked(curr => !curr);

    if (typeof index === 'number') {
      dispatch({
        type: Types.ToggleIndividualChecked,
        payload: { index, checked: !checked },
      });
    }
  };

  React.useEffect(() => {
    if (typeof index === 'number') {
      if (disabled) {
        setChecked(false);
      } else {
        setChecked(headerCheckState);
        dispatch({
          type: Types.ToggleIndividualChecked,
          payload: {
            index,
            checked: headerCheckState,
          },
        });
      }
    }
  }, [disabled, headerCheckState]);

  return (
    <td className={className}>
      <div className={flexStyles}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        {children}
      </div>
    </td>
  );
}

CheckboxCell.displayName = 'CheckboxCell';

export default CheckboxCell;
