import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  baseStyles,
  boldTitleStyles,
  disabledStyles,
  formWedgeStyles,
  getContextStyles,
  getHoverStyles,
  inputOptionWedge,
  menuTitleStyles,
  menuWedgeStyles,
  wedgeActiveStyles,
} from './InputOption.style';
import {
  ActionType,
  InputOptionProps,
  RenderedContext,
  State,
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
    const { theme, darkMode } = useDarkMode(darkModeProp);

    let state: State = 'default';

    if (disabled) {
      state = State.Disabled;
    } else if (
      actionType === ActionType.Destructive &&
      renderedContext === RenderedContext.Menu
    ) {
      state = State.Destructive;
      console.warn(
        'The `InputOption` was rendered in its default state as `destructive` InputOptions are not supported in forms.',
      );
    } else if (highlighted) {
      state = State.Highlight;
    } else if (checked) {
      state = State.Checked;
    }

    const shouldRenderWedge =
      showWedgeProp &&
      ((renderedContext === RenderedContext.Menu &&
        (state === State.Highlight || state === State.Checked)) ||
        (renderedContext === RenderedContext.Form &&
          state === State.Highlight));

    const shouldBoldTitle: boolean =
      (renderedContext === RenderedContext.Form && checked && !disabled) ||
      renderedContext === RenderedContext.Menu;

    const shouldShowHoverStyles: boolean =
      !disabled && isInteractive && state !== State.Highlight;

    return (
      <Component
        ref={ref}
        role="option"
        aria-selected={highlighted}
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={-1}
        className={cx(
          baseStyles,
          getContextStyles(renderedContext, state, theme),
          {
            [inputOptionWedge]: showWedgeProp,
            [formWedgeStyles(darkMode)]:
              renderedContext === RenderedContext.Form,
            [menuWedgeStyles(checked)]:
              renderedContext === RenderedContext.Menu,
            [wedgeActiveStyles]: shouldRenderWedge,
            [getHoverStyles(renderedContext, theme)]: shouldShowHoverStyles,
            [menuTitleStyles(actionType)]:
              renderedContext === RenderedContext.Menu,
            [boldTitleStyles]: shouldBoldTitle,
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
