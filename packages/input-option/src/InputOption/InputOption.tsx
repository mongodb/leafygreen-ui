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
  getHoverStyles,
  getTextStyles,
  getThemeStyles,
  getWedgeStyles,
  inputOptionStyles,
  inputOptionWedge,
  menuTitleStyles,
} from './InputOption.style';
import {
  ActionType,
  InputOptionProps,
  RenderedContext,
} from './InputOption.types';
import { State } from './themes';

export const InputOption = Polymorphic<InputOptionProps, 'div'>(
  (
    {
      as = 'div' as PolymorphicAs,
      children,
      disabled,
      highlighted,
      checked,
      darkMode: darkModeProp,
      showWedge: showWedgeProp = true, // alias to avoid confusion with `shouldRenderWedge` below
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

    let state: State = 'default';

    if (disabled) {
      state = State.Disabled;
    } else if (actionType === ActionType.Destructive) {
      state = State.Destructive;
    } else if (highlighted) {
      state = State.Highlight;
    } else if (checked) {
      state = State.Checked;
    }

    const shouldRenderWedge =
      (renderedContext === RenderedContext.Menu &&
        showWedgeProp &&
        (state === State.Highlight || state === State.Checked)) ||
      (renderedContext === RenderedContext.Form &&
        state === State.Highlight &&
        showWedgeProp);

    return (
      <Component
        ref={ref}
        role="option"
        aria-selected={highlighted}
        aria-checked={checked}
        tabIndex={-1}
        className={cx(
          getTextStyles(renderedContext, state, theme),
          {
            [getWedgeStyles(renderedContext, state, theme)]: shouldRenderWedge,
            [getHoverStyles(renderedContext, theme)]:
              !disabled && isInteractive && state !== State.Highlight,
            [menuTitleStyles(state)]: renderedContext === RenderedContext.Menu,
            [inputOptionWedge]: showWedgeProp,
            [disabledStyles]: disabled,
          },
          inputOptionStyles,
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
