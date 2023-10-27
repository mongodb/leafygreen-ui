import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  disabledStyles,
  getFormElementStyle,
  getMenuElementStyle,
  inputOptionStyles,
  inputOptionWedge,
} from './InputOption.style';
import {
  ActionType,
  InputOptionProps,
  RenderedContext,
} from './InputOption.types';

export const InputOption = InferredPolymorphic<InputOptionProps, 'div'>(
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
      actionType = ActionType.Default,
      renderedContext = RenderedContext.FormElement,
      ...rest
    },
    ref,
  ) => {
    const { Component } = useInferredPolymorphic(as, rest, 'div');
    const { theme } = useDarkMode(darkModeProp);

    const themedStatefulStyles =
      renderedContext === RenderedContext.FormElement
        ? getFormElementStyle({
            theme,
            checked,
            highlighted,
            disabled,
            showWedge,
            isInteractive,
          })
        : getMenuElementStyle({
            theme,
            checked,
            highlighted,
            disabled,
            showWedge,
            actionType,
            isInteractive,
          });

    return (
      <Component
        ref={ref}
        role="option"
        aria-selected={highlighted}
        aria-checked={checked}
        tabIndex={-1}
        className={cx(
          inputOptionStyles,
          themedStatefulStyles,
          {
            [inputOptionWedge]: showWedge,
            [disabledStyles]: disabled,
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
