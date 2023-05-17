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
      className,
      spacing,
      maxHeight,
      adjustOnMutation,
      popoverZIndex,
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
      ...rest
    }: SplitButtonProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const containerRef = useForwardedRef(forwardedRef, null);

    const sharedButtonProps = { variant, size, baseFontSize };

    const menuProps = {
      spacing,
      maxHeight,
      adjustOnMutation,
      popoverZIndex,
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
    };

    // eslint-disable-next-line no-console
    console.log(menuItems.props);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={cx(buttonContainerStyles, className)}
          ref={containerRef}
        >
          <Button
            type={type}
            {...sharedButtonProps}
            className={cx(buttonBaseStyles, buttonThemeStyles(theme, variant))}
            {...rest}
          >
            {label}
          </Button>
          <Menu
            {...sharedButtonProps}
            {...menuProps}
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

// TODO: PropTypes
// TODO: readme
// TODO: link to .design
// TODO: a11y
