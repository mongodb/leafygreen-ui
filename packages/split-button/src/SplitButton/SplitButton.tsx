import React from 'react';
import PropTypes from 'prop-types';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { Menu } from '../Menu';

import {
  buttonBaseStyles,
  buttonContainerStyles,
  buttonThemeStyles,
} from './SplitButton.styles';
import { Align, Justify, SplitButtonProps, Variant } from './SplitButton.types';

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
            className={cx(buttonBaseStyles, {
              [buttonThemeStyles(theme, variant)]: !disabled,
            })}
            {...rest}
          >
            {label}
          </Button>
          <Menu
            {...sharedButtonProps}
            spacing={spacing}
            maxHeight={maxHeight}
            adjustOnMutation={adjustOnMutation}
            popoverZIndex={popoverZIndex}
            usePortal={usePortal}
            portalClassName={portalClassName}
            portalContainer={portalContainer}
            scrollContainer={scrollContainer}
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

SplitButton.propTypes = {
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  label: PropTypes.string.isRequired,
  menuItems: PropTypes.element.isRequired,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  disabled: PropTypes.bool,
};

// TODO: readme
// TODO: link to .design
// TODO: tests
