import React, { useContext, useEffect, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import {
  useBaseFontSize,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { SegmentedControlContext } from '../SegmentedControlContext';

import {
  boxStyles,
  buttonStyles,
  getButtonFocusStyles,
  getContainerStyles,
  iconOnlyThemeStyles,
  labelStyles,
  labelTextStyles,
} from './SegmentedControlOption.styles';
import { BaseSegmentedControlOptionProps } from './SegmentedControlOption.types';

/**
 * SegmentedControlOption
 */
export const SegmentedControlOption =
  Polymorphic<BaseSegmentedControlOptionProps>(
    (
      {
        value,
        children,
        disabled = false,
        as = 'div' as PolymorphicAs,
        className,
        'aria-controls': ariaControls,
        _id: id,
        _checked: checked,
        _focused: focused,
        _index: index,
        _onClick,
        _onHover,
        isFocusInComponent,
        glyph,
        ...rest
      },
      forwardedRef,
    ) => {
      const { Component } = usePolymorphic(as);
      const { size, theme, followFocus } = useContext(SegmentedControlContext);
      const { usingKeyboard } = useUsingKeyboardContext();
      const baseFontSize = useBaseFontSize();

      const onClick = () => {
        _onClick?.(value);
      };

      const onMouseEnter = () => {
        _onHover?.(true);
      };

      const onMouseLeave = () => {
        _onHover?.(false);
      };

      const didComponentMount = useRef(false);
      const buttonRef = useRef<HTMLButtonElement | null>(null);
      useEffect(() => {
        // Check if the component did mount
        if (didComponentMount.current) {
          // usingKeyboard: Returns if the keyboard is being used.
          // focused: Returns if this option should be the item in focus.
          // isFocusInComponent: Returns if the focus should organically be this component. Without this check this component will hijack the focus if `usingKeyboard` is updated to true.
          if (usingKeyboard && focused && isFocusInComponent) {
            // Respond in the DOM when this option is given focus via keyboard
            buttonRef?.current?.focus();

            if (followFocus) {
              // Used to ensure native click default events fire when using keyboard navigation
              buttonRef?.current?.click();
            }
          }
        }
        didComponentMount.current = true;
      }, [focused, followFocus, usingKeyboard, isFocusInComponent]);

      useEffect(() => {
        // If consumer is not using Icon or Glyph component as the `glyph` show a warning
        if (glyph && !isComponentGlyph(glyph)) {
          console.warn(
            'Please provide a LeafyGreen UI Icon or Glyph component.',
          );
        }
      }, [glyph]);

      const isIconOnly = (glyph && !children) ?? false;

      return (
        <div
          className={cx(
            getContainerStyles({ theme, size, baseFontSize }),
            className,
          )}
          ref={forwardedRef}
          data-lg-checked={checked}
        >
          <Component tabIndex={-1} className={boxStyles} {...rest}>
            <button
              role="tab"
              id={id}
              tabIndex={focused ? 0 : -1}
              aria-selected={checked}
              aria-controls={ariaControls}
              disabled={disabled}
              className={cx(buttonStyles, {
                [getButtonFocusStyles(theme)]: usingKeyboard,
                [iconOnlyThemeStyles]: isIconOnly,
              })}
              ref={buttonRef}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              type="button"
            >
              <div className={labelStyles}>
                {glyph && isComponentGlyph(glyph) && glyph}
                {!isIconOnly && (
                  <span className={labelTextStyles}>{children}</span>
                )}
              </div>
            </button>
          </Component>
        </div>
      );
    },
  );

SegmentedControlOption.displayName = 'SegmentedControlOption';
