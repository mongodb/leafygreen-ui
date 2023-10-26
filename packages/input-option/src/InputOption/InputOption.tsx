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
      isMenu,
      ...rest
    },
    ref,
  ) => {
    const { Component } = useInferredPolymorphic(as, rest, 'div');
    const { theme } = useDarkMode(darkModeProp);

    console.log({ isMenu }, { disabled });

    return (
      <Component
        ref={ref}
        role="option"
        aria-selected={highlighted}
        aria-checked={checked}
        tabIndex={-1}
        className={cx(
          inputOptionStyles,
          inputOptionThemeStyles(theme, isMenu),
          {
            [inputOptionWedge]: showWedge,
            [inputOptionHoverStyles(theme, isMenu)]: isInteractive,
            [getInputOptionActiveStyles(theme, checkedVariant, isMenu)]:
              isInteractive && checked,
            [getInputOptionActiveStyles(theme, CheckedVariant.Blue, isMenu)]:
              isInteractive && highlighted,
            [titleSelectionStyles]: checked,
            [destructiveVariantStyles(theme, isMenu)]:
              actionType === ActionType.Destructive,
            [inputOptionDisabledStyles(theme, isMenu)]: disabled,
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
