import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { InputOptionProps } from './InputOption.types';
import {
  inputOptionActiveStyles,
  inputOptionDisabledStyles,
  inputOptionStyles,
  inputOptionThemeStyles,
  inputOptionWedge,
} from './InputOption.style';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

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
            [inputOptionWedge]: showWedge,
            [inputOptionActiveStyles[theme]]: active || focused,
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
