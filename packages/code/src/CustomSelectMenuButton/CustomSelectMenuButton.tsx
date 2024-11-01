import React from 'react';

import Button, { ButtonProps } from '@leafygreen-ui/button';

/**
 * Custom language switcher button.
 *
 * Passing down just the function which will be instantiated inside `Select`
 * @internal
 */
export const CustomSelectMenuButton = React.forwardRef(
  (props: ButtonProps, ref) => (
    <Button {...props} ref={ref} />
  ),
);

CustomSelectMenuButton.displayName = 'CustomSelectMenuButton';
