import React from 'react';
import Button from '@leafygreen-ui/button';

/**
 * Types
 */
export interface PrimaryButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const PrimaryButton = ({
  variant = 'primary',
  text,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <Button variant={variant} {...rest}>
      {text}
    </Button>
  );
};

export default PrimaryButton;
