import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  inputOptionActiveStyles,
  inputOptionDisabledStyles,
  inputOptionHoverStyles,
  inputOptionStyles,
  inputOptionThemeStyles,
  inputOptionWedge,
  titleSelectionStyles,
} from './InputOption.style';
import { InputOptionProps } from './InputOption.types';

// Fix disabled styles
// Add truncation logic

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
      // description,
      // leftGlyph,
      // rightGlyph,
      ...rest
    },
    ref,
  ) => {
    const { Component } = usePolymorphic(as);
    const { theme } = useDarkMode(darkModeProp);
    return (
      <Component
        ref={ref}
        role="option"
        aria-selected={highlighted}
        tabIndex={-1}
        className={cx(
          inputOptionStyles,
          inputOptionThemeStyles[theme],
          {
            [inputOptionWedge]: showWedge,
            [inputOptionHoverStyles[theme]]: isInteractive,
            [inputOptionActiveStyles[theme]]:
              isInteractive && (selected || highlighted),
            [inputOptionDisabledStyles[theme]]: disabled,
            [titleSelectionStyles]: selected,
          },
          className,
        )}
        {...rest}
      >
        {children}
        {/* <div className={contentWrapper}>
          <div className={leftContentWrapper}>
            {leftGlyph && <div className={glyphContainer}>{leftGlyph}</div>}
            <div>
              <div
                className={cx(titleClassName, {
                  [css`
                    font-weight: bold;
                  `]: selected || !!description,
                })}
              >
                {children}
              </div>
              {description && (
                <div className={descriptionClassName}>{description}</div>
              )}
            </div>
          </div>
          {rightGlyph && <div className={glyphContainer}>{rightGlyph}</div>}
        </div> */}
      </Component>
    );
  },
);

InputOption.displayName = 'InputOption';
