import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';

const flexStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CheckboxCellProps {
  checked: boolean;
  onChange?: React.ChangeEventHandler;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function CheckboxCell({
  children,
  className,
  disabled = false,
  checked = false,
  onChange,
}: CheckboxCellProps) {
  return (
    <td className={className}>
      <div className={flexStyles}>
        <Checkbox checked={checked} onChange={onChange} disabled={disabled} />
        {children}
      </div>
    </td>
  );
}

CheckboxCell.displayName = 'CheckboxCell';

export default CheckboxCell;
