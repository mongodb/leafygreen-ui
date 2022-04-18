import React from 'react';
import Button from '@leafygreen-ui/button';
import { once } from 'lodash';

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

export const isPrimaryButtonProps = (
  testObj: any,
): testObj is PrimaryButtonProps => {
  return testObj && testObj.text != null;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
  if (!isPrimaryButtonProps(props)) {
    errorOnce(
      '`primaryButton` prop in `FormFooter` must be either a `Button` component, or object with at minumum a `text` property',
    );
  }

  const { variant, text, ...rest } = props;

  return (
    <Button variant={variant ? variant : 'primary'} {...rest}>
      {text}
    </Button>
  );
};

const errorOnce = once(console.error);

export default PrimaryButton;
