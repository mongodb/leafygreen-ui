import React from 'react';
import Box from '@leafygreen-ui/box';
import {
  menuItemContainerStyle,
  menuItemHeight,
  activeMenuItemContainerStyle,
  disabledMenuItemContainerStyle,
  focusedMenuItemContainerStyle,
  linkStyle,
} from './styles';
import { BaseMenuItemProps, SubMenuProps } from './types';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { cx } from '@leafygreen-ui/emotion';

export const InternalMenuItemBox = React.forwardRef(
  (
    {
      disabled,
      active,
      className,
      children,
      size = 'default',
      ...rest
    }: SubMenuProps | BaseMenuItemProps,
    ref: React.Ref<any>,
  ) => {
    const { usingKeyboard } = useUsingKeyboardContext();
    const as = typeof rest.href === 'string' ? 'a' : 'button';

    const boxProps = {
      disabled,
      active,
      role: 'menuitem',
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : undefined,
      // only add a disabled prop if not an anchor
      ...(typeof rest.href !== 'string' && { disabled }),
      // only add target & rel if it is an anchor
      ...(typeof rest.href === 'string' && {
        target: '_self',
        rel: '',
      }),
    };

    return (
      <Box
        as={as}
        ref={ref}
        className={cx(
          menuItemContainerStyle,
          menuItemHeight[size],
          linkStyle,
          {
            [activeMenuItemContainerStyle]: active,
            [disabledMenuItemContainerStyle]: disabled,
            [focusedMenuItemContainerStyle]: usingKeyboard,
          },
          className,
        )}
        {...boxProps}
        {...rest}
      >
        {children}
      </Box>
    );
  },
);

InternalMenuItemBox.displayName = 'InternalMenuItemBox';
