import React from 'react';

import { ButtonProps } from '@leafygreen-ui/button';

import { UnitSelectButton } from '../UnitSelectButton';

/**
 * Custom select menu unit button with a tooltip.
 * Tooltip will show up if there is an ellipse.
 *
 * Passing down just the function which will be instantiated inside `Select`
 * @internal
 */
export const CustomSelectMenuButton = React.forwardRef(
  ({ children, ...props }: ButtonProps, forwardedRef) => (
    <UnitSelectButton ref={forwardedRef} {...props}>
      {children}
    </UnitSelectButton>
  ),
);
CustomSelectMenuButton.displayName = 'CustomSelectMenuButton';
