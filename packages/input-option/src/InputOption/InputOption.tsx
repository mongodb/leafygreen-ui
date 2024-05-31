import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { InputOptionContext } from '../InputOptionContext';

import {
  inputOptionActiveStyles,
  inputOptionDisabledStyles,
  inputOptionHoverStyles,
  inputOptionStyles,
  inputOptionThemeStyles,
  inputOptionWedge,
  titleSelectionStyles,
} from './InputOption.style';
import { InputOptionProps } from './InputOption.types';

export const InputOption = Polymorphic<InputOptionProps>(
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
      <InputOptionContext.Provider
        value={{
          disabled,
          highlighted,
          selected,
        }}
      >
        <Component
          ref={ref}
          role="option"
          aria-selected={highlighted}
          aria-disabled={disabled}
          tabIndex={-1}
          className={cx(
            inputOptionStyles,
            inputOptionThemeStyles[theme],
            {
              [inputOptionWedge]: showWedge,
              [inputOptionHoverStyles[theme]]: isInteractive,
              [inputOptionActiveStyles[theme]]:
                isInteractive && (selected || highlighted),
              [inputOptionDisabledStyles[theme]]: disabled,
              [titleSelectionStyles]: selected,
            },
            className,
          )}
          {...rest}
        >
          {children}
        </Component>
      </InputOptionContext.Provider>
    );
  },
);

InputOption.displayName = 'InputOption';
