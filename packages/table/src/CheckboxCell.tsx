import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';
import { useTableContext, Types } from './table-context';

interface CheckboxCellProps extends React.ComponentPropsWithoutRef<'td'> {
  checked?: boolean;
  disabled?: boolean;
  setIndeterminate?: (boolean: boolean) => void;
  index?: number;
}

function CheckboxCell({
  children,
  className,
  disabled,
  index,
}: CheckboxCellProps) {
  const {
    state: { mainCheckState },
    dispatch,
  } = useTableContext();
  const [checked, setChecked] = React.useState(mainCheckState);

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
        dispatch({
          type: Types.ToggleIndividualChecked,
          payload: { index, checked: false },
        });
      } else {
        setChecked(mainCheckState);
        dispatch({
          type: Types.ToggleIndividualChecked,
          payload: {
            index,
            checked: mainCheckState,
          },
        });
      }
    }
  }, [disabled, mainCheckState]);

  return (
    <td className={className}>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
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
