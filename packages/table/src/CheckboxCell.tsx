import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';

interface CheckboxCellProps extends React.ComponentPropsWithoutRef<'td'> {
  checked?: boolean;
  disabled?: boolean;
}

function CheckboxCell({
  children,
  checked: checkedProp,
  className,
  disabled,
}: CheckboxCellProps) {
  const [checked, setChecked] = React.useState(disabled ? false : checkedProp);

  React.useEffect(() => {
    if (disabled) {
      setChecked(false);
    } else {
      setChecked(checkedProp);
    }
  }, [checkedProp, disabled]);

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
          onChange={() => setChecked(curr => !curr)}
          disabled={disabled}
        />
        {children}
      </div>
    </td>
  );
}

CheckboxCell.displayName = 'CheckboxCell';

export default CheckboxCell;
