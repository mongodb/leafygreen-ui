import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  getInputOptionActiveStyles,
  inputOptionDisabledStyles,
  inputOptionHoverStyles,
  inputOptionStyles,
  inputOptionThemeStyles,
  inputOptionWedge,
  titleSelectionStyles,
} from './InputOption.style';
import { InputOptionProps, Variant } from './InputOption.types';

export const InputOption = InferredPolymorphic<InputOptionProps>(
  (
    {
      as,
      children,
      disabled,
      highlighted,
      checked,
      darkMode: darkModeProp,
      showWedge = true,
      isInteractive = true,
      className,
      variant = 'blue',
      ...rest
    },
    ref,
  ) => {
    const { Component } = useInferredPolymorphic(as, rest, 'li');
    const { theme } = useDarkMode(darkModeProp);

    return (
      <Component
        ref={ref}
        role="option"
        aria-selected={highlighted}
        aria-checked={checked}
        tabIndex={-1}
        className={cx(
          inputOptionStyles,
          inputOptionThemeStyles[theme],
          {
            [inputOptionWedge]: showWedge,
            [inputOptionHoverStyles[theme]]: isInteractive,
            [getInputOptionActiveStyles(theme, variant)]:
              isInteractive && checked,
            [getInputOptionActiveStyles(theme, Variant.Blue)]:
              isInteractive && highlighted,
            [inputOptionDisabledStyles[theme]]: disabled,
            [titleSelectionStyles]: checked,
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
