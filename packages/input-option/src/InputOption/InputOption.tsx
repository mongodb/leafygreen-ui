import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { InputOptionContext } from '../InputOptionContext';

import { getInputOptionStyles, getInputOptionWedge } from './InputOption.style';
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
            getInputOptionStyles({
              theme,
              disabled,
              highlighted,
              selected,
              isInteractive,
            }),
            {
              [getInputOptionWedge({
                theme,
                disabled,
                highlighted,
                selected,
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
