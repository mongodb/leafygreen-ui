import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  destructiveVariantStyles,
  getInputOptionActiveStyles,
  inputOptionDisabledStyles,
  inputOptionHoverStyles,
  inputOptionStyles,
  inputOptionThemeStyles,
  inputOptionWedge,
  titleSelectionStyles,
} from './InputOption.style';
import {
  ActionType,
  CheckedVariant,
  InputOptionProps,
} from './InputOption.types';

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
      checkedVariant = CheckedVariant.Blue,
      actionType = ActionType.Default,
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
            [getInputOptionActiveStyles(theme, checkedVariant)]:
              isInteractive && checked,
            [getInputOptionActiveStyles(theme, CheckedVariant.Blue)]:
              isInteractive && highlighted,
            [titleSelectionStyles]: checked,
            [destructiveVariantStyles[theme]]:
              actionType === ActionType.Destructive,
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
