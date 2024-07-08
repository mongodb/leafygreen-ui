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
  getInputOptionStyles,
  getInputOptionWedge,
  inputOptionClassName,
} from './InputOption.style';
import { InputOptionProps } from './InputOption.types';

export const InputOption = Polymorphic<InputOptionProps>(
  (
    {
      as = 'li' as PolymorphicAs,
      children,
      disabled,
      highlighted,
      checked,
      darkMode: darkModeProp,
      showWedge = true,
      isInteractive = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const { Component } = usePolymorphic(as);
    const { theme, darkMode } = useDarkMode(darkModeProp);
    return (
      <InputOptionContext.Provider
        value={{
          checked,
          darkMode,
          disabled,
          highlighted,
        }}
      >
        <Component
          ref={ref}
          role="option"
          aria-selected={highlighted}
          aria-checked={checked}
          aria-disabled={disabled}
          tabIndex={-1}
          className={cx(
            inputOptionClassName,
            getInputOptionStyles({
              theme,
              disabled,
              highlighted,
              isInteractive,
            }),
            {
              [getInputOptionWedge({
                theme,
                disabled,
                highlighted,
                isInteractive,
              })]: showWedge,
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
