import React from 'react';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { Menu } from '../Menu';

import {
  buttonBaseStyles,
  buttonContainerStyles,
  buttonThemeStyles,
} from './SplitButton.styles';
import { SplitButtonProps } from './SplitButton.types';

export const SplitButton = React.forwardRef<HTMLInputElement, SplitButtonProps>(
  (
    {
      darkMode: darkModeProp,
      variant = 'default',
      type = 'button',
      align = 'bottom',
      justify = 'end',
      size = 'default',
      baseFontSize,
      label,
      menuItems,
      ...rest
    }: SplitButtonProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const containerRef = useForwardedRef(forwardedRef, null);

    const sharedProps = { variant, size, baseFontSize };

    // eslint-disable-next-line no-console
    console.log(menuItems.props);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={buttonContainerStyles} ref={containerRef}>
          <Button
            type={type}
            {...sharedProps}
            className={cx(buttonBaseStyles, buttonThemeStyles(theme, variant))}
            {...rest}
          >
            {label}
          </Button>
          <Menu
            {...sharedProps}
            align={align}
            justify={justify}
            containerRef={containerRef}
            menuItems={menuItems}
          />
        </div>
      </LeafyGreenProvider>
    );
  },
);

SplitButton.displayName = 'SplitButton';
