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
  useInferredPolymorphic,
  type InferredPolymorphicProps,
} from '@leafygreen-ui/polymorphic';

export const InputOption = Polymorphic<
  InferredPolymorphicProps<InputOptionProps>
>(
  (
    {
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
    const { Component } = useInferredPolymorphic(rest.as, rest);
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
