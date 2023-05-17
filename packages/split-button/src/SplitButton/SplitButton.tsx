import React from 'react';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
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
      disabled = false,
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
    const menuId = useIdAllocator({ prefix: 'lg-split-button-menu' });

    const sharedButtonProps = { variant, size, baseFontSize, disabled };

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
            aria-owns={menuId}
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
            id={menuId}
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
// TODO: tests
// TODO: disabled states
