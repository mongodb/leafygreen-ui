import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import {
  useBaseFontSize,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import Box from '@leafygreen-ui/box';
import { Size, Mode } from './types';
import { SegmentedControlContext } from './SegmentedControl';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Styles
 */
const optionMode: Record<Mode, string> = {
  [Mode.Light]: css`
    --base-text-color: ${palette.gray.dark1};
    --base-background-color: transparent;
    --base-shadow-color: transparent;
    // Hover
    --hover-text-color: ${palette.gray.dark3};
    --hover-background-color: ${palette.white};
    // Selected
    --active-text-color: ${palette.white};
    // Disabled
    --disabled-text-color: ${palette.gray.light1};
    // Divider
    --divider-background-color: ${palette.gray.light1};
  `,
  [Mode.Dark]: css`
    --base-text-color: ${uiColors.gray.light1};
    --base-background-color: transparent;
    --base-shadow-color: transparent;
    // Hover
    --hover-text-color: ${uiColors.gray.light2};
    --hover-background-color: ${uiColors.gray.dark2};
    // Selected
    --active-text-color: ${uiColors.white};
    // Disabled
    --disabled-text-color: ${uiColors.gray.dark1};
    // Divider
    --divider-background-color: ${uiColors.gray.light1};
  `,
};

const optionSize: Record<Size, string> = {
  [Size.Small]: css`
    --font-size: 12px;
    --line-height: 16px;
    --padding-block: 3px;
    --padding-inline: 12px;
    --text-transform: uppercase;
    --font-weight: 700;
    --divider-height: 12px;
  `,
  [Size.Default]: css`
    --font-size: 13px;
    --line-height: 24px;
    --padding-block: 3px; // top/bottom
    --padding-inline: 12px; // left/right
    --text-transform: none;
    --font-weight: 500;
    --divider-height: 18px;
  `,
  [Size.Large]: css`
    --font-size: 16px;
    --line-height: 28px;
    --padding-block: 6px;
    --padding-inline: 12px;
    --text-transform: none;
    --font-weight: 500;
    --divider-height: 20px;
  `,
};

const optionStyle = ({
  mode = 'light',
  size = 'default',
  baseFontSize = 14,
}: {
  mode: Mode;
  size: Size;
  baseFontSize: 14 | 16;
}) =>
  cx(
    optionMode[mode],
    optionSize[size],
    css`
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      z-index: 3;

      &:first-child,
      &[data-lg-checked='true'],
      &[data-lg-checked='true'] + [data-lg-checked='false'],
      &:focus-within + :not(:focus-within) {
        --divider-background-color: transparent;
      }

      /* 
      * Adds the divider line to unselected segments 
      */
      &:before {
        --divider-width: 1px;
        content: '';
        position: absolute;
        height: var(--divider-height);
        width: var(--divider-width);
        left: calc(0px - (var(--segment-gap) + var(--divider-width)) / 2);
        top: calc(
          (
              var(--line-height) + var(--padding-block) * 2 -
                var(--divider-height)
            ) / 2
        );
        transition: background-color 150ms ease-in-out;
        background-color: var(--divider-background-color);
      }
    `,
    {
      // Update font size according to baseFontSize
      [css`
        --font-size: 16px;
      `]: size === 'default' && baseFontSize === 16,
    },
  );

const boxStyle = css`
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

const buttonStyle = css`
  font-family: ${fontFamilies.default};
  display: inline-flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--padding-block) var(--padding-inline);
  background-color: var(--base-background-color);
  border-radius: var(--indicator-radius);
  text-align: center;
  font-size: var(--font-size);
  line-height: var(--line-height);
  text-transform: var(--text-transform, none);
  font-weight: var(--font-weight);
  color: var(--base-text-color);
  box-shadow: 0px 1px 2px var(--base-shadow-color);
  cursor: pointer;
  transition: 150ms ease-in-out;
  transition-property: color, box-shadow;
  text-decoration: none;
  outline: none;
  border: none;

  &:hover {
    color: var(--hover-text-color);
  }

  &[aria-selected='true'] {
    color: var(--active-text-color);
  }

  &:disabled {
    color: var(--disabled-text-color);
    cursor: not-allowed;
  }
`;

const buttonFocusStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    &:focus {
      box-shadow: 0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.blue.light1};
    }
  `,
  [Mode.Dark]: css`
    &:focus {
      box-shadow: 0 0 0 2px ${uiColors.focus};
    }
  `,
};

const labelStyle = css`
  display: inline-flex;
  min-height: var(--line-height);
  align-items: center;
  gap: calc(var(--font-size) / 2);
`;

/**
 * Types
 */
export interface SegmentedControlOptionProps extends HTMLElementProps<'div'> {
  /**
   * Can be text and/or an icon element
   */
  children: React.ReactNode;

  /**
   * The value of the option
   */
  value: string;

  /**
   * Toggles whether the option is disabled. Defaults to `false`
   */
  disabled?: boolean;

  /**
   * Render the option wrapped in another component. Typically used for router `Link` components.
   *
   * Default: `div`
   */
  as?: any;

  /**
   * Identifies the element(s) whose contents/presence is controlled by the segmented control.
   *
   * Required as a prop on the control, or on each individual option.
   */
  'aria-controls'?: string;

  /**
   * Styling prop
   */
  className?: string;

  /**
   * @internal
   * A unique identifier for the option
   */
  _id?: string;

  /**
   * @internal
   * Identifies whether the option is checked.
   */
  _checked?: boolean;

  /**
   * @internal
   * Identifies whether the option has focus
   */
  _focused?: boolean;

  /**
   * @internal
   * The index of the option
   */
  _index?: number;

  /**
   * @internal
   * Calls the onChange callback
   */
  _onClick?: (value: string) => void;

  /**
   * @internal
   * Fires on mouse in and out
   */
  _onHover?: (hovered: boolean) => void;

  /**
   * @internal
   */
  isfocusInComponent?: boolean;
}

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
      ...rest
    }: SegmentedControlOptionProps,
    forwardedRef,
  ) => {
    const { size, mode, followFocus } = useContext(SegmentedControlContext);
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
        // isfocusInComponent: Returns if the focus should organically be this component. Without this check focus will be hijacked to this component if `usingKeyboard` is updated to true.
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

    return (
      <div
        className={cx(optionStyle({ mode, size, baseFontSize }), className)}
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
              [buttonFocusStyle[mode]]: usingKeyboard,
            })}
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <span
              className={cx(labelStyle, {
                // TODO: Refresh - remove darkmode font override
                [css`
                  font-family: ${fontFamilies.legacy};
                `]: mode === 'dark',
              })}
            >
              {children}
            </span>
          </button>
        </Box>
      </div>
    );
  },
);

SegmentedControlOption.displayName = 'SegmentedControlOption';
