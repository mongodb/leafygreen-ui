import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  menuOptionActiveStyles,
  menuOptionDisabledStyles,
  menuOptionHoverStyles,
  menuOptionStyles,
  menuOptionThemeStyles,
  menuOptionWedge,
  titleSelectionStyles,
} from './MenuOption.style';
import { MenuOptionProps } from './MenuOption.types';

export const MenuOption = Polymorphic<MenuOptionProps>(
  (
    {
      as = 'li' as PolymorphicAs,
      children,
      disabled,
      highlighted,
      selected,
      darkMode: darkModeProp,
      showWedge = true,
      isInteractive = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const { Component } = usePolymorphic(as);
    const { theme } = useDarkMode(darkModeProp);
    return (
      <Component
        ref={ref}
        role="option"
        aria-selected={highlighted}
        tabIndex={-1}
        className={cx(
          menuOptionStyles,
          menuOptionThemeStyles[theme],
          {
            [menuOptionWedge]: showWedge,
            [menuOptionHoverStyles[theme]]: isInteractive,
            [menuOptionActiveStyles[theme]]:
              isInteractive && (selected || highlighted),
            [menuOptionDisabledStyles[theme]]: disabled,
            [titleSelectionStyles]: selected,
          },
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

MenuOption.displayName = 'MenuOption';
