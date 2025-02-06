import React from 'react';

import Button, { BaseButtonProps } from '@leafygreen-ui/button';

/**
 * Custom language switcher button.
 *
 * Passing down just the function which will be instantiated inside `Select`
 * @internal
 */
export const CustomSelectMenuButton = React.forwardRef<
  HTMLButtonElement,
  BaseButtonProps
>(({ children, ...props }, ref) => (
  <Button {...props} ref={ref}>
    {children}
  </Button>
));

CustomSelectMenuButton.displayName = 'CustomSelectMenuButton';
