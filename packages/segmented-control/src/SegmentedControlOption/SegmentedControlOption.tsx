import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Box from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import {
  useBaseFontSize,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';

import { SegmentedControlContext } from '../SegmentedControlContext';

import {
  boxStyle,
  buttonFocusStyle,
  buttonStyle,
  iconOnlyThemeStyles,
  labelStyle,
  labelTextStyles,
  optionStyle,
} from './SegmentedControlOption.styles';
import { SegmentedControlOptionProps } from './SegmentedControlOption.types';

/**
 * SegmentedControlOption
 */
export const SegmentedControlOption = forwardRef<
  HTMLDivElement,
  SegmentedControlOptionProps
>(
  (
    {
      value,
      children,
      disabled = false,
      as,
      className,
      'aria-controls': ariaControls,
      _id: id,
      _checked: checked,
      _focused: focused,
      _index: index,
      _onClick,
      _onHover,
      isfocusInComponent,
      glyph,
      ...rest
    }: SegmentedControlOptionProps,
    forwardedRef,
  ) => {
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
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
      // Check if the component did mount
      if (didComponentMount.current) {
        // usingKeyboard: Returns if the keyboard is being used.
        // focused: Returns if this option should be the item in focus.
        // isfocusInComponent: Returns if the focus should organically be this component. Without this check this component will hijack the focus if `usingKeyboard` is updated to true.
        if (usingKeyboard && focused && isfocusInComponent) {
          // Respond in the DOM when this option is given focus via keyboard
          buttonRef?.current?.focus();

          if (followFocus) {
            // Used to ensure native click default events fire when using keyboard navigation
            buttonRef?.current?.click();
          }
        }
      }
      didComponentMount.current = true;
    }, [focused, followFocus, usingKeyboard, isfocusInComponent]);

    useEffect(() => {
      // If consumer is not using Icon or Glyph component as the `glyph` show a warning
      if (glyph && !isComponentGlyph(glyph)) {
        console.warn('Please provide a LeafyGreen UI Icon or Glyph component.');
      }
    }, [glyph]);

    const isIconOnly = (glyph && !children) ?? false;

    return (
      <div
        className={cx(optionStyle({ theme, size, baseFontSize }), className)}
        ref={forwardedRef}
        data-lg-checked={checked}
      >
        <Box as={as} tabIndex={-1} className={boxStyle} {...rest}>
          <button
            role="tab"
            id={id}
            tabIndex={focused ? 0 : -1}
            aria-selected={checked}
            aria-controls={ariaControls}
            disabled={disabled}
            className={cx(buttonStyle, {
              [buttonFocusStyle[theme]]: usingKeyboard,
              [iconOnlyThemeStyles]: isIconOnly,
            })}
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            type="button"
          >
            <div className={labelStyle}>
              {glyph && isComponentGlyph(glyph) && glyph}
              {!isIconOnly && (
                <span className={labelTextStyles}>{children}</span>
              )}
            </div>
          </button>
        </Box>
      </div>
    );
  },
);

SegmentedControlOption.displayName = 'SegmentedControlOption';

SegmentedControlOption.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  glyph: PropTypes.element,
};
