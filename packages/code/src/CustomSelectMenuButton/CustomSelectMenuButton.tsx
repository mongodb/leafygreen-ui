import React from 'react';

import Button, { ButtonProps } from '@leafygreen-ui/button';

/**
 * Custom language switcher button.
 *
 * Passing down just the function which will be instantiated inside `Select`
 * @internal
 */
export const CustomSelectMenuButton = React.forwardRef<HTMLButtonElement>(
  ({ children, ...props }: ButtonProps, ref) => (
    <Button {...props} as="button" ref={ref}>
      {children}
    </Button>
  ),
);

CustomSelectMenuButton.displayName = 'CustomSelectMenuButton';
