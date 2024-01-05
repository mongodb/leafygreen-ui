import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  disabledStyles,
  getThemeStyles,
  inputOptionStyles,
  inputOptionWedge,
} from './InputOption.style';
import {
  ActionType,
  InputOptionProps,
  RenderedContext,
} from './InputOption.types';

export const InputOption = Polymorphic<InputOptionProps, 'div'>(
  (
    {
      as = 'div' as PolymorphicAs,
      children,
      disabled,
      highlighted,
      checked,
      darkMode: darkModeProp,
      showWedge = true,
      isInteractive = true,
      className,
      actionType = ActionType.Default,
      renderedContext = RenderedContext.Form,
      ...rest
    },
    ref,
  ) => {
    const { Component } = usePolymorphic(as);
    const { theme } = useDarkMode(darkModeProp);

    const themedStatefulStyles = getThemeStyles({
      renderedContext,
      theme,
      checked,
      highlighted,
      disabled,
      showWedge,
      isInteractive,
      actionType,
    });

    return (
      <Component
        ref={ref}
        role="option"
        aria-selected={highlighted}
        aria-checked={checked}
        tabIndex={-1}
        className={cx(
          {
            [inputOptionWedge]: showWedge,
            [disabledStyles]: disabled,
          },
          inputOptionStyles,
          themedStatefulStyles,
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
