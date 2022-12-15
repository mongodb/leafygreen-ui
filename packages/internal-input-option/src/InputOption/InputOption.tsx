import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  inputOptionActiveStyles,
  inputOptionDisabledStyles,
  inputOptionHoverStyles,
  inputOptionStyles,
  inputOptionThemeStyles,
  inputOptionWedge,
} from './InputOption.style';
import { InputOptionProps } from './InputOption.types';

const InputOption = Polymorphic<InputOptionProps>(
  (
    {
      as = 'li' as PolymorphicAs,
      children,
      disabled,
      focused,
      active,
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
        aria-selected={focused}
        tabIndex={-1}
        className={cx(
          inputOptionStyles,
          inputOptionThemeStyles[theme],
          {
            [inputOptionHoverStyles[theme]]: isInteractive,
            [inputOptionActiveStyles[theme]]:
              isInteractive && (active || focused),
            [inputOptionWedge]: showWedge,
            [inputOptionDisabledStyles[theme]]: disabled,
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

InputOption.displayName = 'InputOption';

export { InputOption };
